"use client"; // Must be client component for user interaction

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Loader2 } from "lucide-react";

export default function HitPredictionLab() {
  // 1. State for our form inputs (matching our FastAPI Pydantic schema)
  const [features, setFeatures] = useState({
    danceability: 0.7,
    acousticness: 0.2,
    energy: 0.8,
    liveness: 0.1,
    loudness: -5.0,
    speechiness: 0.05,
    tempo: 120.0,
    valence: 0.6,
    duration_ms: 210000,
    release_year: 2024,
    years_since_release: 1,
    language_target_enc: 64.5, // Approx average
    artist_target_enc: 70.2    // Approx average
  });

  // 2. State for the API response and loading
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 3. Function to send data to FastAPI
  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://spotify-india-api.onrender.com/api/v1/predict/hit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(features),
      });
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hit Prediction Lab</h1>
        <p className="text-spotify-subtext mt-1">Input audio features to predict if a song will be a hit</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form Card */}
        <Card className="bg-spotify-dark border-spotify-hover shadow-none">
          <CardHeader>
            <CardTitle className="text-white">Song Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick input for Danceability */}
            <div className="space-y-2">
              <label className="text-sm text-spotify-subtext">Danceability ({features.danceability})</label>
              <input 
                type="range" min="0" max="1" step="0.01" 
                value={features.danceability} 
                onChange={(e) => setFeatures({...features, danceability: parseFloat(e.target.value)})}
                className="w-full accent-spotify-green"
              />
            </div>

            {/* Quick input for Energy */}
            <div className="space-y-2">
              <label className="text-sm text-spotify-subtext">Energy ({features.energy})</label>
              <input 
                type="range" min="0" max="1" step="0.01" 
                value={features.energy} 
                onChange={(e) => setFeatures({...features, energy: parseFloat(e.target.value)})}
                className="w-full accent-spotify-green"
              />
            </div>

            {/* Quick input for Tempo */}
            <div className="space-y-2">
              <label className="text-sm text-spotify-subtext">Tempo (BPM)</label>
              <input 
                type="number" 
                value={features.tempo} 
                onChange={(e) => setFeatures({...features, tempo: parseFloat(e.target.value)})}
                className="w-full bg-spotify-hover border-spotify-hover rounded-md p-2 text-white"
              />
            </div>

            <Button 
              onClick={handlePredict} 
              disabled={isLoading}
              className="w-full bg-spotify-green hover:bg-spotify-green/80 text-black font-bold"
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
              Predict Hit Probability
            </Button>
          </CardContent>
        </Card>

        {/* Prediction Result Card */}
        <Card className="bg-spotify-dark border-spotify-hover shadow-none">
          <CardHeader>
            <CardTitle className="text-white">AI Prediction</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[300px]">
            {prediction ? (
              <div className="text-center space-y-4">
                <div className={`text-6xl font-bold ${prediction.is_hit ? 'text-spotify-green' : 'text-red-500'}`}>
                  {(prediction.hit_probability * 100).toFixed(1)}%
                </div>
                <div className="text-2xl font-semibold text-white">
                  {prediction.is_hit ? "🔥 Predicted HIT" : "🧊 Predicted Non-Hit"}
                </div>
                <p className="text-spotify-subtext text-sm">XGBoost Model Confidence</p>
              </div>
            ) : (
              <div className="text-center text-spotify-subtext">
                <BrainCircuit size={48} className="mx-auto mb-4 opacity-50" />
                <p>Adjust features and click predict to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}