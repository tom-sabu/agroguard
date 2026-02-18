# Product Requirements Document (PRD) - AgriLocal

## Goal
A friction-free way to sell backyard produce in Kottayam.

## Key Features
* **Map-First Interface**: Users see what's growing near them immediately.
* **Simple Listing**: No complex forms. Just "What is it?", "Price", "Photo".
* **No Payments**: We only connect people. Payment happens in person (Cash/UPI).

## Tech Stack
* **Frontend**: React + Vite + TypeScript + Tailwind + Shadcn UI.
* **Maps**: Leaflet (react-leaflet) with OpenStreetMap.
* **Backend**: FastAPI (Python) - Single `app.py`.
* **Database**: Neon (PostgreSQL + PostGIS).
* **Storage**: Cloudinary (Free Tier).
* **Hosting**: Vercel (Frontend), Render (Backend).
