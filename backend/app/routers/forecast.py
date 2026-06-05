from fastapi import APIRouter
from ..schemas.forecast import ForecastResponse
from ..services.forecast_service import get_forecasts

router = APIRouter()

@router.get("/forecast/trends", response_model=ForecastResponse)
def fetch_forecasts():
    """Fetches pre-computed historical and forecasted popularity trends."""
    return get_forecasts()