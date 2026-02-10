"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Stranger Things 404 Page - "The Upside Down"
 * An Easter egg delight for anyone who gets lost
 */

// Flickering text animation
const flickerVariants = {
  visible: {
    opacity: [1, 0.4, 1, 0.6, 1, 0.3, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
};

// Christmas lights colors
const lightColors = ["#ef4444", "#fbbf24", "#22c55e", "#3b82f6", "#a855f7", "#ef4444", "#fbbf24", "#22c55e"];

export default function NotFound() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Dramatic reveal sequence
    const timer1 = setTimeout(() => setShowMessage(true), 500);
    const timer2 = setTimeout(() => setIsFlipped(true), 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div 
      className={cn(
        "min-h-screen bg-zinc-950 relative overflow-hidden",
        "transition-transform duration-1000 ease-in-out",
        isFlipped && "transform rotate-180"
      )}
    >
      {/* Animated Background - Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Christmas Lights String */}
      <div className="absolute top-20 left-0 right-0 flex justify-center py-8">
        <div className="flex gap-8">
          {lightColors.map((color, i) => (
            <motion.div
              key={i}
              className="relative"
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              {/* Wire */}
              <div className="absolute -top-4 left-1/2 w-px h-4 bg-zinc-700" />
              {/* Bulb */}
              <div 
                className="w-4 h-6 rounded-full"
                style={{ 
                  backgroundColor: color,
                  boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content - Flipped to read correctly when page is upside down */}
      <div 
        className={cn(
          "relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-16",
          "transition-transform duration-1000",
          isFlipped && "transform rotate-180"
        )}
      >
        {/* The 404 Code */}
        <motion.div
          variants={flickerVariants}
          animate="visible"
          className="mb-8"
        >
          <h1 
            className="text-[150px] md:text-[200px] font-bold leading-none"
            style={{
              fontFamily: "serif",
              color: "#dc2626",
              textShadow: "0 0 50px rgba(220,38,38,0.8), 0 0 100px rgba(220,38,38,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            404
          </h1>
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showMessage ? 1 : 0, y: showMessage ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-xl"
        >
          {/* Headline */}
          <h2 
            className="text-2xl md:text-3xl font-serif uppercase tracking-[0.2em] text-red-100 mb-6"
            style={{
              textShadow: "0 0 30px rgba(220,38,38,0.5)",
            }}
          >
            Will? Can you hear me?
          </h2>

          {/* Body Text */}
          <p className="text-zinc-400 text-lg mb-4 leading-relaxed">
            You&apos;ve wandered into the <span className="text-red-400 font-semibold">Upside Down</span>.
          </p>
          <p className="text-zinc-500 mb-8">
            There is no data here, only Demogorgons. 
            <br />
            The page you&apos;re looking for has been consumed by the Mind Flayer.
          </p>

          {/* Stranger Things Quote */}
          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="mb-10 py-4 px-6 border border-red-900/50 rounded-lg bg-red-950/30"
          >
            <p className="text-red-300 italic font-serif">
              &quot;Mornings are for coffee and contemplation...
              <br />
              but this page doesn&apos;t exist.&quot;
            </p>
            <p className="text-red-500/70 text-sm mt-2">- Chief Hopper (probably)</p>
          </motion.div>

          {/* CTA Button */}
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "inline-flex items-center gap-3 px-8 py-4 rounded-full",
                "bg-red-600 hover:bg-red-500 text-white font-bold text-lg",
                "shadow-[0_0_30px_rgba(220,38,38,0.5)]",
                "hover:shadow-[0_0_50px_rgba(220,38,38,0.7)]",
                "transition-all duration-300",
                "uppercase tracking-wider"
              )}
            >
              <Home className="w-5 h-5" />
              Run Back Home
              <Zap className="w-5 h-5" />
            </motion.button>
          </Link>

          {/* Easter Egg Hint */}
          <p className="mt-8 text-zinc-600 text-xs font-mono">
            ERROR_CODE: DEMOGORGON_DETECTED | DIMENSION: UPSIDE_DOWN
          </p>
        </motion.div>

        {/* Floating Waffle Easter Egg */}
        <motion.div
          className="absolute bottom-10 right-10 text-4xl opacity-30"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          🧇
        </motion.div>

        {/* Alphabet Wall Reference */}
        <div className="absolute bottom-10 left-10 flex gap-2 opacity-20">
          {['R', 'U', 'N'].map((letter, i) => (
            <motion.span
              key={i}
              className="text-2xl font-bold text-red-500"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Vine/Tendril overlay effect */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-10">
          <defs>
            <pattern id="vines" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M0 50 Q 25 30, 50 50 T 100 50"
                stroke="#dc2626"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M50 0 Q 30 25, 50 50 T 50 100"
                stroke="#dc2626"
                strokeWidth="1"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vines)" />
        </svg>
      </div>
    </div>
  );
}
