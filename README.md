# AgriLocal (Agroguard)

Hyper-local marketplace MVP for Kottayam.

## Project structure

- `frontend/`: React + Vite + TypeScript + Tailwind + shadcn/ui-style setup
- `backend/`: FastAPI + PostgreSQL (Neon)

## Environment

Create a `.env` at the repo root from `.env.example`.

## Run locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
./venv/Scripts/activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

Health checks:

- `GET http://localhost:8000/health`
- `GET http://localhost:8000/health/db`

