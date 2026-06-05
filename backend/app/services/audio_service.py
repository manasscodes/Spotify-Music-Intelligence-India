import pandas as pd
import numpy as np
from pathlib import Path
from ..schemas.audio import AudioProfile, AudioComparisonResponse

# Bulletproof pathing
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
DATA_PATH = PROJECT_ROOT / "data" / "processed" / "indian_songs_cleaned.parquet"

df = pd.read_parquet(DATA_PATH)

# Audio features to include
AUDIO_COLS = ['danceability', 'energy', 'loudness', 'speechiness', 'acousticness', 'liveness', 'valence', 'tempo']

def get_audio_profiles() -> AudioComparisonResponse:
    # Group by language and calculate mean
    lang_profiles = df.groupby('language')[AUDIO_COLS].mean().reset_index()
    
    # Normalize columns to 0-1 scale for the Radar Chart
    # loudness is typically -20 to 0, tempo is 50 to 200. We scale them to 0-1.
    for col in ['loudness', 'tempo']:
        min_val = lang_profiles[col].min()
        max_val = lang_profiles[col].max()
        lang_profiles[col] = ((lang_profiles[col] - min_val) / (max_val - min_val)).round(2)
    
    # Round all other values
    for col in ['danceability', 'energy', 'speechiness', 'acousticness', 'liveness', 'valence']:
        lang_profiles[col] = lang_profiles[col].round(2)
        
    # Sort by language name
    lang_profiles = lang_profiles.sort_values('language')
    
    # Convert to list of Pydantic models
    profiles = [
        AudioProfile(
            language=row['language'],
            danceability=row['danceability'],
            energy=row['energy'],
            loudness=row['loudness'],
            speechiness=row['speechiness'],
            acousticness=row['acousticness'],
            liveness=row['liveness'],
            valence=row['valence'],
            tempo=row['tempo']
        ) for _, row in lang_profiles.iterrows()
    ]
    
    return AudioComparisonResponse(profiles=profiles)