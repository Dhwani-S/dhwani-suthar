"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

/**
 * InteractivePhoto - Profile photo with Easter egg
 * Click 5 times rapidly to trigger confetti explosion
 */

interface InteractivePhotoProps {
  src: string;
  alt: string;
  className?: string;
}

export function InteractivePhoto({ src, alt, className }: InteractivePhotoProps) {
  const [clickCount, setClickCount] = useState(0);
  const [isPartyMode, setIsPartyMode] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  const triggerConfetti = useCallback(() => {
    // Get the photo position for confetti origin
    if (photoRef.current) {
      const rect = photoRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      // Fire confetti from the photo
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
      });

      // Second burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          origin: { x, y: y - 0.1 },
          colors: ['#3b82f6', '#06b6d4', '#a855f7'],
        });
      }, 200);
    }
  }, []);

  const handleClick = () => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Check for easter egg trigger (5 clicks)
    if (newCount >= 5) {
      setIsPartyMode(true);
      triggerConfetti();
      
      // Log secret message
      console.log("🎉 Found the secret! Email me at dhwani.suthar@example.com for a coffee chat.");
      
      // Reset after animation
      setTimeout(() => {
        setClickCount(0);
      }, 3000);
    } else {
      // Reset click count if no click within 1 second
      timeoutRef.current = setTimeout(() => {
        setClickCount(0);
      }, 1000);
    }
  };

  return (
    <div 
      ref={photoRef}
      className={cn("relative cursor-pointer select-none w-full h-full", className)}
      onClick={handleClick}
    >
      {/* Photo */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover saturate-[0.9] contrast-[1.05]"
        priority
        draggable={false}
      />
      
      {/* Subtle Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/15 via-transparent to-transparent" />

      {/* Click indicator (subtle) */}
      {clickCount > 0 && clickCount < 5 && (
        <div className="absolute bottom-4 right-4 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                i < clickCount ? "bg-blue-500 scale-100" : "bg-white/30 scale-75"
              )}
            />
          ))}
        </div>
      )}

      {/* Party mode badge override */}
      {isPartyMode && (
        <div className="absolute -top-4 -right-4 z-30 bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-xl shadow-pink-500/30 px-5 py-2.5 rounded-full flex items-center gap-2 animate-bounce">
          <span className="text-lg">🎉</span>
          <span className="text-sm font-medium">Let&apos;s Party!</span>
        </div>
      )}
    </div>
  );
}

export default InteractivePhoto;
