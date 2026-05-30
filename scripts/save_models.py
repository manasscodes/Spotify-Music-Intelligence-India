import joblib
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

# We need to quickly retrain and save, or just save from a notebook. 
# Since we want scripts to be our source of truth, let's do it here.
import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split

PROCESSED_DIR = Path("data/processed")
MODELS_DIR = Path("data/models")
MODELS_DIR.mkdir(parents=True, exist_ok=True)

def train_and_save_hit_classifier():
    logging.info("Loading ML data...")
    df = pd.read_parquet(PROCESSED_DIR / "indian_songs_ml_ready.parquet")
    
    df['is_hit'] = (df['popularity'] >= 75).astype(int)
    
    FEATURES = [col for col in df.columns if col not in ['popularity', 'is_hit']]
    X = df[FEATURES]
    y = df['is_hit']
    
    # Train on FULL dataset for the production model (no split needed since we validated in notebook)
    hit_ratio = (y == 0).sum() / (y == 1).sum()
    
    logging.info("Training production XGBoost Classifier on full dataset...")
    xgb_clf = xgb.XGBClassifier(
        n_estimators=300,
        learning_rate=0.05,
        max_depth=6,
        scale_pos_weight=hit_ratio,
        random_state=42,
        eval_metric='logloss'
    )
    xgb_clf.fit(X, y)
    
    # Save the model
    model_path = MODELS_DIR / "hit_classifier.pkl"
    joblib.dump(xgb_clf, model_path)
    logging.info(f"✅ Hit Classifier saved to {model_path}")
    
    # Save the feature list (critical for API validation later)
    feature_path = MODELS_DIR / "model_features.pkl"
    joblib.dump(FEATURES, feature_path)
    logging.info(f"✅ Feature list saved to {feature_path}")

if __name__ == "__main__":
    train_and_save_hit_classifier()