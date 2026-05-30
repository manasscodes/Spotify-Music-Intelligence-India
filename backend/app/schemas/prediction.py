from pydantic import BaseModel, Field
from typing import Optional

# This defines the exact JSON the frontend must send to get a hit prediction
class SongFeaturesInput(BaseModel):
    danceability: float = Field(..., ge=0, le=1, description="Danceability score (0-1)")
    acousticness: float = Field(..., ge=0, le=1, description="Acousticness score (0-1)")
    energy: float = Field(..., ge=0, le=1, description="Energy score (0-1)")
    liveness: float = Field(..., ge=0, le=1, description="Liveness score (0-1)")
    loudness: float = Field(..., ge=-20, le=0, description="Loudness dB (-20 to 0)")
    speechiness: float = Field(..., ge=0, le=1, description="Speechiness score (0-1)")
    tempo: float = Field(..., ge=0, le=300, description="Tempo BPM")
    valence: float = Field(..., ge=0, le=1, description="Valence score (0-1)")
    duration_ms: float = Field(..., ge=0, description="Duration in milliseconds")
    release_year: int = Field(..., ge=1950, le=2030, description="Year of release")
    years_since_release: int = Field(..., ge=0, description="Years since release")
    language_target_enc: float = Field(..., description="Target encoding for language")
    artist_target_enc: float = Field(..., description="Target encoding for artist")

    class Config:
        json_schema_extra = {
            "example": {
                "danceability": 0.7,
                "acousticness": 0.2,
                "energy": 0.8,
                "liveness": 0.1,
                "loudness": -5.0,
                "speechiness": 0.05,
                "tempo": 120.0,
                "valence": 0.6,
                "duration_ms": 210000,
                "release_year": 2023,
                "years_since_release": 2,
                "language_target_enc": 64.5,
                "artist_target_enc": 70.2
            }
        }

# This defines the exact JSON we return to the frontend
class HitPredictionOutput(BaseModel):
    hit_probability: float = Field(..., description="Probability of being a hit (0-1)")
    is_hit: bool = Field(..., description="True if probability > 0.5")