from pydantic import BaseModel
from typing import List, Optional

class ForecastDataPoint(BaseModel):
    language: str
    year: int
    popularity: float
    type: str  # "historical" or "forecast"
    ci_upper: Optional[float] = None
    ci_lower: Optional[float] = None

class ForecastResponse(BaseModel):
    forecasts: List[ForecastDataPoint]