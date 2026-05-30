import { fetchAnalytics } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Users, Globe, TrendingUp, Zap } from "lucide-react";
import LanguageChart from "@/components/charts/LanguageChart";

export default async function ExecutiveOverview() {
  // Fetch data on the SERVER
  const data = await fetchAnalytics();
  const { kpis, language_distribution } = data;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Executive Overview</h1>
        <p className="text-spotify-subtext mt-1">Real-time pulse of the Indian music market</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-spotify-dark border-spotify-hover shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-spotify-subtext">Total Songs</CardTitle>
            <Music className="h-4 w-4 text-spotify-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.total_songs.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-spotify-dark border-spotify-hover shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-spotify-subtext">Unique Artists</CardTitle>
            <Users className="h-4 w-4 text-spotify-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.total_artists.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-spotify-dark border-spotify-hover shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-spotify-subtext">Languages</CardTitle>
            <Globe className="h-4 w-4 text-spotify-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.total_languages}</div>
          </CardContent>
        </Card>

        <Card className="bg-spotify-dark border-spotify-hover shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-spotify-subtext">Avg Popularity</CardTitle>
            <TrendingUp className="h-4 w-4 text-spotify-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.avg_popularity}</div>
          </CardContent>
        </Card>

        <Card className="bg-spotify-dark border-spotify-hover shadow-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-spotify-subtext">Hit Rate</CardTitle>
            <Zap className="h-4 w-4 text-spotify-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.hit_rate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Language Distribution Bar Chart */}
      <Card className="bg-spotify-dark border-spotify-hover shadow-none mt-6">
        <CardHeader>
          <CardTitle className="text-white">Language Catalog Distribution</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[400px] w-full">
            {/* Pass the fetched data to our Client Component */}
            <LanguageChart data={language_distribution} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}