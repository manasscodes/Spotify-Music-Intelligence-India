"use client"; // This needs to be a client component to track the active page

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, Music, TrendingUp, BrainCircuit, Radio, Mic2, ShieldCheck } from "lucide-react";

const navItems = [
  { name: "Executive Overview", icon: BarChart2, path: "/" },
  { name: "Language Analytics", icon: Music, path: "/language" },
  { name: "Popularity Trends", icon: TrendingUp, path: "/trends" },
  { name: "Audio Intelligence", icon: Radio, path: "/audio" },
  { name: "Hit Prediction Lab", icon: BrainCircuit, path: "/predict" },
  { name: "Future Forecasting", icon: TrendingUp, path: "/forecast" },
  { name: "Artist Intelligence", icon: Mic2, path: "/artists" },
  { name: "Data Quality", icon: ShieldCheck, path: "/quality" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-spotify-dark border-r border-spotify-hover p-6 flex flex-col">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-spotify-green">Spotify Intel</h1>
        <p className="text-xs text-spotify-subtext mt-1">India Analytics Platform</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-spotify-green text-black"
                  : "text-spotify-subtext hover:text-white hover:bg-spotify-hover"
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-4 border-t border-spotify-hover">
        <p className="text-xs text-spotify-subtext">v1.0.0 • Staff Engineer Build</p>
      </div>
    </aside>
  );
}