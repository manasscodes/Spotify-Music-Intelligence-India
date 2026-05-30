import pandas as pd
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

RAW_DATA_DIR = Path("data/raw")

def unify_indian_dataset() -> pd.DataFrame:
    """Finds all regional Indian CSVs, tags them with a language column, and unifies them."""
    logging.info("--- Unifying Indian Language Datasets ---")
    
    # Find all CSVs that end with _songs.csv
    regional_files = list(RAW_DATA_DIR.glob("*_songs.csv"))
    
    if not regional_files:
        logging.error("No regional song files found (e.g., Hindi_songs.csv). Did you put them in data/raw/?")
        return pd.DataFrame()

    unified_dfs = []
    
    for filepath in regional_files:
        # Extract language from filename (e.g., "Hindi_songs.csv" -> "Hindi")
        language_name = filepath.stem.replace("_songs", "")
        
        logging.info(f"Reading {filepath.name} ({language_name})...")
        df = pd.read_csv(filepath, low_memory=False)
        
        # DATA LINEAGE: Inject the language column
        df['language'] = language_name
        
        unified_dfs.append(df)
    
    # Stack all dataframes vertically
    logging.info("Concatenating all regional datasets...")
    unified_df = pd.concat(unified_dfs, ignore_index=True)
    
    logging.info(f"Unified Indian Dataset Shape: {unified_df.shape}")
    
    # Save as Parquet (Industry standard)
    output_path = RAW_DATA_DIR / "spotify_indian_unified.parquet"
    unified_df.to_parquet(output_path, index=False)
    logging.info(f"Saved unified dataset to {output_path}\n")
    
    return unified_df

def unify_global_dataset() -> pd.DataFrame:
    """Loads and combines the global dataset CSVs."""
    logging.info("--- Unifying Global Datasets ---")
    
    global_files = list(RAW_DATA_DIR.glob("*.csv"))
    # Filter out the regional files we just processed
    global_files = [f for f in global_files if "_songs.csv" not in f.name]
    
    if not global_files:
        logging.error("No global CSVs found in data/raw/")
        return pd.DataFrame()

    global_dfs = []
    for filepath in global_files:
        logging.info(f"Reading {filepath.name}...")
        df = pd.read_csv(filepath, low_memory=False)
        global_dfs.append(df)
    
    # We will attempt an outer concatenation. If columns don't match, it fills with NaN.
    # This is safer than assuming they have the exact same schema.
    logging.info("Concatenating global datasets...")
    unified_df = pd.concat(global_dfs, ignore_index=True)
    
    logging.info(f"Unified Global Dataset Shape: {unified_df.shape}")
    
    output_path = RAW_DATA_DIR / "spotify_global_unified.parquet"
    unified_df.to_parquet(output_path, index=False)
    logging.info(f"Saved unified dataset to {output_path}\n")
    
    return unified_df

if __name__ == "__main__":
    unify_indian_dataset()
    unify_global_dataset()
    logging.info("✅ Data consolidation complete!")