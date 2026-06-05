import { fetchQualityReport } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertTriangle, Database } from "lucide-react";

export default async function DataQuality() {
  const data = await fetchQualityReport();
  const { indian_dataset, global_dataset, strategic_notes } = data;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Data Quality Intelligence</h1>
        <p className="text-spotify-subtext mt-1">Automated health scores and structural bias detection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Indian Dataset Health */}
        <Card className="bg-spotify-dark border-spotify-hover shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Database className="h-5 w-5 text-spotify-green" />
              Indian Dataset Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4 bg-spotify-hover rounded-lg">
              <div className="text-5xl font-bold text-spotify-green">{indian_dataset.overall_health_score}</div>
              <div className="text-spotify-subtext text-sm mt-1">Overall Health Score</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div><div className="text-white font-bold">{indian_dataset.completeness_score}%</div><div className="text-spotify-subtext">Complete</div></div>
              <div><div className="text-white font-bold">{indian_dataset.uniqueness_score}%</div><div className="text-spotify-subtext">Unique</div></div>
              <div><div className="text-white font-bold">{indian_dataset.validity_score}%</div><div className="text-spotify-subtext">Valid</div></div>
            </div>
            <p className="text-spotify-subtext text-xs">{indian_dataset.row_count.toLocaleString()} rows &bull; {indian_dataset.column_count} columns</p>
          </CardContent>
        </Card>

        {/* Global Dataset Health */}
        <Card className="bg-spotify-dark border-spotify-hover shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Database className="h-5 w-5 text-spotify-green" />
              Global Dataset Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4 bg-spotify-hover rounded-lg">
              <div className="text-5xl font-bold text-spotify-green">{global_dataset.overall_health_score}</div>
              <div className="text-spotify-subtext text-sm mt-1">Overall Health Score</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div><div className="text-white font-bold">{global_dataset.completeness_score}%</div><div className="text-spotify-subtext">Complete</div></div>
              <div><div className="text-white font-bold">{global_dataset.uniqueness_score}%</div><div className="text-spotify-subtext">Unique</div></div>
              <div><div className="text-white font-bold">{global_dataset.validity_score}%</div><div className="text-spotify-subtext">Valid</div></div>
            </div>
            <p className="text-spotify-subtext text-xs">{global_dataset.row_count.toLocaleString()} rows &bull; {global_dataset.column_count} columns</p>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Notes */}
      <Card className="bg-spotify-dark border-spotify-hover shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            Strategic Biases & Limitations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {strategic_notes.map((note: string, index: number) => (
              <li key={index} className="flex items-start gap-3 text-spotify-subtext text-sm">
                <span className="text-yellow-500 mt-1">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}