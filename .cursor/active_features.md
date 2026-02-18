# 🚀 Active Feature Queue
This file tracks the features we are currently building.
Cursor: Always check this file to see what to implement next.

## 🟢 CURRENT SPRINT (Must Do)
- [x] **Project Setup**: Initialize Vite (Shadcn) + FastAPI + Database Connection.
- [x] **Kottayam Widget**: Create a UI card showing "Today's Market Prices" (Rubber, Coconut, Pepper) using `Docs/Market_Data.md`.
- [x] **Map View**: specific hardcoded start at Kottayam (Lat: 9.5916, Long: 76.5222).
- [x] **Seller Flow**: Form to Upload Image (Cloudinary) -> Save Product to DB.
- [x] **Buyer Flow**: Fetch products from DB -> Show Pins on Map.

## 🟡 BACKLOG (Nice to Have)
- [ ] Phone Number WhatsApp Link (Click to Chat).
- [ ] Search Bar (Filter by "Fruit", "Veg").

## 🔵 PHASE 2: DEPLOYMENT & INFRASTRUCTURE
### 1. Database (Neon - PostgreSQL + PostGIS)
- [x] Create Neon project.
- [x] Enable PostGIS extension.
- [x] Get Connection String (`DATABASE_URL`).
- [x] Update `.env` with production DB URL.
- [x] Verify connection from backend.

### 2. Storage (Cloudinary)
- [x] create Cloudinary account (Free Tier).
- [x] Get Credentials (`CLOUD_NAME`, `API_KEY`, `API_SECRET`).
- [x] Update `.env`.
- [x] Test image upload from Seller Flow.

### 3. Backend Hosting (Render)
- [ ] Create `render.yaml` or connect via UI.
- [ ] Set Build Command: `pip install -r requirements.txt`.
- [ ] Set Start Command: `uvicorn app:app --host 0.0.0.0 --port 10000`.
- [ ] Add Environment Variables from `.env`.
- [ ] Deploy & Get Live URL.

### 4. Frontend Hosting (Vercel)
- [ ] Connect GitHub repo to Vercel.
- [ ] Set Environment Variables (`VITE_API_URL` -> Render URL).
- [ ] Deploy & Test Live Site.
