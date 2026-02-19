import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

database_url = os.getenv("DATABASE_URL")
if not database_url:
    print("Error: DATABASE_URL not set in .env")
    exit(1)

engine = create_engine(database_url)

def add_columns():
    with engine.connect() as conn:
        print("Checking/Updating schema...")
        
        # Check if quantity_available exists
        try:
            conn.execute(text("ALTER TABLE products ADD COLUMN quantity_available FLOAT"))
            print("Added column: quantity_available")
        except Exception as e:
            if "already exists" in str(e):
                print("Column quantity_available already exists.")
            else:
                print(f"Error adding quantity_available: {e}")

        # Check if quantity_unit exists
        try:
            conn.execute(text("ALTER TABLE products ADD COLUMN quantity_unit VARCHAR(16)"))
            print("Added column: quantity_unit")
        except Exception as e:
            if "already exists" in str(e):
                print("Column quantity_unit already exists.")
            else:
                print(f"Error adding quantity_unit: {e}")
        
        conn.commit()
        print("Schema update completed.")

if __name__ == "__main__":
    add_columns()
