import pandas as pd
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

RAW_DATA_DIR = Path("data/raw")

def load_and_profile(filepath: Path) -> pd.DataFrame:
    """Loads a Parquet file and prints a schema & statistical profile."""
    if not filepath.exists():
        logging.error(f"File not found: {filepath}")
        return pd.DataFrame()
    
    logging.info(f"--- Auditing: {filepath.name} ---")
    
    # Load Parquet file
    df = pd.read_parquet(filepath)
    
    # 1. Shape Analysis
    logging.info(f"Shape: {df.shape[0]:,} rows, {df.shape[1]} columns\n")
    
    # 2. Schema Analysis (Data Types & Missing Values)
    logging.info("Schema / Data Types / Missing Values:")
    schema_info = pd.DataFrame({
        'dtype': df.dtypes,
        'non_null_count': df.count(),
        'null_count': df.isnull().sum(),
        'null_pct': (df.isnull().sum() / len(df) * 100).round(2)
    }).reset_index().rename(columns={'index': 'column'})
    
    for _, row in schema_info.iterrows():
        logging.info(f"  {row['column']:<25} | Type: {str(row['dtype']):<10} | Missing: {row['null_count']:<6} ({row['null_pct']}%)")
    
    # 3. Statistical Summary for Numerical Columns
    logging.info("\nStatistical Summary (Numerical):")
    desc = df.describe(include='number').T
    for col, stats in desc.iterrows():
        logging.info(f"  {col:<25} | Min: {stats['min']:<12.2f} | Max: {stats['max']:<12.2f} | Mean: {stats['mean']:<10.2f}")
    
    logging.info("-" * 70 + "\n")
    
    return df

if __name__ == "__main__":
    # Audit the unified Indian dataset
    indian_data_path = RAW_DATA_DIR / "spotify_indian_unified.parquet"
    df_indian = load_and_profile(indian_data_path)
    
    # Audit the unified Global dataset
    global_data_path = RAW_DATA_DIR / "spotify_global_unified.parquet"
    df_global = load_and_profile(global_data_path)