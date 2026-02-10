"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Isometric Glass Stack - 3D Data Pipeline Visualization
 * 3 floating glass layers: Ingestion → Transformation → Optimization
 */

export function IsometricStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-[400px] h-[450px] perspective-[1000px]"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-violet-500/15 rounded-full blur-[80px]" />

      {/* 3D Stack Container */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative w-full h-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(60deg) rotateZ(-45deg)",
          }}
        >
          {/* Layer 1: Ingestion (Bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute"
            style={{ transform: "translateZ(0px)" }}
          >
            <div className="relative w-52 h-52">
              {/* Glass Panel */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl">
                {/* Inner glow */}
                <div className="absolute inset-2 bg-gradient-to-br from-slate-50/50 to-transparent rounded-xl" />
                
                {/* Floating Data Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-blue-400/60"
                      style={{
                        left: `${15 + (i % 4) * 22}%`,
                        top: `${20 + Math.floor(i / 4) * 25}%`,
                      }}
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                  Ingestion
                </span>
              </div>
            </div>
          </motion.div>

          {/* Layer 2: Transformation (Middle) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute"
            style={{ transform: "translateZ(60px)" }}
          >
            <div className="relative w-52 h-52">
              {/* Glass Panel */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-md rounded-2xl border border-white/70 shadow-xl">
                {/* Inner glow */}
                <div className="absolute inset-2 bg-gradient-to-br from-white/60 to-transparent rounded-xl" />
                
                {/* Processing Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="relative"
                  >
                    <svg viewBox="0 0 60 60" className="w-20 h-20">
                      {/* Outer gear */}
                      <motion.circle
                        cx="30"
                        cy="30"
                        r="22"
                        fill="none"
                        stroke="url(#gearGradient)"
                        strokeWidth="2"
                        strokeDasharray="8 4"
                      />
                      {/* Inner circle */}
                      <circle cx="30" cy="30" r="10" fill="none" stroke="#6366f1" strokeWidth="2" />
                      {/* Center dot */}
                      <circle cx="30" cy="30" r="3" fill="#6366f1" />
                      {/* Gradient definition */}
                      <defs>
                        <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                </div>
              </div>
              
              {/* Label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 bg-white/80 px-3 py-1 rounded-full shadow-sm">
                  Transformation
                </span>
              </div>
            </div>
          </motion.div>

          {/* Layer 3: Optimization (Top) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute"
            style={{ transform: "translateZ(120px)" }}
          >
            <div className="relative w-52 h-52">
              {/* Glass Panel */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-2xl">
                {/* Inner glow */}
                <div className="absolute inset-2 bg-gradient-to-br from-white/70 to-transparent rounded-xl" />
                
                {/* Chart Line */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <svg viewBox="0 0 100 60" className="w-full h-full">
                    {/* Grid lines */}
                    <line x1="10" y1="50" x2="90" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="10" y1="35" x2="90" y2="35" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4,4" />
                    <line x1="10" y1="20" x2="90" y2="20" stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="4,4" />
                    
                    {/* Chart line */}
                    <motion.path
                      d="M 10 45 Q 25 40, 35 35 T 55 25 T 75 15 L 90 10"
                      fill="none"
                      stroke="url(#chartGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                    />
                    
                    {/* End dot */}
                    <motion.circle
                      cx="90"
                      cy="10"
                      r="4"
                      fill="#10b981"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.5, duration: 0.3 }}
                    />
                    
                    {/* Gradient */}
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Value badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.8, duration: 0.3 }}
                  className="absolute top-3 right-3"
                >
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    +$1.5M
                  </span>
                </motion.div>
              </div>
              
              {/* Label */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full shadow-sm">
                  Optimization
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-zinc-400 font-mono"
      >
        Move cursor to interact
      </motion.p>
    </div>
  );
}

export default IsometricStack;
