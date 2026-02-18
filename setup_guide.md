# Setup Guide

## Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- PostgreSQL (or Neon.tech account)
- Cloudinary account

## Installation

### Frontend
1. Navigate to `frontend/` (to be created).
2. Run `npm install`.
3. Create `.env.local` based on `.env.example`.
4. Run `npm run dev`.

### Backend
1. Navigate to `backend/` (to be created).
2. Create a virtual environment: `python -m venv venv`.
3. Activate venv: `source venv/bin/activate`.
4. Run `pip install fastapi uvicorn sqlalchemy psycopg2-binary`.
5. Run `uvicorn app:app --reload`.

## Database Setup
1. Use a Neon PostgreSQL database.
2. Ensure PostGIS extension is enabled for location queries.
