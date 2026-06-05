"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BrainCircuit, Radio, TrendingUp, Mic2, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: BrainCircuit,
      title: "Hit Prediction Engine",
      description: "Classify songs as Hits before launch using XGBoost.",
    },
    {
      icon: Radio,
      title: "Audio DNA Analysis",
      description: "Compare audio profiles across languages with Radar Charts.",
    },
    {
      icon: TrendingUp,
      title: "Future Forecasting",
      description: "3-year popularity projections per language.",
    },
    {
      icon: Mic2,
      title: "Artist Intelligence",
      description: "Track momentum and identify emerging regional artists.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#121212] text-white overflow-x-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#1DB954]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#1DB954]/5 blur-[120px] pointer-events-none" />

      {/* Floating Glassmorphism Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl h-16 bg-[#181818]/80 backdrop-blur-xl border border-[#282828] rounded-full px-6 flex items-center justify-between shadow-2xl"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center shadow-[0_0_10px_rgba(29,185,84,0.4)]">
            <Radio className="w-4 h-4 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#1DB954]">
            Spotify Intel
          </span>
        </div>
        
        <Link href="/overview" className="group">
          <button className="px-5 py-2 rounded-full bg-[#1f1f1f] border border-[#4d4d4d] text-white hover:text-[#1DB954] hover:border-[#1DB954] text-xs font-bold tracking-[1.4px] uppercase transition-all duration-300 cursor-pointer flex items-center gap-2">
            Launch Dashboard
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative pt-36 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center text-center justify-center min-h-[85vh]"
      >
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#282828] text-xs font-semibold text-[#1DB954] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
            Next-Gen Music Analytics for India
          </div>
          
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            AI-Powered Music <br />
            <span className="bg-gradient-to-r from-white via-white to-[#1DB954] bg-clip-text text-transparent">
              Intelligence for India
            </span>
          </h1>

          <p className="text-base md:text-xl text-[#B3B3B3] max-w-2xl mx-auto leading-relaxed">
            Forecast regional trends. Predict hit songs. Understand the audio DNA of 16 Indian languages.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/overview">
              <button className="px-8 py-4 rounded-full bg-[#1DB954] text-black font-extrabold text-sm tracking-[1.5px] uppercase transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_0_15px_rgba(29,185,84,0.5)] active:scale-95">
                Launch Platform
              </button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Features Grid Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-24 px-6 max-w-6xl mx-auto border-t border-[#282828]/50"
      >
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Built for Product & Growth Teams
          </h2>
          <p className="text-sm md:text-base text-[#B3B3B3] max-w-lg mx-auto">
            Deep analytical tools built to decode listening patterns, popularity metrics, and regional dynamics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                whileHover={{ scale: 1.03, borderColor: "#1DB954" }}
                className="group relative flex flex-col justify-between p-6 bg-[#181818]/60 backdrop-blur-xl border border-[#282828] rounded-2xl hover:bg-[#1f1f1f]/80 transition-all duration-300 cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-[#282828] flex items-center justify-center text-[#1DB954] group-hover:bg-[#1DB954]/10 transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-[#B3B3B3] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 flex items-center gap-1 text-xs font-bold text-[#1DB954] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore module
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Footer Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-12 border-t border-[#282828]/50 text-center px-6"
      >
        <p className="text-xs text-[#B3B3B3]/60 tracking-wider">
          Built with Next.js, FastAPI, XGBoost & SHAP. Spotify India Intelligence Platform © 2025
        </p>
      </motion.div>
    </div>
  );
}
