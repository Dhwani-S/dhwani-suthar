"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterTextProps {
  words: string[];
  className?: string;
}

export function TypewriterText({ words, className = "" }: TypewriterTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    const currentWord = words[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, words]);

  return (
    <span className={className}>
      <span className="relative">
        <AnimatePresence mode="wait">
          <motion.span
            key={displayText}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-r from-blue-700 via-blue-600 to-zinc-700 text-transparent bg-clip-text"
          >
            {displayText}
          </motion.span>
        </AnimatePresence>
        <span 
          className={`inline-block w-[3px] h-[1em] bg-blue-600 ml-1 align-middle transition-opacity duration-100 ${
            cursorVisible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </span>
    </span>
  );
}
