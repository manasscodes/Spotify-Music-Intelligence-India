import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/layout/layout-wrapper";

export const metadata: Metadata = {
  // Base SEO
  title: "Spotify India Intelligence Platform",
  description: "AI-Powered Music Trend Forecasting, Artist Growth Analytics, and Popularity Prediction System for the Indian Music Market.",
  icons: {
    icon: "/favicon.ico", // Points to public/favicon.ico
  },

  // Open Graph (WhatsApp, LinkedIn, Facebook)
  openGraph: {
    title: "Spotify India Intelligence Platform",
    description: "Forecast regional trends. Predict hit songs. Understand the audio DNA of 16 Indian languages.",
    url: "https://spotify-india-intelligence.vercel.app", // Update this after Vercel deployment!
    siteName: "Spotify India Intel",
    images: [
      {
        url: "/og-thumbnail.png", // Points to public/og-thumbnail.png
        width: 1200,
        height: 630,
        alt: "Spotify India Intelligence Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Spotify India Intelligence Platform",
    description: "AI-Powered Music Trend Forecasting & Popularity Prediction System.",
    images: ["/og-thumbnail.png"], // Points to public/og-thumbnail.png
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}