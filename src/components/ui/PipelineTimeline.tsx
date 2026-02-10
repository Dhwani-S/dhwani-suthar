"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Calendar, MapPin, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  highlight: string;
  logo: string;
  companyQuote?: string;
  isCurrent?: boolean;
}

interface PipelineTimelineProps {
  items: TimelineItem[];
}

function TimelineNode({ 
  item, 
  index, 
  isHovered, 
  onHover,
  totalItems
}: { 
  item: TimelineItem; 
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  totalItems: number;
}) {
  const isFirst = index === 0;
  const isLast = index === totalItems - 1;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative pl-10 pb-10 last:pb-0"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* The Pipeline Line - Blue to Teal Gradient (Data Flow) */}
      {!isLast && (
        <div
          className={cn(
            "absolute left-[14px] top-8 bottom-0 w-[3px] rounded-full transition-all duration-500",
            isHovered 
              ? "shadow-[0_0_12px_rgba(6,182,212,0.6)]" 
              : ""
          )}
          style={{
            background: isHovered 
              ? "linear-gradient(180deg, #3B82F6 0%, #06B6D4 50%, #10B981 100%)"
              : "linear-gradient(180deg, #3B82F6 0%, #06B6D4 50%, #10B981 100%)",
            opacity: isHovered ? 1 : 0.6
          }}
        />
      )}
      
      {/* The Node - Pulsing green for current role */}
      <div className="absolute left-0 top-1">
        {isFirst ? (
          // Current role - pulsing emerald glow
          <div className="relative">
            {/* Outer glow rings */}
            <motion.div
              animate={{ 
                scale: [1, 1.8, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-8 h-8 rounded-full bg-emerald-500/30"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
              className="absolute inset-0 w-8 h-8 rounded-full bg-emerald-500/40"
            />
            {/* Main dot */}
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 10px rgba(16,185,129,0.6)",
                  "0 0 20px rgba(16,185,129,0.8)",
                  "0 0 10px rgba(16,185,129,0.6)"
                ]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={cn(
                "relative w-8 h-8 rounded-full flex items-center justify-center z-10",
                "bg-gradient-to-br from-emerald-400 to-emerald-600",
                "border-2 border-emerald-300"
              )}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
            </motion.div>
          </div>
        ) : (
          // Past roles - Blue gradient node
          <motion.div
            animate={{ 
              scale: isHovered ? 1.2 : 1,
            }}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center z-10",
              "border-2 transition-all duration-300",
              isHovered 
                ? "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-500/20 dark:to-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/30"
                : "bg-gray-100 dark:bg-zinc-800/50 border-blue-400 dark:border-blue-500/50"
            )}
          >
            <span className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors",
              isHovered 
                ? "bg-gradient-to-br from-blue-400 to-cyan-400" 
                : "bg-blue-500"
            )} />
          </motion.div>
        )}
      </div>

      {/* Content Card - WHITE on light mode */}
      <motion.div
        animate={{
          borderColor: isHovered 
            ? "rgba(6, 182, 212, 0.4)" 
            : "rgba(229, 231, 235, 1)", // gray-200 for light mode
        }}
        className={cn(
          "rounded-xl border p-5 transition-all duration-300",
          // Light mode: white background
          "bg-white dark:bg-black/10",
          // Border
          "border-gray-200 dark:border-white/10",
          // Shadow
          "shadow-sm",
          // Hover state
          isHovered && "shadow-md dark:bg-cyan-500/5"
        )}
      >
        {/* Header with Logo */}
        <div className="flex items-start gap-4 mb-4">
          {/* Company Logo - FULL COLOR */}
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            className={cn(
              "w-14 h-14 rounded-xl overflow-hidden flex-shrink-0",
              "bg-gray-50 dark:bg-zinc-800/80",
              "border border-gray-100 dark:border-zinc-700",
              "flex items-center justify-center",
              "shadow-sm"
            )}
          >
            <Image
              src={item.logo}
              alt={item.company}
              width={48}
              height={48}
              className="object-contain p-1.5 transition-transform duration-300"
              style={{ filter: "none" }} // Full color always
              unoptimized
            />
          </motion.div>

          {/* Title & Company */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <h3 className={cn(
                "text-base font-semibold transition-colors",
                isHovered 
                  ? "text-cyan-600 dark:text-cyan-400" 
                  : "text-gray-900 dark:text-white"
              )}>
                {item.title}
              </h3>
              {/* Current Badge */}
              {isFirst && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                  <motion.span 
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" 
                  />
                  Active
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-white/80">{item.company}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-gray-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {item.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {item.period}
          </span>
          {/* Highlight Metric */}
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-500/20 dark:to-cyan-500/20 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-500/20">
            {item.highlight}
          </span>
        </div>

        {/* Description */}
        <ul className="space-y-2 mb-4">
          {item.description.map((desc, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="text-sm text-gray-600 dark:text-zinc-400 flex items-start gap-2"
            >
              <span className={cn(
                "mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors",
                isHovered ? "bg-cyan-500 dark:bg-cyan-400" : "bg-blue-500"
              )} />
              <span>{desc}</span>
            </motion.li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className={cn(
                "px-2.5 py-1 text-xs font-medium rounded-lg transition-all",
                isHovered 
                  ? "bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-500/15 dark:to-blue-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/20" 
                  : "bg-gray-100 dark:bg-zinc-800/60 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700/50"
              )}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Company Quote */}
        {item.companyQuote && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-100 dark:border-white/10"
          >
            <div className="flex items-start gap-2">
              <Quote className="w-4 h-4 text-amber-500/60 flex-shrink-0 mt-0.5" />
              <p className="text-xs italic text-gray-500 dark:text-zinc-500">
                {item.companyQuote}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function PipelineTimeline({ items }: PipelineTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Pipeline Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="flex items-center gap-2">
          <motion.div 
            animate={{ 
              boxShadow: [
                "0 0 8px rgba(16,185,129,0.5)",
                "0 0 16px rgba(16,185,129,0.8)",
                "0 0 8px rgba(16,185,129,0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full bg-emerald-500" 
          />
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            Career Pipeline
          </span>
        </div>
        <div className="flex-1 h-[2px] bg-gradient-to-r from-emerald-500/50 via-cyan-500/30 to-transparent rounded-full" />
      </motion.div>

      {/* Timeline Items */}
      <div className="relative">
        {items.map((item, index) => (
          <TimelineNode
            key={item.company}
            item={item}
            index={index}
            isHovered={hoveredIndex === index}
            onHover={setHoveredIndex}
            totalItems={items.length}
          />
        ))}
        
        {/* End Node */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative pl-10 pt-2"
        >
          <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800/50 border-2 border-dashed border-gray-300 dark:border-zinc-600 flex items-center justify-center">
            <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-mono">∞</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-zinc-500 italic pt-1.5">
            The journey continues...
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default PipelineTimeline;
