This is a **very smart strategic move**. Dropping the AI model (for now) guarantees you will finish the core Marketplace features (Buying, Selling, Maps) which are the heart of the app. If you have extra time at the end, you can always add it back.

I have removed the "AI/ML Phase" and added a special file called `.cursor/active_features.md`.

### 📄 How `.cursor/active_features.md` Works

This file will be your **"Command Center."**

1. **You write a feature** in this file (e.g., `- [ ] Add a search bar for fruits`).
2. **Cursor reads it** as high-priority context.
3. **Cursor builds it.**
4. **You check it off** (`- [x]`).

Here is your **Final, Simplified Hackathon Prompt**.

---

# CURSOR AI PROMPT: AgriLocal (Marketplace Core + Dynamic Feature List)

**Copy and paste the entire block below into Cursor AI's chat:**

---

## PROMPT START

I am building **"AgriLocal"**, a hyper-local marketplace for home farmers in **Kottayam** to sell produce.
**HACKATHON MODE:** Time is critical. We have dropped complex AI features to focus 100% on a robust **Buying & Selling MVP**.

### CORE WORKFLOW (THE "HAPPY PATH")

1. **Seller** posts a product (Photo + Price + Auto-Location).
2. **Buyer** sees products on a Map & List sorted by distance.
3. **Market Widget** shows daily prices of Rubber/Coconut in Kottayam.

### TECH STACK (SIMPLIFIED)

* **Frontend**: React + Vite + TypeScript + Tailwind + **Shadcn UI**.
* **Maps**: **Leaflet** (react-leaflet) with OpenStreetMap.
* **Backend**: FastAPI (Python) - Single `app.py`.
* **Database**: **Neon** (PostgreSQL + PostGIS).
* **Storage**: **Cloudinary** (Free Tier).
* **Hosting**: Vercel (Frontend), Render (Backend).

### FOLDER STRUCTURE TO GENERATE

Please create the following files. **Pay special attention to `.cursor/active_features.md`.**

```text
/
├── .cursor/
│   ├── rules/
│   │   ├── generate.mdc       # Coding standards
│   │   └── workflow.mdc
│   └── active_features.md     # <--- THE LIVING FEATURE LIST
├── Docs/
│   ├── Hackathon_Plan.md      # 4-Phase Schedule
│   ├── Project_structure.md
│   ├── UI_UX_doc.md
│   └── Market_Data.md         # Hardcoded Kottayam prices (fallback)
├── .env.example
├── .gitignore
├── PRD.md
├── project_overview.md
└── setup_guide.md

```

### DETAILED FILE REQUIREMENTS

#### 1. `.cursor/active_features.md` (The "Command Center")

Create this file with the following initial content:

```markdown
# 🚀 Active Feature Queue
This file tracks the features we are currently building.
Cursor: Always check this file to see what to implement next.

## 🟢 CURRENT SPRINT (Must Do)
- [ ] **Project Setup**: Initialize Vite (Shadcn) + FastAPI + Database Connection.
- [ ] **Kottayam Widget**: Create a UI card showing "Today's Market Prices" (Rubber, Coconut, Pepper) using `Docs/Market_Data.md`.
- [ ] **Map View**: specific hardcoded start at Kottayam (Lat: 9.5916, Long: 76.5222).
- [ ] **Seller Flow**: Form to Upload Image (Cloudinary) -> Save Product to DB.
- [ ] **Buyer Flow**: Fetch products from DB -> Show Pins on Map.

## 🟡 BACKLOG (Nice to Have)
- [ ] Phone Number WhatsApp Link (Click to Chat).
- [ ] Search Bar (Filter by "Fruit", "Veg").

```

#### 2. `Docs/Hackathon_Plan.md` (Revised Schedule)

* **Phase 0 (Setup):** Get API Keys (Neon, Cloudinary). Init Repo.
* **Phase 1 (Visuals):** Build the Home Page (Map + Market Price Card). *Win: It looks like a real app immediately.*
* **Phase 2 (Seller):** Build the "Add Item" Form + Backend API.
* **Phase 3 (Buyer):** Connect the Map to the Backend (Show real pins).
* **Phase 4 (Polish):** Fix Mobile Layouts, Add "Contact via WhatsApp" button.

#### 3. `PRD.md` (Marketplace Only)

* **Goal**: A friction-free way to sell backyard produce.
* **Key Features**:
* **Map-First Interface**: Users see what's growing near them immediately.
* **Simple Listing**: No complex forms. Just "What is it?", "Price", "Photo".
* **No Payments**: We only connect people. Payment happens in person (Cash/UPI).



#### 4. `.cursor/rules/generate.mdc`

* **Hardcoding Rule**: If the Geolocation API fails or is slow, default to **Kottayam** coordinates immediately. Do not let the app hang waiting for GPS.
* **Data Rule**: If the Database is empty, load dummy data from a local JSON file so the demo always looks populated.

#### 5. `.env.example`

```bash
DATABASE_URL="postgresql://user:pass@ep-xyz.region.neon.tech/neondb?sslmode=require"
CLOUDINARY_CLOUD_NAME="x"
CLOUDINARY_API_KEY="x"
CLOUDINARY_API_SECRET="x"
# Dev Defaults
DEFAULT_LAT=9.5916
DEFAULT_LON=76.5222

```

### INSTRUCTION

Generate these files immediately. The `.cursor/active_features.md` file is the most important—it will drive our development.

## PROMPT END
