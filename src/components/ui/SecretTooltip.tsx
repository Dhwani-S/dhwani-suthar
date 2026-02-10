"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * SecretTooltip - Randomized "Personality Roulette" Easter Egg
 * Shows different themed tooltips after 3 seconds of hovering
 */

type SecretState = "artist" | "finops" | "strangerthings";

interface SecretContent {
  state: SecretState;
  text: string;
  subtext?: string;
  emoji: string;
  glowClass: string;
  bgClass: string;
  textClass: string;
  fontClass: string;
}

const secretContents: SecretContent[] = [
  // State A: The Artist (The "Flat Brush" Confession)
  {
    state: "artist",
    text: "I own 15 fan brushes. I have used exactly zero of them. Flat brush supremacy forever.",
    emoji: "🎨",
    glowClass: "shadow-[0_0_30px_rgba(251,191,36,0.5),0_0_60px_rgba(245,158,11,0.3)]",
    bgClass: "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400",
    textClass: "text-amber-900",
    fontClass: "font-medium italic",
  },
  // State B: The FinOps (The Ahmedabad Flex)
  {
    state: "finops",
    text: "I'm an Engineer from Ahmedabad (Gujarat). Optimizing costs isn't just my job, it's basically my heritage.",
    emoji: "💸",
    glowClass: "shadow-[0_0_30px_rgba(16,185,129,0.5),0_0_60px_rgba(5,150,105,0.3)]",
    bgClass: "bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-500",
    textClass: "text-emerald-900",
    fontClass: "font-medium",
  },
  // State C: Stranger Things - Coffee & Contemplation
  {
    state: "strangerthings",
    text: "Mornings are for coffee and contemplation. Mostly coffee. And keeping the production database out of the Upside Down.",
    subtext: "Hopper is my spirit animal",
    emoji: "🧇",
    glowClass: "shadow-[0_0_40px_rgba(220,38,38,0.6),0_0_80px_rgba(185,28,28,0.4)]",
    bgClass: "bg-gradient-to-br from-red-950 to-zinc-950 border-2 border-red-600",
    textClass: "text-red-100",
    fontClass: "font-serif",
  },
  // State C Alt: Stranger Things - Upside Down Debugging
  {
    state: "strangerthings",
    text: "Stuck in the Upside Down (Debugging). Send Eggo waffles and a working stack trace.",
    subtext: "Stranger Things Mode",
    emoji: "👾",
    glowClass: "shadow-[0_0_40px_rgba(220,38,38,0.6),0_0_80px_rgba(185,28,28,0.4)]",
    bgClass: "bg-gradient-to-br from-red-950 to-zinc-950 border-2 border-red-600",
    textClass: "text-red-100",
    fontClass: "font-serif",
  },
];

interface SecretTooltipProps {
  children: React.ReactNode;
  className?: string;
}

// Gentle notification "ding" sound using Web Audio API
let audioContext: AudioContext | null = null;

function playPopSound() {
  try {
    // Reuse or create AudioContext
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Resume if suspended (browser autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Create a gentle "ding" notification sound - two quick notes
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.08); // E5 - higher note
    
    // Soft volume with quick fade
    gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime + 0.08);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch (e) {
    // Audio not supported, fail silently
    console.log('Audio error:', e);
  }
}

export function SecretTooltip({ children, className }: SecretTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSecret, setCurrentSecret] = useState<SecretContent | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerSecret = useCallback(() => {
    // Random selection from all secrets
    const randomIndex = Math.floor(Math.random() * secretContents.length);
    setCurrentSecret(secretContents[randomIndex]);
    setIsVisible(true);
    playPopSound();
  }, []);

  const handleMouseEnter = () => {
    // Start 3-second timer
    timerRef.current = setTimeout(() => {
      triggerSecret();
    }, 3000);
  };

  const handleMouseLeave = () => {
    // Cancel timer and hide tooltip
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && currentSecret && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 20,
              mass: 0.8
            }}
            className="absolute -left-4 top-1/2 -translate-y-1/2 -translate-x-full z-50 pointer-events-none"
          >
            {/* The Secret Bubble */}
            <div 
              className={cn(
                "relative rounded-2xl px-5 py-4 max-w-[300px]",
                "transition-all duration-300",
                currentSecret.bgClass,
                currentSecret.glowClass
              )}
            >
              {/* Stranger Things flickering lights effect */}
              {currentSecret.state === "strangerthings" && (
                <>
                  {/* Flicker overlay */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-red-500/30"
                    animate={{ 
                      opacity: [0, 0.4, 0, 0.2, 0, 0.5, 0, 0.1, 0],
                    }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                  {/* Christmas lights dots */}
                  <div className="absolute -top-2 left-0 right-0 flex justify-around">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: ['#ef4444', '#fbbf24', '#22c55e', '#3b82f6', '#ef4444'][i],
                        }}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* Artist paint splatter effect */}
              {currentSecret.state === "artist" && (
                <>
                  <div className="absolute -top-1 -right-1 text-lg">✨</div>
                  <div className="absolute -bottom-1 -left-1 text-sm rotate-12">🖌️</div>
                </>
              )}
              
              {/* FinOps money effect */}
              {currentSecret.state === "finops" && (
                <motion.div 
                  className="absolute -top-2 -right-2 text-xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  📈
                </motion.div>
              )}
              
              {/* Content */}
              <div className="relative z-10 flex items-start gap-3">
                <span className="text-2xl flex-shrink-0 mt-0.5">{currentSecret.emoji}</span>
                <div>
                  <p className={cn(
                    "text-sm leading-relaxed",
                    currentSecret.textClass,
                    currentSecret.fontClass,
                    currentSecret.state === "strangerthings" && "uppercase tracking-wide text-[13px]"
                  )}>
                    {currentSecret.text}
                  </p>
                  
                  {/* Subtext for Stranger Things */}
                  {currentSecret.subtext && (
                    <p className={cn(
                      "mt-2 text-[10px] uppercase tracking-[0.15em]",
                      currentSecret.state === "strangerthings" 
                        ? "text-red-400 font-mono" 
                        : "text-zinc-500"
                    )}>
                      ({currentSecret.subtext})
                    </p>
                  )}
                </div>
              </div>
              
              {/* Bubble tail */}
              <div 
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2 translate-x-full",
                  "w-0 h-0",
                  "border-t-[12px] border-b-[12px] border-l-[16px]",
                  "border-t-transparent border-b-transparent",
                  currentSecret.state === "artist" && "border-l-amber-400",
                  currentSecret.state === "finops" && "border-l-emerald-500",
                  currentSecret.state === "strangerthings" && "border-l-red-600",
                )}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SecretTooltip;
