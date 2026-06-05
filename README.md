
# 🎵 Spotify India Intelligence Platform

**Live Demo:** [https://spotify-music-intelligence-india.vercel.app/](https://spotify-music-intelligence-india.vercel.app/)

An AI-powered, full-stack analytics platform that analyzes Indian music consumption trends across 16 languages, forecasts regional popularity, and predicts hit songs using Machine Learning. Built to resemble an internal premium SaaS tool used by Product Managers, Data Scientists, and Regional Growth Teams at Spotify.

---

## 🚀 Overview

The Indian music market is not a monolith; it's a highly fragmented, multilingual constellation of markets. A one-size-fits-all recommendation engine fails to capture the nuances of Punjabi vs. Tamil vs. Telugu music. 

**The Problem:** Spotify India lacks a centralized, AI-driven intelligence system to visualize regional audio DNA, forecast language momentum, and predict song success before allocating marketing budgets.

**The Solution:** This platform provides an end-to-end analytical suite—from data quality auditing to interactive hit prediction—to empower strategic content investment and playlist curation.

**Who is this for?** Product Managers, Music Strategists, Data Scientists, and Artist Relations Teams.

**Why is it useful?** It transforms raw audio metadata and historical trends into actionable business insights (e.g., "Punjabi music shows sustained momentum; adjust playlist strategy," or "High danceability + Star Power = Hit").

---

## ✨ Features

### 📊 Analytics & Intelligence
*   **Executive Overview:** Real-time KPIs (Total Songs, Artists, Languages, Hit Rate) and language catalog distribution.
*   **Language Analytics:** Deep dive into track counts and performance metrics across 16 Indian languages.
*   **Audio Intelligence:** Radar charts comparing the "Audio DNA" (Danceability, Energy, Tempo, etc.) of top languages.
*   **Artist Intelligence:** Leaderboards identifying "Volume Titans" vs. "Consistency Champions" (filtering out one-hit wonders).
*   **Future Forecasting:** 3-year popularity projections (2025-2027) per language using Holt-Winters Exponential Smoothing.

### 🤖 Machine Learning & AI
*   **Hit Prediction Lab:** Interactive tool where users input audio features to get a real-time hit probability score from an XGBoost classifier.
*   **Explainable AI (SHAP):** Under-the-hood SHAP analysis revealing *why* songs are predicted as hits (e.g., Star Power outweighs Tempo).
*   **Data Quality Intelligence:** Automated health scoring (Completeness, Uniqueness, Validity) and structural bias detection.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS v4, Shadcn UI, Recharts, Framer Motion, Lucide Icons |
| **Backend** | FastAPI, Pydantic V2, Uvicorn, CORS Middleware |
| **Machine Learning** | XGBoost, SHAP, Scikit-Learn, Statsmodels (Holt-Winters), Pandas, NumPy |
| **Data Engineering** | PyArrow (Parquet), `uv` Package Manager, Joblib |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🏗️ Architecture / How It Works

This project follows a strict separation of concerns, utilizing a modern AI/SaaS split architecture:

1.  **Pre-computation Layer:** Raw CSVs are unified, cleaned, and feature-engineered locally. ML models (XGBoost) are trained and serialized into `.pkl` files. Forecasts are pre-calculated and saved as JSON. This ensures the web server only handles inference/serving, not heavy computing.
2.  **API Tier (FastAPI):** Loads the serialized models and Parquet data into memory on startup. Exposes REST endpoints for analytics and real-time ML inference via Pydantic schemas.
3.  **Frontend Tier (Next.js):** Server Components fetch data from the FastAPI backend. Client Components handle interactive charts (Recharts) and user inputs (Hit Prediction Lab).
4.  **Deployment:** The monorepo is split during deployment—Vercel builds the `frontend/` folder, Render builds the root Python backend.

```text
[ Next.js Frontend (Vercel) ] --(REST)--> [ FastAPI Backend (Render) ] --(Read)--> [ Parquet / .pkl Artifacts ]
```

---

## 📂 Folder Structure

```text
spotify-india-intelligence/
│
├── backend/
│   └── app/
│       ├── main.py                 # FastAPI entry point & CORS setup
│       ├── routers/                # API endpoints (Prediction, Analytics, Audio, Forecast, etc.)
│       ├── services/               # Business logic & ML model loading
│       └── schemas/                # Pydantic request/response models
│
├── data/
│   ├── processed/                  # Cleaned Parquet files & Pre-computed JSONs (Git-tracked for Render)
│   └── models/                     # Serialized .pkl models (Git-tracked for Render)
│
├── frontend/
│   ├── app/                        # Next.js App Router pages
│   ├── components/                 # UI components (Shadcn, Recharts, Layout)
│   └── lib/                        # API helpers and utilities
│
├── notebooks/                      # Jupyter Notebooks (EDA, Training, SHAP analysis)
├── scripts/                        # Data pipeline & model training scripts
└── requirements.txt                # Python dependencies
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.11+ (3.11 recommended for ML library compatibility)
- Node.js 18+
- [uv](https://github.com/astral-sh/uv) (Fast Python package manager)

### 1. Clone the Repository
```bash
git clone https://github.com/manasscodes/Spotify-Music-Intelligence-India.git
cd Spotify-Music-Intelligence-India
```

### 2. Backend Setup (FastAPI)
```bash
# Create and activate virtual environment
uv venv
source .venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
uv pip install -r requirements.txt

# Run Data Pipeline & Train Models (Generates .pkl and parquet files)
python scripts/consolidate_data.py
python scripts/clean_data.py
python scripts/generate_quality_report.py
python scripts/feature_engineering.py
python scripts/generate_forecasts.py
python scripts/save_models.py

# Start FastAPI Server
uvicorn backend.app.main:app --reload --port 8000
```
*The Backend API will be live at `http://localhost:8000/docs`*

### 3. Frontend Setup (Next.js)
Open a new terminal window:
```bash
cd frontend

# Install Node dependencies
npm install

# Start Next.js Development Server
npm run dev
```
*The Dashboard will be live at `http://localhost:3000`*

---

## 🔑 Environment Variables

For local development, the frontend is hardcoded to `http://127.0.0.1:8000/api/v1`. 

For production deployment, update the API base URL in `frontend/lib/api.ts` to point to your live Render backend URL:
```typescript
const API_BASE_URL = "https://your-render-backend.onrender.com/api/v1"; 
```

**Render Deployment Note:** Set the following Environment Variable in Render to ensure Python 3.11 is used (avoids C++ build failures with ML libraries):
*   `PYTHON_VERSION` = `3.11.9`

---

## 🧪 Usage

1.  **Executive View:** Launch the app and view high-level KPIs and language distribution.
2.  **Audio DNA:** Navigate to "Audio Intelligence" to compare the radar charts of Hindi, Punjabi, Tamil, and Telugu music.
3.  **Predict a Hit:** Go to "Hit Prediction Lab", adjust the audio feature sliders (Danceability, Energy, Tempo), and click "Predict" to see the XGBoost model's real-time hit probability.
4.  **Forecasting:** Check "Future Forecasting" to view 3-year trend lines and confidence intervals for regional markets.

---

## 📸 Screenshots / Demo

*   **Executive Overview Dashboard:** Real-time KPIs and language catalog distribution bar chart.
*   **Hit Prediction Lab:** Interactive sliders sending payloads to FastAPI and rendering XGBoost confidence scores.
*   **Audio Intelligence:** Radar charts comparing language audio profiles.
*   **Future Forecasting:** Line charts showing historical vs. predicted popularity with confidence intervals.

*(Screenshots of these views should be added here to showcase the premium dark-theme UI)*

---

## 🚧 Challenges & Learnings

Building this platform required several Senior Engineer-level pivots from initial assumptions:

*   **The 5% R² Reality:** Initial attempts to predict exact popularity scores (Regression) yielded only 5% R². Music popularity is heavily driven by non-linear external factors (movies, marketing). **Learning:** Pivoted to Hit Classification (>=75 popularity) and used SHAP to explain predictions. A 57% accurate model that explains its reasoning is 100x more valuable than a black-box model.
*   **Prophet vs. Holt-Winters:** Meta's Prophet library crashed on yearly data due to C++ backend issues and data granularity mismatch. **Learning:** Pivoted to Statsmodels Holt-Winters Exponential Smoothing, which is mathematically better suited for low-frequency (yearly) time series.
*   **Python 3.13/3.14 Deployment Failures:** Deploying to Render failed because Pandas/XGBoost lacked pre-compiled wheels for the latest Python versions, forcing source compilation that exceeded memory limits. **Learning:** Locked Python version to 3.11.9 and switched from `pip` to `uv` for 10x faster dependency resolution.
*   **React 19 & Tremor Incompatibility:** The `@tremor/react` library conflicted with React 19. **Learning:** Replaced Tremor with Shadcn UI + Recharts, providing complete control over the Spotify-dark theme.
*   **Recharts Hydration Bug:** Server-side rendering of Recharts caused `-1 width/height` errors. **Learning:** Strictly isolated charts into Client Components using `"use client"` and mounted them via `useEffect` before rendering.

---

## 🔮 Future Improvements

*   **Cloud Database Migration:** Move from static Parquet files to a hosted PostgreSQL (Neon) so the data can be updated via API without redeployment.
*   **User Authentication:** Add NextAuth.js to gate the dashboard for internal team members only.
*   **SHAP UI Integration:** Render the SHAP waterfall plots directly in the frontend Hit Prediction Lab, so users can visually see *why* the model made its prediction.
*   **Expanded Forecasting:** Add forecasting capabilities for all 16 languages and genre-level granularities.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


Built with ☕ and 🎵 by [Manas Kolaskar](https://github.com/manasscodes)
