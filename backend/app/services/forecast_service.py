import json
from pathlib import Path
from ..schemas.forecast import ForecastResponse

# Bulletproof pathing
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
DATA_PATH = PROJECT_ROOT / "data" / "processed" / "forecast_data.json"

def get_forecasts() -> ForecastResponse:
    with open(DATA_PATH, 'r') as f:
        data = json.load(f)
    return ForecastResponse(forecasts=data)