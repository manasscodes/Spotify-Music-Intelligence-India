from fastapi import APIRouter, HTTPException
from ..schemas.prediction import SongFeaturesInput, HitPredictionOutput # <-- Relative
from ..services.prediction_service import predict_hit                   # <-- Relative

router = APIRouter()

@router.post("/predict/hit", response_model=HitPredictionOutput)
def get_hit_prediction(song: SongFeaturesInput):
    try:
        result = predict_hit(song)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))