import pandas as pd
from pathlib import Path
from ..schemas.analytics import AnalyticsResponse, ExecutiveKPIs, LanguageDistribution

# Bulletproof pathing
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
DATA_PATH = PROJECT_ROOT / "data" / "processed" / "indian_songs_cleaned.parquet"

# Load data once into memory
df = pd.read_parquet(DATA_PATH)

def get_analytics() -> AnalyticsResponse:
    # Calculate KPIs
    total_songs = len(df)
    # Unique primary artists (split collaborations)
    unique_artists = df['singer'].str.split('|').str[0].nunique()
    total_languages = df['language'].nunique()
    avg_popularity = round(df['popularity'].mean(), 2)
    hit_rate = round((df['popularity'] >= 75).mean() * 100, 2)
    
    kpis = ExecutiveKPIs(
        total_songs=total_songs,
        total_artists=unique_artists,
        total_languages=total_languages,
        avg_popularity=avg_popularity,
        hit_rate=hit_rate
    )
    
    # Calculate Language Distribution
    lang_stats = df.groupby('language').agg(
        track_count=('song_name', 'count'),
        avg_popularity=('popularity', 'mean')
    ).reset_index().sort_values('track_count', ascending=False)
    
    lang_distribution = [
        LanguageDistribution(
            language=row['language'],
            track_count=int(row['track_count']),
            avg_popularity=round(row['avg_popularity'], 2)
        ) for _, row in lang_stats.iterrows()
    ]
    
    return AnalyticsResponse(kpis=kpis, language_distribution=lang_distribution)