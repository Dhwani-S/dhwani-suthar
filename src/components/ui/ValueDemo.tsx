"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ValueDemo - Interactive "Simulate My Impact" card
 * Gamifies the value proposition with animated counter
 */

export function ValueDemo() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isOptimized, setIsOptimized] = useState(false);
  const [displayValue, setDisplayValue] = useState(10000);
  const [showToast, setShowToast] = useState(false);

  const startValue = 10000;
  const endValue = 6500;
  const savings = ((startValue - endValue) / startValue * 100).toFixed(0);

  const handleOptimize = () => {
    if (isOptimizing || isOptimized) return;
    
    setIsOptimizing(true);
    
    // Animate the counter
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const decrement = (startValue - endValue) / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const newValue = Math.round(startValue - (decrement * currentStep));
      setDisplayValue(Math.max(newValue, endValue));
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayValue(endValue);
        setIsOptimizing(false);
        setIsOptimized(true);
        setShowToast(true);
        
        // Hide toast after 4 seconds
        setTimeout(() => setShowToast(false), 4000);
      }
    }, stepDuration);
  };

  const handleReset = () => {
    setDisplayValue(startValue);
    setIsOptimized(false);
    setShowToast(false);
  };

  return (
    <div className="relative">
      {/* Main Card */}
      <motion.div 
        className={cn(
          "bg-white rounded-2xl p-6 shadow-lg border",
          "transition-colors duration-500",
          isOptimized ? "border-emerald-200" : "border-gray-200"
        )}
        whileHover={{ y: -2 }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-bold text-gray-900">
            Simulate My Impact
          </span>
        </div>

        {/* Display */}
        <div className="text-center mb-6">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            Monthly Cloud Spend
          </p>
          <div className="relative">
            <motion.div 
              className={cn(
                "text-4xl font-bold tabular-nums",
                isOptimized ? "text-emerald-600" : "text-gray-900"
              )}
              key={displayValue}
            >
              ${displayValue.toLocaleString()}
              <span className="text-lg text-gray-400">/mo</span>
            </motion.div>
            
            {/* Savings indicator */}
            <AnimatePresence>
              {isOptimized && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-1 mt-2"
                >
                  <TrendingDown className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-bold text-emerald-600">
                    {savings}% Saved
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Button */}
        {!isOptimized ? (
          <motion.button
            onClick={handleOptimize}
            disabled={isOptimizing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full py-3 px-4 rounded-xl font-semibold text-sm",
              "transition-all duration-300",
              isOptimizing
                ? "bg-blue-100 text-blue-600 cursor-wait"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
            )}
          >
            {isOptimizing ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⚙️
                </motion.span>
                Optimizing...
              </span>
            ) : (
              "Optimize Spend"
            )}
          </motion.button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-sm">
              <Check className="w-4 h-4" />
              Optimized!
            </div>
            <button
              onClick={handleReset}
              className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Reset Demo
            </button>
          </div>
        )}
      </motion.div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -bottom-20 left-1/2 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <div>
                <p className="font-bold text-sm">{savings}% Saved</p>
                <p className="text-xs text-gray-400">That&apos;s the Dhwani Effect.</p>
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ValueDemo;
