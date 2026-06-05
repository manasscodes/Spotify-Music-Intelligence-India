from pydantic import BaseModel
from typing import List

class AudioProfile(BaseModel):
    language: str
    danceability: float
    energy: float
    loudness: float
    speechiness: float
    acousticness: float
    liveness: float
    valence: float
    tempo: float

class AudioComparisonResponse(BaseModel):
    profiles: List[AudioProfile]