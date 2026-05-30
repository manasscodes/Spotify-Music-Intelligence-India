from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import prediction # <-- Changed to relative import

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

@app.get("/")
def root():
    return {"message": "Welcome to the Spotify India Intelligence API 🎵"}