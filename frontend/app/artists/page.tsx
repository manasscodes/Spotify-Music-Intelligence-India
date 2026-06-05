import { fetchArtistIntelligence } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic2, Volume2, Star } from "lucide-react";

export default async function ArtistIntelligence() {
  const data = await fetchArtistIntelligence();
  const { top_by_volume, top_by_popularity } = data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Artist Intelligence</h1>
        <p className="text-spotify-subtext mt-1">Identifying volume dominators and consistency champions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume Leaderboard */}
        <Card className="bg-spotify-dark border-spotify-hover shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Volume2 className="h-5 w-5 text-spotify-green" />
              Volume Titans (Most Tracks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {top_by_volume.map((artist: any, index: number) => (
                <div key={artist.artist} className="flex items-center justify-between border-b border-spotify-hover pb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-spotify-subtext font-bold w-6">{index + 1}</span>
                    <span className="text-white font-medium">{artist.artist}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-spotify-green font-bold">{artist.track_count}</span>
                    <span className="text-spotify-subtext text-sm ml-2">tracks</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popularity Leaderboard */}
        <Card className="bg-spotify-dark border-spotify-hover shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Star className="h-5 w-5 text-spotify-green" />
              Consistency Champions (Avg Popularity)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {top_by_popularity.map((artist: any, index: number) => (
                <div key={artist.artist} className="flex items-center justify-between border-b border-spotify-hover pb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-spotify-subtext font-bold w-6">{index + 1}</span>
                    <span className="text-white font-medium">{artist.artist}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-spotify-green font-bold">{artist.avg_popularity}</span>
                    <span className="text-spotify-subtext text-sm ml-2">avg pop</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}