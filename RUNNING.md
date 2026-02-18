# How to Run AgriLocal (Agroguard)

Follow these steps to start the application. You need two terminal windows open: one for the backend (API) and one for the frontend (Web App).

## 1. Prerequisites
- Ensure your `.env` file is set up with `DATABASE_URL` (Neon) and `CLOUDINARY_*` credentials.
- Ensure you have Python and Node.js installed.

## 2. Start the Backend (API)
Open a terminal in the project root (`d:\agroguard`) and run:

```powershell
cd backend
.\venv\Scripts\activate
# If requirements aren't installed yet: pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

> The server will start at `http://localhost:8000`. You should see `Application startup complete`.

## 3. Start the Frontend (Web App)
Open a **new** terminal window (keep the backend running!) and run:

```powershell
cd frontend
# If dependencies aren't installed yet: npm install
npm run dev
```

> The app will be available at `http://localhost:5173`.

## 4. Usage
- Open your browser to `http://localhost:5173`.
- **Map View**: You should see the map centered on Kottayam with markers for products.
- **Selling**: Use the form below the map to add a product (Title, Price, Image).
- **Buying**: Click on markers to see product details.

## Troubleshooting
- **Database Error?** Check if `DATABASE_URL` is correct in `.env`.
- **Image Upload Failed?** Check Cloudinary credentials in `.env`.
- **Map Empty?** If the backend is down, the frontend uses dummy data. If the backend is up but the DB is empty, add a product first!
