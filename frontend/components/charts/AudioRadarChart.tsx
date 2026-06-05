"use client";

import { useState, useEffect } from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from "recharts";

interface AudioRadarChartProps {
  profiles: any[];
}

export default function AudioRadarChart({ profiles }: AudioRadarChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Select the "Big 4" languages to compare
  const selectedLangs = ["Hindi", "Punjabi", "Tamil", "Telugu"];
  const filteredProfiles = profiles.filter((p: any) => selectedLangs.includes(p.language));

  // Transform data for Recharts: Array of features, with language scores as keys
  const features = ['danceability', 'energy', 'loudness', 'speechiness', 'acousticness', 'liveness', 'valence', 'tempo'];
  
  const chartData = features.map(feature => {
    const dataPoint: any = { feature: feature.charAt(0).toUpperCase() + feature.slice(1) };
    filteredProfiles.forEach((profile: any) => {
      dataPoint[profile.language] = profile[feature];
    });
    return dataPoint;
  });

  // Colors for our languages
  const colors = ["#1DB954", "#b3b3b3", "#1DB954", "#535353"]; // Spotify Green, Grey, Light Green, Dark Grey

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid stroke="#282828" />
        <PolarAngleAxis dataKey="feature" tick={{ fill: '#B3B3B3', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 1]} tick={false} axisLine={false} />
        
        {filteredProfiles.map((lang: any, index: number) => (
          <Radar 
            key={lang.language}
            name={lang.language}
            dataKey={lang.language}
            stroke={colors[index]}
            fill={colors[index]}
            fillOpacity={0.15}
            strokeWidth={2}
          />
        ))}
        
        <Tooltip 
          contentStyle={{ backgroundColor: '#181818', border: '1px solid #282828', borderRadius: '8px', color: '#fff' }} 
        />
        <Legend wrapperStyle={{ color: '#B3B3B3' }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}