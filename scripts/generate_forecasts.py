import pandas as pd
import numpy as np
from statsmodels.tsa.holtwinters import ExponentialSmoothing
import json
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

PROCESSED_DIR = Path("data/processed")
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

def generate_and_save_forecasts():
    logging.info("Loading cleaned data...")
    df = pd.read_parquet(PROCESSED_DIR / "indian_songs_cleaned.parquet")
    
    # Parse dates and extract year
    df['release_year'] = pd.to_datetime(df['released_date'], format='mixed', dayfirst=True, errors='coerce').dt.year
    df.dropna(subset=['release_year'], inplace=True)
    df['release_year'] = df['release_year'].astype(int)
    
    # Calculate average popularity per year per language
    trend_data = df.groupby(['release_year', 'language']).agg(
        avg_popularity=('popularity', 'mean')
    ).reset_index()
    
    # We will forecast for the Big 4 languages
    target_languages = ['Hindi', 'Punjabi', 'Tamil', 'Telugu']
    all_forecast_data = []
    
    for lang in target_languages:
        logging.info(f"Forecasting for {lang}...")
        lang_trend = trend_data[trend_data['language'] == lang].sort_values('release_year')
        
        # Set index to year for statsmodels
        y_values = lang_trend.set_index('release_year')['avg_popularity']
        
        # Train Holt-Winters
        model = ExponentialSmoothing(y_values, trend='add', seasonal=None)
        fit_model = model.fit()
        
        # Forecast 3 years (2025, 2026, 2027)
        forecast_years = [2025, 2026, 2027]
        forecast_values = fit_model.forecast(3)
        
        # Calculate confidence interval (approx 95%)
        residuals = y_values - fit_model.fittedvalues
        std_err = residuals.std()
        ci_upper = forecast_values + (1.96 * std_err)
        ci_lower = forecast_values - (1.96 * std_err)
        
        # Format Historical Data
        for year, pop in y_values.items():
            all_forecast_data.append({
                "language": lang,
                "year": int(year),
                "popularity": round(pop, 2),
                "type": "historical",
                "ci_upper": None,
                "ci_lower": None
            })
            
        # Format Forecast Data
        for i, year in enumerate(forecast_years):
            all_forecast_data.append({
                "language": lang,
                "year": year,
                "popularity": round(forecast_values.iloc[i], 2),
                "type": "forecast",
                "ci_upper": round(ci_upper.iloc[i], 2),
                "ci_lower": round(ci_lower.iloc[i], 2)
            })
            
    # Save to JSON
    output_path = PROCESSED_DIR / "forecast_data.json"
    with open(output_path, 'w') as f:
        json.dump(all_forecast_data, f, indent=4)
        
    logging.info(f"✅ Forecast data saved to {output_path}")

if __name__ == "__main__":
    generate_and_save_forecasts()