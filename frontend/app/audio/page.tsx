import { fetchAudioProfiles } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radio } from "lucide-react";
import AudioRadarChart from "@/components/charts/AudioRadarChart";

export default async function AudioIntelligence() {
  const data = await fetchAudioProfiles();
  const { profiles } = data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audio Intelligence</h1>
        <p className="text-spotify-subtext mt-1">Comparing the audio DNA of India's top music markets</p>
      </div>

      <Card className="bg-spotify-dark border-spotify-hover shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Radio className="h-5 w-5 text-spotify-green" />
            Language Audio Profiles (Hindi vs Punjabi vs Tamil vs Telugu)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full">
            <AudioRadarChart profiles={profiles} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-spotify-dark border-spotify-hover shadow-none p-6">
          <h3 className="text-lg font-semibold text-spotify-green mb-2">📊 Data Insight</h3>
          <p className="text-spotify-subtext text-sm">
            Audio features across Indian languages are surprisingly clustered around the 0.50 mark. The primary differentiators between regional markets are <span className="text-white font-bold">Tempo</span> and <span className="text-white font-bold">Loudness</span>, rather than traditional metrics like Danceability or Energy.
          </p>
        </Card>

        <Card className="bg-spotify-dark border-spotify-hover shadow-none p-6">
          <h3 className="text-lg font-semibold text-spotify-green mb-2">🎯 Business Impact</h3>
          <p className="text-spotify-subtext text-sm">
            Because audio DNA is heavily clustered, algorithms relying purely on audio features for regional recommendations will struggle. Spotify India must leverage <span className="text-white font-bold">cultural and linguistic metadata</span> alongside audio features to power accurate regional discovery.
          </p>
        </Card>
      </div>
    </div>
  );
}