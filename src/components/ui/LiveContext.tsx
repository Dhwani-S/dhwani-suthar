"use client";

import { useState, useEffect } from "react";

/**
 * LiveContext - Time-aware location widget
 * Shows different status based on India time
 */

function getTimeAwareStatus(hour: number): { text: string; emoji: string } {
  // 9 AM - 6 PM: Building Data Pipelines
  if (hour >= 9 && hour < 18) {
    return { text: "Building Data Pipelines", emoji: "🏗️" };
  }
  // 6 PM - 2 AM: Fueled by Masala Chai
  if (hour >= 18 || hour < 2) {
    return { text: "Fueled by Masala Chai", emoji: "☕" };
  }
  // 2 AM - 9 AM: Dreaming in Python
  return { text: "Dreaming in Python", emoji: "🐍" };
}

export function LiveContext() {
  const [time, setTime] = useState<string>("");
  const [status, setStatus] = useState<{ text: string; emoji: string }>({ text: "", emoji: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      
      // Get India time
      const indiaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const hour = indiaTime.getHours();
      
      // Update time display
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      };
      setTime(now.toLocaleTimeString("en-IN", options) + " IST");
      
      // Update status based on time
      setStatus(getTimeAwareStatus(hour));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-6 right-6 z-40 hidden lg:flex flex-col items-end gap-1.5">
      {/* Location */}
      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
        <span>🇮🇳</span>
        <span>Bangalore, India</span>
      </div>
      
      {/* Time */}
      <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
        {time}
      </div>
      
      {/* Time-Aware Status */}
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-blue-600/80">
        <span>{status.emoji}</span>
        <span>{status.text}</span>
      </div>
      
      {/* Open to Work */}
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-600/80 mt-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span>Open to Work</span>
      </div>
    </div>
  );
}
