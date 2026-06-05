from fastapi import APIRouter
from ..schemas.audio import AudioComparisonResponse
from ..services.audio_service import get_audio_profiles

router = APIRouter()

@router.get("/audio/profiles", response_model=AudioComparisonResponse)
def fetch_audio_profiles():
    """Fetches average audio feature profiles for all languages, normalized for radar charts."""
    return get_audio_profiles()