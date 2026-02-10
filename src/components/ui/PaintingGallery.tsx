"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useMemo, useRef, useEffect } from "react";

interface Painting {
  id: number;
  src: string;
  tilt: number;
  type: "oil" | "digital";
}

/**
 * All paintings for the infinite stream with custom tilts and types
 */
const paintings: Painting[] = [
  { id: 1, src: "/paintings/mountain-landscape.jpg", tilt: -2, type: "oil" },
  { id: 2, src: "/paintings/oil13.png", tilt: 3, type: "oil" },
  { id: 3, src: "/paintings/10.png", tilt: -1, type: "digital" },
  { id: 4, src: "/paintings/beach-sunset.png", tilt: 2, type: "oil" },
  { id: 5, src: "/paintings/sunny-alley.png", tilt: -3, type: "oil" },
  { id: 6, src: "/paintings/winter-red-coat.png", tilt: 1, type: "digital" },
  { id: 7, src: "/paintings/portrait-study.png", tilt: -2, type: "digital" },
  { id: 8, src: "/paintings/joyful-portrait.png", tilt: 2, type: "digital" },
  { id: 9, src: "/paintings/13.png", tilt: -1, type: "digital" },
];

/**
 * Oil painting specific tooltips (palette knife, Bob Ross style)
 */
const oilPaintingTooltips = [
  "I can paint an entire canvas with just a flat brush.",
  "My palette knife skills are... questionable.",
  "This took 3 cups of chai and a lot of patience.",
  "Kevin Hill makes it look way too easy.",
  "The secret ingredient is always more titanium white.",
  "I've ruined more canvases than I'd like to admit.",
  "Sometimes happy accidents are the best part.",
  "Mixing the perfect skin tone took me years.",
  "Learned this technique from Kevin Hill tutorials!",
];

/**
 * Digital art specific tooltips
 */
const digitalArtTooltips = [
  "Ctrl+Z is my best friend.",
  "This started as a 'quick sketch'. It wasn't.",
  "Layer count: more than I'd like to admit.",
  "The brush I used? Probably the default round one.",
  "References are not cheating. I repeat: NOT cheating.",
  "Digital art = oil painting with infinite undo.",
  "I talk to my paintings. They don't judge.",
  "3 AM and 'one more layer' hits different.",
  "The lasso tool and I have a love-hate relationship.",
];

interface PolaroidProps {
  painting: Painting;
}

function Polaroid({ painting }: PolaroidProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Pick a random message based on painting type
    const tooltips = painting.type === "oil" ? oilPaintingTooltips : digitalArtTooltips;
    const randomMessage = tooltips[Math.floor(Math.random() * tooltips.length)];
    setTooltipMessage(randomMessage);
    
    // Start 3-second timer
    timerRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowTooltip(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      className="flex-shrink-0 cursor-pointer relative"
      style={{ rotate: `${painting.tilt}deg` }}
      whileHover={{ 
        scale: 1.08, 
        rotate: 0,
        zIndex: 10,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Tooltip - Speech Bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full z-50 pointer-events-none"
          >
            <div className="relative bg-white rounded-2xl px-4 py-3 shadow-xl border-2 border-amber-200 max-w-[200px]">
              {/* Comic-style dots */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-amber-400 rounded-full" />
              <div className="absolute -top-2 left-3 w-1.5 h-1.5 bg-rose-400 rounded-full" />
              
              {/* Message */}
              <p className="text-xs text-zinc-700 font-medium leading-snug">
                {tooltipMessage}
              </p>
              
              {/* Tail */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Polaroid Frame */}
      <div 
        className="bg-white p-2 pb-3 shadow-lg rounded-sm"
        style={{
          boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Image - Fixed height, auto width */}
        <div className="relative h-44 sm:h-52 overflow-hidden">
          <Image
            src={painting.src}
            alt={painting.type === "oil" ? "Oil painting" : "Digital artwork"}
            width={200}
            height={220}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function PaintingGallery() {
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate the array for seamless infinite loop
  const duplicatedPaintings = useMemo(() => [...paintings, ...paintings], []);
  
  // Calculate total width for animation (approximate)
  const totalWidth = paintings.length * 180; // ~180px per polaroid

  return (
    <div className="w-full">
      {/* Stream Container */}
      <div 
        className="relative overflow-x-clip overflow-y-visible pt-16 pb-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Animated Strip */}
        <motion.div
          className="flex items-center gap-6"
          animate={{
            x: isPaused ? undefined : [`0px`, `-${totalWidth}px`],
          }}
          transition={{
            x: {
              duration: 40, // Slow and gentle - 40 seconds for full cycle
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
          style={{
            // Pause animation smoothly
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {duplicatedPaintings.map((painting, index) => (
            <Polaroid 
              key={`${painting.id}-${index}`} 
              painting={painting}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Subtitle with inspirations */}
      <p className="text-center text-xs text-gray-400 dark:text-zinc-500 mt-2 italic">
        Hover to pause · Hold 3s for a secret · Admires{" "}
        <span className="text-blue-500 dark:text-blue-400">Kevin Hill</span> &{" "}
        <span className="text-amber-600 dark:text-amber-400">Sam Yang</span>
      </p>
    </div>
  );
}

export default PaintingGallery;
