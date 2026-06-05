from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import prediction, analytics, audio, forecast, quality, artist # <-- Added

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

app.include_router(prediction.router, prefix="/api/v1", tags=["Prediction"])
app.include_router(analytics.router, prefix="/api/v1", tags=["Analytics"])
app.include_router(audio.router, prefix="/api/v1", tags=["Audio Intelligence"])
app.include_router(forecast.router, prefix="/api/v1", tags=["Forecasting"])
app.include_router(quality.router, prefix="/api/v1", tags=["Data Quality"])
app.include_router(artist.router, prefix="/api/v1", tags=["Artist Intelligence"])

@app.get("/")
def root():
    return {"message": "Welcome to the Spotify India Intelligence API 🎵"}