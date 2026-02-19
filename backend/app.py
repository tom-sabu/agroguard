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
import cloudinary
import cloudinary.uploader
from fastapi import UploadFile, File, Form



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
    cloudinary_cloud_name: str = Field(alias="CLOUDINARY_CLOUD_NAME", default="")
    cloudinary_api_key: str = Field(alias="CLOUDINARY_API_KEY", default="")
    cloudinary_api_secret: str = Field(alias="CLOUDINARY_API_SECRET", default="")


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
    quantity_available: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    quantity_unit: Mapped[Optional[str]] = mapped_column(String(16), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )


app = FastAPI(title="AgriLocal API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
    
    # Configure Cloudinary
    if settings.cloudinary_cloud_name:
        cloudinary.config(
            cloud_name=settings.cloudinary_cloud_name,
            api_key=settings.cloudinary_api_key,
            api_secret=settings.cloudinary_api_secret,
        )



def db_session() -> Session:
    engine = get_engine()
    if engine is None:
        raise RuntimeError("DATABASE_URL is not set")
    return Session(bind=engine)


class HealthResponse(BaseModel):
    ok: bool
    service: str = "backend"
    time_utc: datetime


class ProductResponse(BaseModel):
    id: int
    title: str
    category: Optional[str]
    price_inr: Optional[float]
    image_url: Optional[str]
    lat: float
    lon: float
    quantity_available: Optional[float] = None
    quantity_unit: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True



@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(ok=True, time_utc=datetime.now(timezone.utc))



@app.get("/health/db")
def health_db():
    print("Health DB: Starting check...")
    engine = get_engine()
    if engine is None:
        print("Health DB: Engine is None (DATABASE_URL missing)")
        raise HTTPException(status_code=503, detail="DATABASE_URL is not set")
    try:
        print(f"Health DB: Connecting to {engine.url}...")
        with engine.connect() as conn:
            print("Health DB: Connected! Executing query...")
            conn.execute(text("select 1"))
            print("Health DB: Query Successful!")
        return {"ok": True}
    except Exception as e:
        print(f"Health DB: Error - {e}")
        raise HTTPException(status_code=503, detail=f"DB unavailable: {e}")


@app.post("/products", response_model=ProductResponse)
def create_product(
    title: str = Form(...),
    category: Optional[str] = Form(None),
    price_inr: Optional[float] = Form(None),
    lat: float = Form(...),
    lon: float = Form(...),
    file: UploadFile = File(...),
    quantity_available: Optional[float] = Form(None),
    quantity_unit: Optional[str] = Form(None),
):
    # Upload to Cloudinary
    try:
        # file.file is a SpooledTemporaryFile
        upload_result = cloudinary.uploader.upload(file.file, folder="agroguard/products")
        image_url = upload_result.get("secure_url")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

    # Save to DB
    session = db_session()
    try:
        new_product = Product(
            title=title,
            category=category,
            price_inr=price_inr,
            lat=lat,
            lon=lon,
            image_url=image_url,
            quantity_available=quantity_available,
            quantity_unit=quantity_unit
        )
        session.add(new_product)
        session.commit()
        session.refresh(new_product)
        return new_product
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        session.close()


@app.get("/products", response_model=list[ProductResponse])
def get_products():
    session = db_session()
    try:
        products = session.query(Product).order_by(Product.created_at.desc()).all()
        return products
    finally:
        session.close()
