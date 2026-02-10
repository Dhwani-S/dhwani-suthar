"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Coffee, Cloud, TrendingDown, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * StoryTimeline - Scrollytelling vertical timeline
 * The line "fills" with blue ink as user scrolls
 */

const chapters = [
  {
    id: 1,
    title: "The Origin",
    subtitle: "I started with a paintbrush, not a keyboard.",
    story: "In Ahmedabad, I learned that patience creates perfection. I spent hours mixing colors, layering strokes, waiting for paint to dry. This taught me the 'Obsession with Detail' that I now use to debug complex pipelines.",
    visual: "painting",
    icon: Palette,
    color: "from-amber-500 to-rose-500",
  },
  {
    id: 2,
    title: "The Consultant",
    subtitle: "The Bootcamp.",
    story: "I was thrown into the deep end. Diverse clients, tight deadlines, and broken legacy code. One week it was Oracle migrations, the next it was building GenAI prototypes. I didn't just learn to code; I learned to solve.",
    visual: "coffee",
    icon: Coffee,
    color: "from-amber-600 to-orange-600",
  },
  {
    id: 3,
    title: "The FinOps Specialist",
    subtitle: "The Art of Efficiency.",
    story: "Now, I combine both worlds. I see Cloud Architecture as a canvas. If it's messy, it's expensive. I treat 'Cost Optimization' as an art form - every wasted dollar is like a stray brushstroke that ruins the composition.",
    visual: "cloud",
    icon: Cloud,
    color: "from-blue-500 to-cyan-500",
  },
];

function ChapterCard({ 
  chapter, 
  index,
  isLeft 
}: { 
  chapter: typeof chapters[0]; 
  index: number;
  isLeft: boolean;
}) {
  const Icon = chapter.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={cn(
        "relative",
        isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
      )}
    >
      {/* Node on timeline */}
      <div 
        className={cn(
          "absolute top-0 w-12 h-12 rounded-full bg-white border-4 border-blue-500 shadow-lg shadow-blue-500/20 flex items-center justify-center z-10",
          "left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0",
          isLeft ? "md:-right-6" : "md:-left-6"
        )}
      >
        <Icon className="w-5 h-5 text-blue-600" />
      </div>

      {/* Content Card */}
      <div className={cn(
        "bg-white rounded-2xl p-6 shadow-lg border border-gray-100",
        "mt-16 md:mt-0"
      )}>
        {/* Visual */}
        {chapter.visual === "painting" && (
          <div className="mb-4 inline-block">
            <div className="w-24 h-24 bg-white p-2 shadow-md rotate-3 hover:rotate-0 transition-transform">
              <div className="w-full h-full bg-gradient-to-br from-amber-200 via-rose-200 to-violet-200 rounded-sm flex items-center justify-center">
                <Palette className="w-8 h-8 text-amber-600/50" />
              </div>
            </div>
          </div>
        )}
        
        {chapter.visual === "coffee" && (
          <div className="mb-4 text-5xl">☕</div>
        )}
        
        {chapter.visual === "cloud" && (
          <div className="mb-4 flex items-center gap-2">
            <Cloud className="w-10 h-10 text-blue-500" />
            <TrendingDown className="w-8 h-8 text-emerald-500" />
          </div>
        )}

        {/* Chapter Number */}
        <div className={cn(
          "inline-block px-3 py-1 rounded-full text-xs font-bold mb-3",
          `bg-gradient-to-r ${chapter.color} text-white`
        )}>
          Chapter {chapter.id}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {chapter.title}
        </h3>
        
        {/* Subtitle */}
        <p className="text-blue-600 font-medium mb-3 italic">
          &quot;{chapter.subtitle}&quot;
        </p>
        
        {/* Story */}
        <p className="text-gray-600 leading-relaxed text-sm">
          {chapter.story}
        </p>
      </div>
    </motion.div>
  );
}

export function StoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative py-12">
      {/* The Timeline Line (SVG) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1">
        {/* Background line */}
        <div className="absolute inset-0 bg-gray-200 rounded-full" />
        
        {/* Animated fill */}
        <motion.div 
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-500 via-blue-600 to-cyan-500 rounded-full origin-top"
          style={{ scaleY: pathLength }}
        />
      </div>

      {/* Chapters */}
      <div className="relative z-10 space-y-24 md:space-y-32">
        {chapters.map((chapter, index) => (
          <div 
            key={chapter.id}
            className="grid md:grid-cols-2 gap-8 items-start"
          >
            {index % 2 === 0 ? (
              <>
                <ChapterCard chapter={chapter} index={index} isLeft={true} />
                <div className="hidden md:block" />
              </>
            ) : (
              <>
                <div className="hidden md:block" />
                <ChapterCard chapter={chapter} index={index} isLeft={false} />
              </>
            )}
          </div>
        ))}
      </div>

      {/* End Node */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-xl shadow-blue-500/30 flex items-center justify-center"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <span className="text-white text-2xl">🚀</span>
      </motion.div>
    </div>
  );
}

export default StoryTimeline;
