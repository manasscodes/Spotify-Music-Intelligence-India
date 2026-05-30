from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import prediction, analytics # <-- Added analytics

app = FastAPI(
    title="Spotify India Intelligence API",
    description="AI-Powered Music Trend Forecasting & Popularity Prediction System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(prediction.router, prefix="/api/v1", tags=["Prediction"])
app.include_router(analytics.router, prefix="/api/v1", tags=["Analytics"]) # <-- Added

@app.get("/")
def root():
    return {"message": "Welcome to the Spotify India Intelligence API 🎵"}