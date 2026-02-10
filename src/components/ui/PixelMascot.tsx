"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Pixel Mascot - Interactive Easter Egg
 * A tiny pixel-art character that reacts to mouse proximity
 */

const speechBubbles = [
  "Hi there! 👋",
  "Deploying to prod...",
  "Mixing colors... 🎨",
  "Need a Data Architect?",
  "50TB processed today!",
  "Coffee break? ☕",
  "Optimizing queries...",
  "git push --force 😅",
];

// CSS Pixel Art Character (8-bit style girl at desk)
function PixelCharacter({ isTyping }: { isTyping: boolean }) {
  return (
    <div className="relative w-16 h-16">
      {/* Desk */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-3 bg-amber-700 rounded-sm" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-600" />
      
      {/* Laptop */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-5 bg-zinc-700 rounded-t-sm">
        <div className="absolute inset-0.5 bg-blue-400 rounded-t-sm flex items-center justify-center">
          <motion.div
            animate={isTyping ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="w-4 h-0.5 bg-white rounded-full"
          />
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-9 h-1.5 bg-zinc-600 rounded-sm" />
      
      {/* Character Body */}
      <motion.div
        animate={isTyping ? { y: [0, -1, 0] } : { y: 0 }}
        transition={{ duration: 0.3, repeat: Infinity }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
      >
        {/* Hair (back) */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-7 h-4 bg-zinc-800 rounded-t-full" />
        
        {/* Head */}
        <div className="relative w-6 h-6 bg-amber-200 rounded-full mx-auto">
          {/* Hair (front) */}
          <div className="absolute -top-0.5 left-0 right-0 h-3 bg-zinc-800 rounded-t-full" />
          <div className="absolute top-2 -left-0.5 w-1.5 h-3 bg-zinc-800 rounded-full" />
          <div className="absolute top-2 -right-0.5 w-1.5 h-3 bg-zinc-800 rounded-full" />
          
          {/* Glasses */}
          <div className="absolute top-2.5 left-0.5 w-2 h-1.5 border border-zinc-600 rounded-sm bg-blue-100/30" />
          <div className="absolute top-2.5 right-0.5 w-2 h-1.5 border border-zinc-600 rounded-sm bg-blue-100/30" />
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-1 h-px bg-zinc-600" />
          
          {/* Blush */}
          <div className="absolute top-3.5 left-0.5 w-1 h-0.5 bg-pink-300 rounded-full opacity-60" />
          <div className="absolute top-3.5 right-0.5 w-1 h-0.5 bg-pink-300 rounded-full opacity-60" />
          
          {/* Smile */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 border-b border-zinc-600 rounded-full" />
        </div>
        
        {/* Body/Shirt */}
        <div className="w-5 h-3 bg-blue-500 rounded-t-sm mx-auto -mt-0.5" />
        
        {/* Arms (typing) */}
        <motion.div
          animate={isTyping ? { rotate: [-5, 5, -5] } : { rotate: 0 }}
          transition={{ duration: 0.2, repeat: Infinity }}
          className="absolute bottom-0 -left-1 w-2 h-1 bg-amber-200 rounded-full origin-right"
        />
        <motion.div
          animate={isTyping ? { rotate: [5, -5, 5] } : { rotate: 0 }}
          transition={{ duration: 0.2, repeat: Infinity, delay: 0.1 }}
          className="absolute bottom-0 -right-1 w-2 h-1 bg-amber-200 rounded-full origin-left"
        />
      </motion.div>
    </div>
  );
}

export function PixelMascot() {
  const [isNearby, setIsNearby] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [mascotPosition, setMascotPosition] = useState({ x: 0, y: 0 });

  // Track mascot position
  useEffect(() => {
    const updatePosition = () => {
      const mascot = document.getElementById("pixel-mascot");
      if (mascot) {
        const rect = mascot.getBoundingClientRect();
        setMascotPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  // Track mouse proximity
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const distance = Math.sqrt(
        Math.pow(e.clientX - mascotPosition.x, 2) +
          Math.pow(e.clientY - mascotPosition.y, 2)
      );
      setIsNearby(distance < 120);
    },
    [mascotPosition]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Cycle messages when nearby
  useEffect(() => {
    if (isNearby) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % speechBubbles.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isNearby]);

  return (
    <div
      id="pixel-mascot"
      className="fixed bottom-4 right-4 z-50"
    >
      {/* Speech Bubble */}
      <AnimatePresence>
        {isNearby && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute -top-12 right-0 whitespace-nowrap"
          >
            <div className="relative bg-white px-3 py-1.5 rounded-lg shadow-lg border border-zinc-200 text-sm">
              <span className="text-zinc-700">{speechBubbles[currentMessage]}</span>
              {/* Bubble tail */}
              <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-white border-r border-b border-zinc-200 transform rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl" />
        
        {/* Platform */}
        <div className="relative bg-gradient-to-b from-zinc-100 to-zinc-200 rounded-xl p-2 shadow-lg border border-zinc-200/50">
          <PixelCharacter isTyping={!isNearby} />
        </div>
      </motion.div>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isNearby ? 0 : 0.5 }}
        className="text-[10px] text-zinc-400 text-center mt-1 font-mono"
      >
        hover me!
      </motion.p>
    </div>
  );
}

export default PixelMascot;
