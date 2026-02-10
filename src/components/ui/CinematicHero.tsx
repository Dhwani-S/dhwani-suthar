"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Cinematic Hero - "Input/Output" 3D Scene
 * Massive layered composition: Code Terminal → Glass Value Card
 */

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring config for smooth movement
  const springConfig = { stiffness: 100, damping: 30 };

  // Back layer moves SLOW
  const backX = useSpring(useTransform(mouseX, [-1, 1], [15, -15]), springConfig);
  const backY = useSpring(useTransform(mouseY, [-1, 1], [10, -10]), springConfig);

  // Front layer moves FAST
  const frontX = useSpring(useTransform(mouseX, [-1, 1], [30, -30]), springConfig);
  const frontY = useSpring(useTransform(mouseY, [-1, 1], [20, -20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
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
      className="relative w-full min-h-[550px] lg:min-h-[600px]"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-emerald-500/10 rounded-full blur-[100px] -z-10" />

      {/* === BACK LAYER: The Engine (Terminal) === */}
      <motion.div
        style={{ x: backX, y: backY }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-8 right-0 lg:right-8"
      >
        <div
          className="w-[420px] lg:w-[480px] bg-slate-900 rounded-xl shadow-2xl shadow-slate-900/50 overflow-hidden border border-slate-700/50"
          style={{
            transform: "rotateY(-12deg) rotateX(5deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Window Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs text-slate-400 ml-3 font-mono">
              data_pipeline.py - ~/projects/finops
            </span>
          </div>

          {/* Code Content */}
          <div className="p-5 font-mono text-[13px] leading-relaxed overflow-hidden">
            {/* Imports */}
            <div>
              <span className="text-purple-400">from</span>
              <span className="text-slate-300"> pyspark.sql </span>
              <span className="text-purple-400">import</span>
              <span className="text-slate-300"> SparkSession</span>
            </div>
            <div>
              <span className="text-purple-400">from</span>
              <span className="text-slate-300"> airflow.decorators </span>
              <span className="text-purple-400">import</span>
              <span className="text-slate-300"> task</span>
            </div>

            <div className="mt-4">
              <span className="text-amber-400">@task</span>
            </div>
            <div>
              <span className="text-purple-400">def</span>
              <span className="text-blue-400"> process_billing_data</span>
              <span className="text-slate-300">(source):</span>
            </div>

            <div className="ml-4 mt-1">
              <span className="text-slate-500"># Initialize Spark session</span>
            </div>
            <div className="ml-4">
              <span className="text-slate-300">spark = </span>
              <span className="text-blue-400">SparkSession</span>
              <span className="text-slate-300">.builder \</span>
            </div>
            <div className="ml-8">
              <span className="text-slate-300">.appName(</span>
              <span className="text-emerald-400">&quot;FinOps-Pipeline&quot;</span>
              <span className="text-slate-300">) \</span>
            </div>
            <div className="ml-8">
              <span className="text-slate-300">.getOrCreate()</span>
            </div>

            <div className="ml-4 mt-3">
              <span className="text-slate-500"># Load TB-scale billing data</span>
            </div>
            <div className="ml-4">
              <span className="text-slate-300">df = spark.read.parquet(source)</span>
            </div>

            <div className="ml-4 mt-2">
              <span className="text-slate-500"># Optimize & allocate costs</span>
            </div>
            <div className="ml-4">
              <span className="text-slate-300">optimized = df.filter(</span>
            </div>
            <div className="ml-8">
              <span className="text-slate-300">df.spend </span>
              <span className="text-purple-400">&gt;</span>
              <span className="text-amber-400"> 1000</span>
              <span className="text-slate-300">)</span>
            </div>

            <div className="ml-4 mt-2">
              <span className="text-purple-400">return</span>
              <span className="text-slate-300"> {`{`}</span>
            </div>
            <div className="ml-8">
              <span className="text-emerald-400">&quot;savings&quot;</span>
              <span className="text-slate-300">: </span>
              <span className="text-emerald-400">&quot;$1.5M&quot;</span>
              <span className="text-slate-300">,</span>
            </div>
            <div className="ml-8">
              <span className="text-emerald-400">&quot;accuracy&quot;</span>
              <span className="text-slate-300">: </span>
              <span className="text-amber-400">99.9</span>
            </div>
            <div className="ml-4">
              <span className="text-slate-300">{`}`}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* === CONNECTOR LINE (Blue to Green gradient) === */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute top-[200px] right-[120px] w-[200px] h-[250px] -z-5 pointer-events-none"
        viewBox="0 0 200 250"
      >
        <defs>
          <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.path
          d="M 180 30 Q 100 80 80 150 T 40 220"
          fill="none"
          stroke="url(#connectorGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
        />
        {/* Animated dot along path */}
        <motion.circle
          r="6"
          fill="#10b981"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            offsetDistance: ["0%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
          style={{ offsetPath: "path('M 180 30 Q 100 80 80 150 T 40 220')" }}
        />
      </motion.svg>

      {/* === FRONT LAYER: The Value (Glass Card) === */}
      <motion.div
        style={{ x: frontX, y: frontY }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-12 right-12 lg:right-24"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
          style={{
            transform: "rotateY(-5deg) rotateX(2deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glass Card */}
          <div className="w-[300px] lg:w-[340px] backdrop-blur-xl bg-white/80 rounded-2xl shadow-2xl shadow-emerald-500/10 border border-white/40 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-200/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-zinc-800">Optimization Report</h3>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="p-6 space-y-5">
              {/* Cloud Spend */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-zinc-500">Cloud Spend</span>
                  <span className="text-sm font-bold text-emerald-600">-35% ▼</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "65%" }}
                    transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Query Latency */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-zinc-500">Query Latency</span>
                  <span className="text-sm font-bold text-zinc-800">120ms</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "12%" }}
                    transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Allocation Accuracy */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-zinc-500">Allocation Accuracy</span>
                  <span className="text-sm font-bold text-zinc-800">99.9%</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-400 to-purple-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "99.9%" }}
                    transition={{ delay: 1.6, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-zinc-200/50 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-zinc-400">Annual Savings</span>
                    <p className="text-2xl font-bold text-emerald-600">$1.5M</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-400">Status</span>
                    <p className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      System Healthy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reflection/Shadow */}
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-b from-zinc-200/20 to-transparent rounded-2xl blur-xl" />
        </motion.div>
      </motion.div>

      {/* Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-2 right-8 text-xs text-zinc-400 font-mono"
      >
        Move cursor for parallax
      </motion.p>
    </div>
  );
}

export default CinematicHero;
