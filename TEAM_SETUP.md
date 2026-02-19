# Team Setup Guide

## Prerequisites

To run the AgroGuard web application locally, your team members need to have the following installed on their system:

1.  **Node.js & npm** (for the frontend)
    -   Download: [https://nodejs.org/](https://nodejs.org/) (LTS version recommended)
    -   Verify: `node -v` and `npm -v`

2.  **Python 3.9+** (for the backend)
    -   Download: [https://www.python.org/downloads/](https://www.python.org/downloads/)
    -   Verify: `python --version`

3.  **PostgreSQL** (Optional, if running a local DB)
    -   Alternatively, they can connect to the shared Neon PostgreSQL instance if you provide them the `DATABASE_URL`.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd agroguard
```

### 2. Backend Setup
Navigate to the backend directory:
```bash
cd backend
```

Create a virtual environment:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

**Environment Variables (.env)**
Create a `.env` file in the root `agroguard` folder (or inside `backend` depending on your config, but usually root for shared envs). It must contain:
```
DATABASE_URL=postgresql://<user>:<password>@<host>/<dbname>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
DEFAULT_LAT=9.5916
DEFAULT_LON=76.5222
FRONTEND_ORIGIN=http://localhost:5173
```
*Note: Share these values securely (e.g., via a password manager), do not commit `.env` to Git.*

Run the backend:
```bash
uvicorn app:app --reload
```
The API will be available at `http://localhost:8000`.

### 3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the frontend:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## Mobile Support
This is a **Responsive Web Application**.
-   **Yes**, it can be accessed on a mobile phone via a web browser (Chrome, Safari, etc.).
-   If hosting locally, ensure the phone is on the **same Wi-Fi network** and access it via your computer's local IP address (e.g., `http://192.168.1.5:5173`).
-   For a native app-like experience, you can turn this into a PWA (Progressive Web App) or wrap it using tools like Capacitor in the future.
