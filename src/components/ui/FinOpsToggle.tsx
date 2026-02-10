"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

/**
 * FinOpsToggle - Gamified "Optimize Site Costs" toggle
 * Switches to dark mode for "cost optimization" effect
 */

const optimizeMessages = [
  "Dark mode activated. Saving pixels, saving money. This is the way. 💸",
  "RGB costs extra. Dark theme saves $47/month in electron bills. 📉",
  "Cloud bill slashed. My Gujarati ancestors are smiling. 🙏",
  "Less light = less power = less cost. FinOps 101. ⚡",
];

const restoreMessages = [
  "Fine, have your light mode back. But know that somewhere, a pixel cried. 💔",
  "Light restored. My inner FinOps engineer is judging you. 👀",
  "Brightness restored. Your cloud bill just went up 0.0001%. Worth it? 🤔",
];

export function FinOpsToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOptimized, setIsOptimized] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [previousTheme, setPreviousTheme] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOptimize = () => {
    // Save current theme before switching
    setPreviousTheme(resolvedTheme || 'light');
    setTheme('dark');
    setIsOptimized(true);
    const randomMessage = optimizeMessages[Math.floor(Math.random() * optimizeMessages.length)];
    setToastMessage(randomMessage);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleRestore = () => {
    // Restore previous theme - always go back to light
    console.log('Restoring theme from:', previousTheme, 'to light');
    setTheme('light');
    setIsOptimized(false);
    const randomMessage = restoreMessages[Math.floor(Math.random() * restoreMessages.length)];
    setToastMessage(randomMessage);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <>
      {/* Main Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '24px',
          zIndex: 9999,
          pointerEvents: 'auto',
        }}
      >
        {!isOptimized ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleOptimize();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: '9999px',
              backgroundColor: 'white',
              border: '1px solid #e4e4e7',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              pointerEvents: 'auto',
            }}
          >
            <span style={{ fontSize: '14px' }}>⚡</span>
            
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '8px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a1a1aa', margin: 0 }}>
                Optimize
              </p>
              <p style={{ fontSize: '11px', fontWeight: '600', color: '#3f3f46', margin: 0 }}>
                Site Costs
              </p>
            </div>

            <div style={{ width: '32px', height: '18px', borderRadius: '9999px', padding: '3px', backgroundColor: '#e4e4e7' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#a1a1aa' }} />
            </div>
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRestore();
            }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '12px',
              background: 'linear-gradient(to right, #7c3aed, #db2777)',
              color: 'white',
              fontWeight: '600',
              fontSize: '12px',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 6px 16px rgba(124, 58, 237, 0.3)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              pointerEvents: 'auto',
            }}
          >
            {/* Pulsing dot */}
            <motion.span
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#ec4899',
              }}
            />
            
            <span style={{ fontSize: '16px' }}>☀️</span>
            
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8, margin: 0 }}>
                Switch to
              </p>
              <p style={{ fontSize: '12px', fontWeight: 'bold', margin: 0 }}>
                Light Mode 🌤️
              </p>
            </div>
          </button>
        )}
      </div>

      {/* Status Badge */}
      {isOptimized && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'fixed',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '9999px',
            backgroundColor: '#10b981',
            color: 'white',
            fontSize: '12px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
          }}
        >
          <span>🌙</span>
          <span>FinOps Mode</span>
          <span style={{ color: '#a7f3d0' }}>• Dark Theme Active</span>
        </motion.div>
      )}

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'fixed',
              bottom: '112px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              maxWidth: '400px',
            }}
          >
            <div 
              style={{
                padding: '16px 24px',
                borderRadius: '16px',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                backgroundColor: isOptimized ? '#18181b' : undefined,
                background: isOptimized ? '#18181b' : 'linear-gradient(to right, #7c3aed, #db2777)',
                color: 'white',
                border: isOptimized ? '1px solid rgba(16, 185, 129, 0.3)' : undefined,
              }}
            >
              <span style={{ fontSize: '24px', flexShrink: 0 }}>{isOptimized ? '⚡' : '🎨'}</span>
              <p style={{ fontWeight: '500', lineHeight: 1.6, margin: 0 }}>{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

export default FinOpsToggle;
