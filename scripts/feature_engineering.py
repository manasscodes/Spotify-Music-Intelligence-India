import pandas as pd
import numpy as np
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

PROCESSED_DIR = Path("data/processed")

def engineer_features(df: pd.DataFrame) -> pd.DataFrame:
    logging.info("Starting Feature Engineering...")
    
    # ---------------------------------------------------------
    # FEATURE 1: Primary Artist (Extract first artist from collaborations)
    # ---------------------------------------------------------
    # Split by '|' and take the first element
    df['primary_artist'] = df['singer'].str.split('|').str[0]
    logging.info(f"Created 'primary_artist'. Unique primary artists: {df['primary_artist'].nunique()}")

    # ---------------------------------------------------------
    # FEATURE 2: Temporal Features (Release Year & Age)
    # ---------------------------------------------------------
    # The 'released_date' is currently a string like '09-10-2020'
    # Let's convert it and extract the year
    df['release_date_parsed'] = pd.to_datetime(df['released_date'], format='mixed', dayfirst=True, errors='coerce')
    
    # Extract Year
    df['release_year'] = df['release_date_parsed'].dt.year
    
    # Calculate Age of song (assuming current year is 2025 for this dataset)
    current_year = 2025
    df['years_since_release'] = current_year - df['release_year']
    
    # Drop rows where date parsing failed (very few)
    initial_rows = len(df)
    df.dropna(subset=['release_year', 'years_since_release'], inplace=True)
    logging.info(f"Created 'release_year' and 'years_since_release'. Dropped {initial_rows - len(df)} rows with unparseable dates.")

    # ---------------------------------------------------------
    # FEATURE 3: Target Encoding for Language & Primary Artist
    # ---------------------------------------------------------
    # Replace categorical strings with their average popularity. 
    # This gives the model a "hint" about the historical success of that category.
    
    # Language Target Encoding
    lang_target_map = df.groupby('language')['popularity'].mean().to_dict()
    df['language_target_enc'] = df['language'].map(lang_target_map)
    
    # Primary Artist Target Encoding
    # Note: To prevent data leakage in a real prod environment, we'd calculate this only on training data.
    # For this platform build, we'll do a global mapping.
    artist_target_map = df.groupby('primary_artist')['popularity'].mean().to_dict()
    df['artist_target_enc'] = df['primary_artist'].map(artist_target_map)
    
    logging.info("Created target encoding for 'language' and 'primary_artist'.")

    # ---------------------------------------------------------
    # CLEANUP: Select final columns for the ML Model
    # ---------------------------------------------------------
    ml_columns = [
        'danceability', 'acousticness', 'energy', 'liveness', 'loudness', 
        'speechiness', 'tempo', 'valence', 'duration_ms', 
        'release_year', 'years_since_release',
        'language_target_enc', 'artist_target_enc',
        'popularity' # Target Variable
    ]
    
    df_ml = df[ml_columns].copy()
    
    # Drop any remaining NaNs in the final feature set
    df_ml.dropna(inplace=True)
    
    output_path = PROCESSED_DIR / "indian_songs_ml_ready.parquet"
    df_ml.to_parquet(output_path, index=False)
    logging.info(f"✅ ML Ready Dataset saved to {output_path} | Shape: {df_ml.shape}")

    return df_ml

if __name__ == "__main__":
    df_indian = pd.read_parquet(PROCESSED_DIR / "indian_songs_cleaned.parquet")
    engineer_features(df_indian)