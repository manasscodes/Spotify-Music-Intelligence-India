import { fetchAnalytics } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default async function PopularityTrends() {
  const data = await fetchAnalytics();
  const { kpis } = data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Popularity Trends</h1>
        <p className="text-spotify-subtext mt-1">Analyzing cross-regional music popularity metrics and average traction</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-spotify-dark border-spotify-hover shadow-none p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-spotify-green" />
              Popularity Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-spotify-hover">
              <span className="text-spotify-subtext">Average Popularity Score</span>
              <span className="text-white font-bold">{kpis.avg_popularity}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-spotify-hover">
              <span className="text-spotify-subtext">Estimated Hit Rate</span>
              <span className="text-white font-bold">{kpis.hit_rate}%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-spotify-subtext">Total Track Base</span>
              <span className="text-white font-bold">{kpis.total_songs.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-spotify-dark border-spotify-hover shadow-none p-6">
          <h3 className="text-lg font-semibold text-spotify-green mb-2">📈 Market Context</h3>
          <p className="text-spotify-subtext text-sm leading-relaxed">
            The overall popularity in the Indian market represents a highly skewed distribution. Hits are concentrated in a tiny fraction of releases. Successful releases typically leverage the high energy and danceability characteristics identified in the Audio Intelligence lab.
          </p>
        </Card>
      </div>
    </div>
  );
}
