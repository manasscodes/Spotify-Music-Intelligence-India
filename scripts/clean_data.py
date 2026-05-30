import pandas as pd
import numpy as np
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

RAW_DIR = Path("data/raw")
PROCESSED_DIR = Path("data/processed")

# Ensure the processed directory exists
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

def clean_indian_dataset(filepath: Path) -> pd.DataFrame:
    logging.info(f"--- Cleaning Indian Dataset ---")
    df = pd.read_parquet(filepath)
    
    # 1. Standardize Column Names (lowercase, replace spaces with underscores)
    df.columns = [col.lower().replace(' ', '_') for col in df.columns]
    logging.info(f"Standardized columns. 'Valence' is now: '{df.columns[df.columns == 'valence'][0]}'")

    # 2. Fix Duration (Convert string like "3:45" or "213000" to numeric milliseconds)
    def parse_duration(val):
        if pd.isna(val): return np.nan
        val = str(val)
        if ':' in val: # Format: "M:SS"
            parts = val.split(':')
            try: return (int(parts[0]) * 60 + int(parts[1])) * 1000
            except: return np.nan
        else: # Format: milliseconds as string
            try: return float(val)
            except: return np.nan
            
    df['duration_ms'] = df['duration'].apply(parse_duration)
    df.drop(columns=['duration'], inplace=True) # Drop old string column
    logging.info("Parsed 'duration' string into 'duration_ms' numeric.")

    # 3. Fix Time Signature (Cap max at 7, set invalid to NaN)
    invalid_ts = df['time_signature'] > 7
    df.loc[invalid_ts, 'time_signature'] = np.nan
    logging.info(f"Capped {invalid_ts.sum()} invalid time_signature values (>7) to NaN.")

    # 4. Drop rows with any remaining critical missing values (very few in this dataset)
    initial_rows = len(df)
    df.dropna(subset=['popularity', 'danceability', 'energy', 'duration_ms'], inplace=True)
    logging.info(f"Dropped {initial_rows - len(df)} rows with critical missing values.")

    # Save to processed
    output_path = PROCESSED_DIR / "indian_songs_cleaned.parquet"
    df.to_parquet(output_path, index=False)
    logging.info(f"Saved cleaned Indian data to {output_path} | Shape: {df.shape}\n")
    return df

def clean_global_dataset(filepath: Path) -> pd.DataFrame:
    logging.info(f"--- Cleaning Global Dataset ---")
    df = pd.read_parquet(filepath)

    # 1. Standardize Columns
    df.columns = [col.lower().replace(' ', '_') for col in df.columns]

    # 2. Coalesce Duration Columns
    # If track_duration_ms is missing, calculate it from track_duration_min
    df['duration_ms'] = df['track_duration_ms'].fillna(df['track_duration_min'] * 60 * 1000)
    
    # 3. Drop rows with 0 duration or missing duration
    initial_rows = len(df)
    df = df[df['duration_ms'] > 0] # Remove 0 duration tracks
    df.dropna(subset=['duration_ms'], inplace=True)
    logging.info(f"Dropped {initial_rows - len(df)} rows with 0 or missing duration.")

    # 4. Handle Missing Genres
    df['artist_genres'] = df['artist_genres'].fillna('unknown')
    logging.info("Filled missing 'artist_genres' with 'unknown'.")

    # 5. Clean up old duration columns
    df.drop(columns=['track_duration_ms', 'track_duration_min'], inplace=True)

    # Save to processed
    output_path = PROCESSED_DIR / "global_songs_cleaned.parquet"
    df.to_parquet(output_path, index=False)
    logging.info(f"Saved cleaned Global data to {output_path} | Shape: {df.shape}\n")
    return df

if __name__ == "__main__":
    indian_raw = RAW_DIR / "spotify_indian_unified.parquet"
    global_raw = RAW_DIR / "spotify_global_unified.parquet"

    clean_indian_dataset(indian_raw)
    clean_global_dataset(global_raw)
    
    logging.info("✅ Data cleaning complete! Trust level: High.")