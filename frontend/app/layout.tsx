import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Spotify India Intelligence Platform",
  description: "AI-Powered Music Trend Forecasting & Popularity Prediction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="flex h-screen">
          {/* Sidebar is fixed on the left */}
          <Sidebar />
          
          {/* Main content needs a left margin (ml-64) to avoid sliding under the sidebar */}
          <main className="flex-1 ml-64 overflow-y-auto p-8 bg-spotify-black">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}