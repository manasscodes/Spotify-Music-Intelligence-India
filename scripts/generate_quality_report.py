import pandas as pd
import numpy as np
from pathlib import Path
import json
import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

PROCESSED_DIR = Path("data/processed")
REPORTS_DIR = Path("data/quality_reports")
REPORTS_DIR.mkdir(parents=True, exist_ok=True)

def calculate_health_score(df: pd.DataFrame, dataset_name: str) -> dict:
    logging.info(f"--- Calculating Health Score for {dataset_name} ---")
    report = {}
    
    # 1. COMPLETENESS SCORE (0-100)
    # What percentage of our data is NOT missing?
    total_cells = df.shape[0] * df.shape[1]
    missing_cells = df.isnull().sum().sum()
    completeness_score = ((total_cells - missing_cells) / total_cells) * 100
    report['completeness_score'] = round(completeness_score, 2)
    
    # 2. UNIQUENESS SCORE (0-100)
    # What percentage of rows are NOT exact duplicates?
    total_rows = len(df)
    duplicate_rows = df.duplicated().sum()
    uniqueness_score = ((total_rows - duplicate_rows) / total_rows) * 100
    report['uniqueness_score'] = round(uniqueness_score, 2)
    
    # 3. VALIDITY SCORE (0-100)
    # Are the values within real-world expected ranges?
    invalid_counts = 0
    
    # Check Indian Dataset specific ranges
    if dataset_name == "Indian Dataset":
        # Audio features must be between 0 and 1
        audio_cols = ['danceability', 'energy', 'acousticness', 'valence', 'liveness', 'speechiness']
        for col in audio_cols:
            if col in df.columns:
                invalid_counts += df[(df[col] < 0) | (df[col] > 1)].shape[0]
        
        # Popularity must be 0-100
        invalid_counts += df[(df['popularity'] < 0) | (df['popularity'] > 100)].shape[0]
        
        # Tempo must be > 0
        invalid_counts += df[df['tempo'] <= 0].shape[0]

    # Check Global Dataset specific ranges
    elif dataset_name == "Global Dataset":
        invalid_counts += df[(df['track_popularity'] < 0) | (df['track_popularity'] > 100)].shape[0]
        invalid_counts += df[df['duration_ms'] <= 0].shape[0]

    validity_score = ((total_rows - invalid_counts) / total_rows) * 100
    report['validity_score'] = round(validity_score, 2)
    
    # 4. OVERALL HEALTH SCORE (Weighted Average)
    # We weight Validity highest because invalid data poisons models fastest
    overall_score = (completeness_score * 0.3) + (uniqueness_score * 0.3) + (validity_score * 0.4)
    report['overall_health_score'] = round(overall_score, 2)
    
    # Additional Metadata
    report['row_count'] = total_rows
    report['column_count'] = df.shape[1]
    report['duplicate_rows'] = int(duplicate_rows)
    report['missing_cells'] = int(missing_cells)

    logging.info(f"Completeness: {report['completeness_score']}% | Uniqueness: {report['uniqueness_score']}% | Validity: {report['validity_score']}%")
    logging.info(f"🏆 Overall Health Score: {report['overall_health_score']}/100\n")
    
    return report

if __name__ == "__main__":
    # Load Cleaned Data
    df_indian = pd.read_parquet(PROCESSED_DIR / "indian_songs_cleaned.parquet")
    df_global = pd.read_parquet(PROCESSED_DIR / "global_songs_cleaned.parquet")
    
    # Calculate Scores
    final_report = {
        "indian_dataset": calculate_health_score(df_indian, "Indian Dataset"),
        "global_dataset": calculate_health_score(df_global, "Global Dataset"),
        "strategic_notes": [
            "Global Dataset lacks audio features (danceability, energy, etc.). It cannot be used for Audio Intelligence or Hit Prediction modeling.",
            "Indian Dataset 'popularity' min is 25.0. The dataset is pre-filtered to exclude highly unpopular songs. Hit classification threshold must be adjusted accordingly.",
            "Global Dataset 'artist_genres' was 19% missing and filled with 'unknown'. Genre analysis on Global data will have a gap."
        ]
    }
    
    # Save Report
    report_path = REPORTS_DIR / "data_quality_report.json"
    with open(report_path, 'w') as f:
        json.dump(final_report, f, indent=4)
        
    logging.info(f"✅ Quality Report saved to {report_path}")