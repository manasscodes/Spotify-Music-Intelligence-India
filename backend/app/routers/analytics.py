from fastapi import APIRouter
from ..schemas.analytics import AnalyticsResponse
from ..services.analytics_service import get_analytics

router = APIRouter()

@router.get("/analytics/overview", response_model=AnalyticsResponse)
def fetch_analytics():
    """Fetches Executive KPIs and Language Distribution for the dashboard."""
    return get_analytics()