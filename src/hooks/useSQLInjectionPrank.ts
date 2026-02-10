"use client";

import { useState, useCallback } from "react";

/**
 * useSQLInjectionPrank - Easter egg for developers who try SQL injection
 * Detects common SQL injection patterns and shows a playful response
 */

const SQL_INJECTION_PATTERNS = [
  "DROP TABLE",
  "DROP DATABASE",
  "SELECT *",
  "DELETE FROM",
  "INSERT INTO",
  "UPDATE SET",
  "' OR '1'='1",
  "'; --",
  ";--",
  "1=1",
  "UNION SELECT",
  "/**/",
  "xp_cmdshell",
  "<script>",
  "javascript:",
];

interface UseSQLInjectionPrankReturn {
  checkForInjection: (value: string) => boolean;
  showPrankToast: boolean;
  prankMessage: string;
  dismissPrank: () => void;
}

export function useSQLInjectionPrank(): UseSQLInjectionPrankReturn {
  const [showPrankToast, setShowPrankToast] = useState(false);
  const [prankMessage, setPrankMessage] = useState("");

  const prankMessages = [
    "Nice try, Bobby Tables. My inputs are sanitized. 🛡️",
    "SQL injection? In 2026? My prepared statements are disappointed. 😤",
    "DROP TABLE? More like DROP that resume. Just kidding, I respect the hustle. 💪",
    "Ah, a person of culture! But this isn't a 90s web app. Inputs = sanitized. ✨",
    "SELECT * FROM job_offers WHERE candidate = 'you' -- Nice try! 😏",
  ];

  const checkForInjection = useCallback((value: string): boolean => {
    const upperValue = value.toUpperCase();
    
    const isInjection = SQL_INJECTION_PATTERNS.some(pattern => 
      upperValue.includes(pattern.toUpperCase())
    );

    if (isInjection) {
      const randomMessage = prankMessages[Math.floor(Math.random() * prankMessages.length)];
      setPrankMessage(randomMessage);
      setShowPrankToast(true);
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => setShowPrankToast(false), 5000);
      
      // Log to console for extra effect
      console.log("%c🛡️ SQL Injection Attempt Detected!", "color: #ef4444; font-size: 14px; font-weight: bold;");
      console.log("%cDon't worry, I parametrize my queries. But I appreciate the security test! 😉", "color: #94a3b8;");
      
      return true;
    }

    return false;
  }, []);

  const dismissPrank = useCallback(() => {
    setShowPrankToast(false);
  }, []);

  return {
    checkForInjection,
    showPrankToast,
    prankMessage,
    dismissPrank,
  };
}

export default useSQLInjectionPrank;
