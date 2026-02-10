"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Cost Optimization Graph - Animated visualization showing
 * the journey from Cloud Chaos to Financial Clarity
 */

// SVG Path data for the cost line
const chaosPath = "M 0 60 Q 30 20, 60 70 Q 90 30, 120 80 Q 150 10, 180 65 Q 210 25, 240 75 Q 270 15, 300 55";
const optimizedPath = "M 0 60 Q 30 55, 60 50 Q 90 48, 120 45 Q 150 42, 180 40 Q 210 38, 240 35 Q 270 33, 300 30";

// Floating nodes representing servers/resources
const serverNodes = [
  { id: 1, x: 15, y: 25, delay: 0 },
  { id: 2, x: 75, y: 65, delay: 0.2 },
  { id: 3, x: 45, y: 45, delay: 0.4 },
  { id: 4, x: 85, y: 30, delay: 0.6 },
  { id: 5, x: 25, y: 70, delay: 0.8 },
  { id: 6, x: 65, y: 20, delay: 1.0 },
];

interface ServerNodeProps {
  node: typeof serverNodes[0];
  isOptimized: boolean;
}

function ServerNode({ node, isOptimized }: ServerNodeProps) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: 1,
      }}
      transition={{ 
        delay: node.delay,
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3,
      }}
    >
      <motion.div
        className={cn(
          "w-2.5 h-2.5 rounded-full",
          "shadow-lg"
        )}
        animate={{
          backgroundColor: isOptimized ? "#10b981" : "#ef4444",
          boxShadow: isOptimized 
            ? "0 0 12px 2px rgba(16, 185, 129, 0.5)" 
            : "0 0 12px 2px rgba(239, 68, 68, 0.5)",
        }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
}

function TerminalOverlay({ isVisible }: { isVisible: boolean }) {
  const [displayText, setDisplayText] = useState("");
  const fullText = "> running cost_optimizer.py...";
  
  useEffect(() => {
    if (isVisible) {
      setDisplayText("");
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <motion.div
      className={cn(
        "absolute bottom-4 left-4 right-4",
        "bg-gray-900/95 backdrop-blur-sm rounded-lg",
        "border border-gray-700 p-3",
        "font-mono text-xs"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="text-gray-500 text-[10px] ml-2">finops-engine</span>
      </div>
      <div className="text-emerald-400">
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-emerald-400 ml-0.5"
        />
      </div>
    </motion.div>
  );
}

export function CostOptimizationGraph() {
  const [phase, setPhase] = useState<"chaos" | "fixing" | "optimized">("chaos");
  const pathControls = useAnimationControls();
  const [isMounted, setIsMounted] = useState(false);

  // Mark component as mounted
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Run animation loop only after mount
  useEffect(() => {
    if (!isMounted) return;
    
    let isActive = true;
    
    const runAnimation = async () => {
      while (isActive) {
        // Phase 1: Chaos (3 seconds)
        if (!isActive) break;
        setPhase("chaos");
        try {
          await pathControls.start({
            d: chaosPath,
            stroke: "#ef4444",
            transition: { duration: 0.5 }
          });
        } catch { break; }
        await new Promise(r => setTimeout(r, 3000));

        // Phase 2: Fixing (2 seconds)
        if (!isActive) break;
        setPhase("fixing");
        await new Promise(r => setTimeout(r, 2000));

        // Phase 3: Optimized (3 seconds)
        if (!isActive) break;
        setPhase("optimized");
        try {
          await pathControls.start({
            d: optimizedPath,
            stroke: "#10b981",
            transition: { duration: 1.5, ease: "easeOut" }
          });
        } catch { break; }
        await new Promise(r => setTimeout(r, 3000));
      }
    };

    runAnimation();
    
    return () => {
      isActive = false;
    };
  }, [isMounted, pathControls]);

  const isOptimized = phase === "optimized";
  const showTerminal = phase === "fixing";

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      {/* Glassmorphism Card */}
      <div className={cn(
        "relative w-full max-w-md mx-auto",
        "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl",
        "border border-gray-200/50 dark:border-gray-700/50",
        "rounded-2xl shadow-2xl overflow-hidden",
        "p-6"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Cloud Cost Monitor
            </h3>
            <p className="text-xs text-gray-500">Real-time optimization</p>
          </div>
          <motion.div
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium",
              isOptimized 
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            )}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isOptimized ? "✓ Optimized" : "⚠ Analyzing"}
          </motion.div>
        </div>

        {/* Chart Area */}
        <div className="relative h-32 mb-4">
          {/* Server Nodes */}
          {serverNodes.map(node => (
            <ServerNode key={node.id} node={node} isOptimized={isOptimized} />
          ))}
          
          {/* The Line Chart */}
          <svg 
            viewBox="0 0 300 100" 
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="30" height="20" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 20" fill="none" stroke="rgba(156,163,175,0.2)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Animated cost line */}
            <motion.path
              d={chaosPath}
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              stroke="#ef4444"
              animate={pathControls}
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
              }}
            />
          </svg>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50">
            <motion.p 
              className={cn(
                "text-lg font-bold",
                isOptimized ? "text-emerald-600" : "text-red-500"
              )}
              animate={{ scale: isOptimized ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5 }}
            >
              {isOptimized ? "$1.5M" : "$3.2M"}
            </motion.p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">
              {isOptimized ? "Saved" : "Spend"}
            </p>
          </div>
          <div className="text-center p-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50">
            <p className={cn(
              "text-lg font-bold",
              isOptimized ? "text-emerald-600" : "text-amber-500"
            )}>
              {isOptimized ? "99.9%" : "67%"}
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Allocated</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/50">
            <p className={cn(
              "text-lg font-bold",
              isOptimized ? "text-emerald-600" : "text-red-500"
            )}>
              {isOptimized ? "↓ 47%" : "↑ 23%"}
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Trend</p>
          </div>
        </div>

        {/* Terminal Overlay */}
        <TerminalOverlay isVisible={showTerminal} />
      </div>

      {/* Glow effect behind card */}
      <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 blur-3xl rounded-full opacity-50" />
    </motion.div>
  );
}

export default CostOptimizationGraph;
