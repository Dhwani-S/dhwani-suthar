"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

/**
 * Profile Stack - "Identity Stack" visual
 * 3 stacked cards: Tech (bottom) → Stats (middle) → Profile (top)
 * Hover to fan out and reveal the layers
 */

const techLogos = [
  { name: "Python", url: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Spark", url: "https://cdn.simpleicons.org/apachespark/E25A1C" },
  { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "GCP", url: "https://cdn.simpleicons.org/googlecloud/4285F4" },
  { name: "Airflow", url: "https://cdn.simpleicons.org/apacheairflow/017CEE" },
];

export function ProfileStack() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-80 h-96 mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card 1: Tech Card (Bottom) */}
      <motion.div
        animate={{
          rotate: isHovered ? -12 : -6,
          x: isHovered ? -40 : 0,
          y: isHovered ? 20 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 z-10"
      >
        <div className="w-full h-full bg-zinc-100 rounded-3xl border border-zinc-200 shadow-xl p-6 flex flex-col justify-end">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-3">
            {techLogos.map((tech) => (
              <div
                key={tech.name}
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm"
              >
                <Image
                  src={tech.url}
                  alt={tech.name}
                  width={24}
                  height={24}
                  className="opacity-80"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Card 2: Stats Card (Middle) */}
      <motion.div
        animate={{
          rotate: isHovered ? 8 : 3,
          x: isHovered ? 30 : 0,
          y: isHovered ? 30 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 z-20"
      >
        <div className="w-full h-full bg-white rounded-3xl border border-zinc-100 shadow-xl p-6 flex flex-col justify-end">
          <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
            Impact
          </p>
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-zinc-900">$1.5M</span>
              <span className="text-sm text-zinc-500">cloud costs saved</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-zinc-900">50TB</span>
              <span className="text-sm text-zinc-500">data processed daily</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-emerald-600">99.9%</span>
              <span className="text-sm text-zinc-500">allocation accuracy</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 3: Profile Card (Top) */}
      <motion.div
        animate={{
          rotate: isHovered ? 0 : 0,
          y: isHovered ? -20 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 z-30"
      >
        <div className="w-full h-full bg-white rounded-3xl border border-zinc-100 shadow-2xl shadow-zinc-200/50 overflow-hidden">
          {/* Profile Image Area */}
          <div className="h-3/5 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 flex items-center justify-center relative">
            {/* Placeholder Avatar */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-5xl">👨‍💻</span>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>

          {/* Profile Info */}
          <div className="h-2/5 p-5 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-zinc-900">Dhwani Suthar</h3>
            <p className="text-sm text-zinc-500 mt-1">
              Data Engineer • FinOps • Artist
            </p>
            <div className="flex gap-2 mt-3">
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
                Open to Work
              </span>
              <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded-full font-medium">
                Bangalore
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Aurora glow behind stack */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] -z-10" />
    </div>
  );
}

export default ProfileStack;
