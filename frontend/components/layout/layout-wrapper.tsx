"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-[#121212] text-white">
        <main className="w-full">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#121212]">
      {/* Sidebar is fixed on the left */}
      <Sidebar />
      
      {/* Main content needs a left margin (ml-64) to avoid sliding under the sidebar */}
      <main className="flex-1 ml-64 overflow-y-auto p-8 bg-spotify-black">
        {children}
      </main>
    </div>
  );
}
