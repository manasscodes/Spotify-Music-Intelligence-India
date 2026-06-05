import { fetchForecastData } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import ForecastTrendChart from "@/components/charts/ForecastTrendChart";

export default async function FutureForecasting() {
  const data = await fetchForecastData();
  const { forecasts } = data;

  // Extract just the Hindi forecast for the insight card
  const hindiForecast = forecasts.filter((f: any) => f.language === "Hindi" && f.type === "forecast");
  const punjabiForecast = forecasts.filter((f: any) => f.language === "Punjabi" && f.type === "forecast");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Future Trend Forecasting</h1>
        <p className="text-spotify-subtext mt-1">AI-powered popularity projections (2025-2027) via Holt-Winters Exponential Smoothing</p>
      </div>

      <Card className="bg-spotify-dark border-spotify-hover shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="h-5 w-5 text-spotify-green" />
            Market Momentum: Big 4 Languages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[450px] w-full">
            <ForecastTrendChart data={forecasts} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-spotify-dark border-spotify-hover shadow-none p-6">
          <h3 className="text-lg font-semibold text-spotify-green mb-2">🛑 Hindi: The Mature Market</h3>
          <p className="text-spotify-subtext text-sm">
            Forecasted to flatline at ~<span className="text-white font-bold">{hindiForecast[0]?.popularity}</span> popularity through 2027. 
            This indicates a saturated market. Strategy: Maintain catalog, but do not over-invest expecting exponential growth.
          </p>
        </Card>

        <Card className="bg-spotify-dark border-spotify-hover shadow-none p-6">
          <h3 className="text-lg font-semibold text-spotify-green mb-2">🚀 Punjabi: The Growth Engine</h3>
          <p className="text-spotify-subtext text-sm">
            Predicted to maintain a higher baseline at ~<span className="text-white font-bold">{punjabiForecast[0]?.popularity}</span> popularity. 
            Punjabi music is showing sustained momentum. Strategy: Aggressive playlisting and artist signing to capture market share.
          </p>
        </Card>
      </div>
    </div>
  );
}