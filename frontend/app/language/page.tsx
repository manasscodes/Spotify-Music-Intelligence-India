import { fetchAnalytics } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";
import LanguageChart from "@/components/charts/LanguageChart";

export default async function LanguageAnalytics() {
  const data = await fetchAnalytics();
  const { language_distribution } = data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Language Analytics</h1>
        <p className="text-spotify-subtext mt-1">Catalog size and performance metrics across Indian languages</p>
      </div>

      <Card className="bg-spotify-dark border-spotify-hover shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Music className="h-5 w-5 text-spotify-green" />
            Track Count by Language
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full">
            <LanguageChart data={language_distribution} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}