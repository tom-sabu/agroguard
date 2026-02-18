from __future__ import annotations

from datetime import datetime, timezone
from functools import lru_cache
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy import DateTime, Float, Integer, String, Text, create_engine, text
from sqlalchemy.engine import Engine
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column


ROOT_ENV_PATH = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=ROOT_ENV_PATH, override=False)


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=str(ROOT_ENV_PATH), extra="ignore")

    database_url: Optional[str] = Field(
        default=None,
        alias="DATABASE_URL",
        description="PostgreSQL connection string (Neon recommended).",
    )
    default_lat: float = Field(default=9.5916, alias="DEFAULT_LAT")
    default_lon: float = Field(default=76.5222, alias="DEFAULT_LON")
    frontend_origin: str = Field(
        default="http://localhost:5173",
        alias="FRONTEND_ORIGIN",
        description="Frontend dev origin for CORS.",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

@lru_cache
def get_engine() -> Optional[Engine]:
    if not settings.database_url:
        return None
    return create_engine(settings.database_url, pool_pre_ping=True)


class Base(DeclarativeBase):
    pass


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    category: Mapped[Optional[str]] = mapped_column(String(32), nullable=True)
    price_inr: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    image_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    lat: Mapped[float] = mapped_column(Float, nullable=False)
    lon: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )


app = FastAPI(title="AgriLocal API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_create_tables() -> None:
    engine = get_engine()
    if engine is None:
        return
    Base.metadata.create_all(bind=engine)


def db_session() -> Session:
    engine = get_engine()
    if engine is None:
        raise RuntimeError("DATABASE_URL is not set")
    return Session(bind=engine)


class HealthResponse(BaseModel):
    ok: bool
    service: str = "backend"
    time_utc: datetime


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(ok=True, time_utc=datetime.now(timezone.utc))


@app.get("/health/db")
def health_db():
    engine = get_engine()
    if engine is None:
        raise HTTPException(status_code=503, detail="DATABASE_URL is not set")
    try:
        with engine.connect() as conn:
            conn.execute(text("select 1"))
        return {"ok": True}
    except Exception as e:  # pragma: no cover
        raise HTTPException(status_code=503, detail=f"DB unavailable: {e}")

