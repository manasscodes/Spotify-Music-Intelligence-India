import pandas as pd
from pathlib import Path
from ..schemas.artist import ArtistData, ArtistResponse

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent.parent
DATA_PATH = PROJECT_ROOT / "data" / "processed" / "indian_songs_cleaned.parquet"

df = pd.read_parquet(DATA_PATH)

def get_artist_intelligence() -> ArtistResponse:
    # Extract primary artist
    df['primary_artist'] = df['singer'].str.split('|').str[0]
    
    artist_df = df.groupby('primary_artist').agg(
        track_count=('song_name', 'count'),
        avg_popularity=('popularity', 'mean')
    ).reset_index()
    
    # Filter established artists (5+ tracks)
    established = artist_df[artist_df['track_count'] >= 5].copy()
    
    # Top 10 by volume
    top_vol = established.sort_values('track_count', ascending=False).head(10)
    vol_list = [ArtistData(artist=row['primary_artist'], track_count=int(row['track_count']), avg_popularity=round(row['avg_popularity'], 2)) for _, row in top_vol.iterrows()]
    
    # Top 10 by popularity
    top_pop = established.sort_values('avg_popularity', ascending=False).head(10)
    pop_list = [ArtistData(artist=row['primary_artist'], track_count=int(row['track_count']), avg_popularity=round(row['avg_popularity'], 2)) for _, row in top_pop.iterrows()]
    
    return ArtistResponse(top_by_volume=vol_list, top_by_popularity=pop_list)