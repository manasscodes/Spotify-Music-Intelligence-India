from pydantic import BaseModel
from typing import List

class LanguageDistribution(BaseModel):
    language: str
    track_count: int
    avg_popularity: float

class ExecutiveKPIs(BaseModel):
    total_songs: int
    total_artists: int
    total_languages: int
    avg_popularity: float
    hit_rate: float # % of songs with popularity >= 75

class AnalyticsResponse(BaseModel):
    kpis: ExecutiveKPIs
    language_distribution: List[LanguageDistribution]