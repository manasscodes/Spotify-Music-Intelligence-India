from fastapi import APIRouter
from ..schemas.quality import QualityResponse
from ..services.quality_service import get_quality_report

router = APIRouter()

@router.get("/quality/report", response_model=QualityResponse)
def fetch_quality_report():
    """Fetches the data quality audit report and health scores."""
    return get_quality_report()