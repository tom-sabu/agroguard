import os
import sys
from pathlib import Path
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Add parent directory to path to find .env if needed, but we can just use the same logic as app.py
ROOT_ENV_PATH = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=ROOT_ENV_PATH, override=True)

database_url = os.getenv("DATABASE_URL")

if not database_url:
    print("Error: DATABASE_URL not found in .env")
    sys.exit(1)

print(f"Connecting to database...")
try:
    engine = create_engine(database_url)
    with engine.connect() as conn:
        print("Connected successfully.")
        print("Enabling PostGIS extension...")
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS postgis;"))
        conn.commit()
        print("PostGIS extension enabled.")
        
        # Verify
        result = conn.execute(text("SELECT PostGIS_Version();")).scalar()
        print(f"PostGIS Version: {result}")
        
except Exception as e:
    print(f"Database error: {e}")
    sys.exit(1)
