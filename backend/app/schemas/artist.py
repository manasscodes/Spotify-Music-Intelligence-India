from pydantic import BaseModel
from typing import List

class ArtistData(BaseModel):
    artist: str
    track_count: int
    avg_popularity: float

class ArtistResponse(BaseModel):
    top_by_volume: List[ArtistData]
    top_by_popularity: List[ArtistData]