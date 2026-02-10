"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

/**
 * Art Marquee - Infinite horizontal scroll of paintings
 * "Beyond the Code" - Human element at the end of the journey
 */

const paintings = [
  { src: "/paintings/mountain-landscape.jpg", title: "Mountain Vista", year: "2024" },
  { src: "/paintings/portrait-study.png", title: "Portrait Study", year: "2023" },
  { src: "/paintings/beach-sunset.png", title: "Golden Hour", year: "2024" },
  { src: "/paintings/joyful-portrait.png", title: "Joy", year: "2023" },
  { src: "/paintings/sunny-alley.png", title: "Sunny Alley", year: "2024" },
  { src: "/paintings/winter-red-coat.png", title: "Winter Walk", year: "2023" },
  { src: "/paintings/oil13.png", title: "Abstract", year: "2024" },
  { src: "/paintings/10.png", title: "Sketch", year: "2023" },
];

// Double the array for seamless loop
const allPaintings = [...paintings, ...paintings];

export function ArtMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Edge Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <motion.div
        className="flex gap-6 py-4"
        animate={{
          x: isPaused ? 0 : [0, -50 * paintings.length * 14],
        }}
        transition={{
          x: {
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{ width: "fit-content" }}
      >
        {allPaintings.map((painting, index) => {
          // Random slight rotation for organic feel
          const rotation = ((index * 7) % 5) - 2; // -2 to 2 degrees
          
          return (
            <motion.div
              key={`${painting.src}-${index}`}
              className="flex-shrink-0"
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              style={{ rotate: `${rotation}deg` }}
            >
              <div className="bg-white p-2 shadow-lg rounded-sm">
                <div className="w-44 h-44 overflow-hidden bg-zinc-100">
                  <Image
                    src={painting.src}
                    alt={painting.title}
                    width={180}
                    height={180}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-2 pb-1 text-center">
                  <p
                    className="text-sm text-zinc-600"
                    style={{ fontFamily: "Caveat, cursive" }}
                  >
                    {painting.title}, {painting.year}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default ArtMarquee;
