"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Creative Teaser - Mini Gallery Strip
 * Polaroid-style preview that links to the About page
 */

const featuredPaintings = [
  { src: "/paintings/mountain-landscape.jpg", title: "Mountain Vista" },
  { src: "/paintings/portrait-study.png", title: "Portrait Study" },
  { src: "/paintings/beach-sunset.png", title: "Golden Hour" },
];

function PolaroidCard({ 
  painting, 
  index,
  rotation 
}: { 
  painting: typeof featuredPaintings[0]; 
  index: number;
  rotation: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        rotate: 0, 
        scale: 1.08, 
        zIndex: 20,
        transition: { duration: 0.3 }
      }}
      className="relative cursor-pointer"
    >
      <div className={cn(
        "bg-white p-3 shadow-xl rounded-sm",
        "transition-all duration-300",
        "group"
      )}>
        <div className="w-40 h-40 md:w-48 md:h-48 overflow-hidden bg-zinc-100 relative">
          <Image
            src={painting.src}
            alt={painting.title}
            fill
            className={cn(
              "object-cover",
              "grayscale group-hover:grayscale-0",
              "brightness-95 group-hover:brightness-100",
              "transition-all duration-500"
            )}
          />
        </div>
        <p 
          className="pt-3 pb-1 text-center text-zinc-500 group-hover:text-zinc-700 transition-colors"
          style={{ fontFamily: "Caveat, cursive", fontSize: "1.1rem" }}
        >
          {painting.title}
        </p>
      </div>
    </motion.div>
  );
}

export function CreativeTeaser() {
  const rotations = [-6, 2, -3];
  
  return (
    <div className="flex flex-col items-center">
      {/* Mini Gallery Strip */}
      <div className="flex items-center justify-center gap-4 md:gap-6 mb-12 -space-x-8 md:-space-x-6">
        {featuredPaintings.map((painting, index) => (
          <PolaroidCard
            key={painting.src}
            painting={painting}
            index={index}
            rotation={rotations[index]}
          />
        ))}
      </div>
      
      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href="/about#creative"
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-full",
            "bg-zinc-100 text-zinc-700 font-medium",
            "hover:bg-zinc-200 transition-all duration-300",
            "group"
          )}
        >
          Explore my Creative Journey
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}

export default CreativeTeaser;
