"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * HonestTooltip - Shows a "thought bubble" after 3 seconds of hovering
 * Comic-book style speech bubble with spring animation
 */

interface HonestTooltipProps {
  children: React.ReactNode;
  messages: string[];
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function HonestTooltip({ 
  children, 
  messages, 
  position = "top",
  className 
}: HonestTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    // Pick a random message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
    
    // Start 3-second timer
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
  };

  const handleMouseLeave = () => {
    // Clear timer and hide tooltip
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

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  const tailClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white",
    left: "left-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white",
    right: "right-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white",
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: position === "top" ? 10 : position === "bottom" ? -10 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className={cn(
              "absolute z-50 pointer-events-none",
              positionClasses[position]
            )}
          >
            {/* Speech Bubble */}
            <div className="relative bg-white rounded-2xl px-4 py-3 shadow-xl border-2 border-zinc-200 max-w-[220px]">
              {/* Comic-style dots */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full" />
              <div className="absolute -top-2 left-3 w-1.5 h-1.5 bg-pink-400 rounded-full" />
              
              {/* Message */}
              <p className="text-sm text-zinc-700 font-medium leading-snug">
                {currentMessage}
              </p>
              
              {/* Tail */}
              <div className={cn("absolute w-0 h-0", tailClasses[position])} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HonestTooltip;
