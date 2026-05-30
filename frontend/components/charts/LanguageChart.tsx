"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface LanguageChartProps {
  data: any[];
}

export default function LanguageChart({ data }: LanguageChartProps) {
  // FIX: Wait until the component is mounted in the browser to render the chart
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything on the server to prevent the -1 width/height error
  if (!isMounted) {
    return null; 
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis 
          dataKey="language" 
          stroke="#B3B3B3" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        <YAxis stroke="#B3B3B3" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip 
          cursor={{ fill: '#282828' }} 
          contentStyle={{ backgroundColor: '#181818', border: '1px solid #282828', borderRadius: '8px', color: '#fff' }} 
        />
        <Bar dataKey="track_count" radius={[4, 4, 0, 0]}>
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.avg_popularity > 63 ? "#1DB954" : "#535353"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}