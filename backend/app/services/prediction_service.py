import joblib
import pandas as pd
from pathlib import Path
from ..schemas.prediction import SongFeaturesInput, HitPredictionOutput # <-- Relative

# BULLETPROOF PATHING: Calculate project root dynamically
# This file is 4 levels deep from root: root -> backend -> app -> services -> this file
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
MODELS_DIR = PROJECT_ROOT / "data" / "models"

MODEL_PATH = MODELS_DIR / "hit_classifier.pkl"
FEATURES_PATH = MODELS_DIR / "model_features.pkl"

# Load into memory
model = joblib.load(MODEL_PATH)
model_features = joblib.load(FEATURES_PATH)

def predict_hit(song_data: SongFeaturesInput) -> HitPredictionOutput:
    input_dict = song_data.model_dump()
    df = pd.DataFrame([input_dict])
    df = df[model_features]
    
    probabilities = model.predict_proba(df)[0]
    hit_prob = probabilities[1]
    is_hit = hit_prob >= 0.5
    
    return HitPredictionOutput(
        hit_probability=round(hit_prob, 4),
        is_hit=is_hit
    )