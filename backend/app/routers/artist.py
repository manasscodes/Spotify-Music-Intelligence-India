from fastapi import APIRouter
from ..schemas.artist import ArtistResponse
from ..services.artist_service import get_artist_intelligence

router = APIRouter()

@router.get("/artists/intelligence", response_model=ArtistResponse)
def fetch_artist_intelligence():
    """Fetches top artists by volume and average popularity."""
    return get_artist_intelligence()