"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from "recharts";

interface ForecastTrendChartProps {
  data: any[];
}

export default function ForecastTrendChart({ data }: ForecastTrendChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // 1. Pivot data: Array of years, with languages as keys
  const years = [...new Set(data.map((d: any) => d.year))].sort();
  const targetLanguages = ["Hindi", "Punjabi", "Tamil", "Telugu"];

  const chartData = years.map(year => {
    const point: any = { year };
    const yearData = data.filter((d: any) => d.year === year);
    yearData.forEach((d: any) => {
      if (targetLanguages.includes(d.language)) {
        point[d.language] = d.popularity;
      }
    });
    return point;
  });

  // Colors for lines
  const colors: Record<string, string> = {
    Hindi: "#1DB954",
    Punjabi: "#b3b3b3",
    Tamil: "#1ed760", // Lighter green
    Telugu: "#535353"
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#282828" />
        <XAxis 
          dataKey="year" 
          stroke="#B3B3B3" 
          fontSize={12} 
          tickLine={false} 
        />
        <YAxis 
          stroke="#B3B3B3" 
          fontSize={12} 
          tickLine={false} 
          domain={['auto', 'auto']} 
          tickFormatter={(val) => val.toFixed(0)}
        />
        <Tooltip 
          cursor={{ stroke: '#535353' }} 
          contentStyle={{ backgroundColor: '#181818', border: '1px solid #282828', borderRadius: '8px', color: '#fff' }} 
        />
        
        {/* Vertical line marking where the AI forecast begins */}
        <ReferenceLine x={2024} stroke="#FFFFFF" strokeDasharray="3 3" label={{ value: "AI Forecast →", position: "top", fill: "#B3B3B3", fontSize: 12 }} />

        {targetLanguages.map((lang) => (
          <Line 
            key={lang}
            type="monotone" 
            dataKey={lang} 
            stroke={colors[lang]} 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}