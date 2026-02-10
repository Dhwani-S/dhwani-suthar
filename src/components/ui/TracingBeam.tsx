"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

export function TracingBeam({ children, className }: TracingBeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  // Smooth spring animation for the progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform for the gradient position
  const y1 = useTransform(smoothProgress, [0, 1], [0, svgHeight]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, svgHeight - 200]);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  // Update height on resize
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div ref={ref} className={cn("relative", className)}>
      {/* SVG Beam */}
      <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="absolute left-1/2 -translate-x-1/2 block"
          aria-hidden="true"
        >
          <defs>
            {/* Gradient for the glowing line */}
            <linearGradient
              id="tracing-beam-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgb(6, 182, 212)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background line */}
          <path
            d={`M 10 0 V ${svgHeight}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-border"
            strokeOpacity="0.3"
          />

          {/* Animated glowing line */}
          <motion.path
            d={`M 10 0 V ${svgHeight}`}
            fill="none"
            stroke="url(#tracing-beam-gradient)"
            strokeWidth="2"
            filter="url(#glow)"
            style={{
              pathLength: smoothProgress,
              opacity: 0.8,
            }}
          />

          {/* Animated dot at the current position */}
          <motion.circle
            cx="10"
            cy={y1}
            r="4"
            fill="rgb(6, 182, 212)"
            filter="url(#glow)"
            style={{ opacity: 0.9 }}
          />

          {/* Trailing glow */}
          <motion.circle
            cx="10"
            cy={y2}
            r="6"
            fill="rgb(6, 182, 212)"
            style={{ opacity: 0.3 }}
          />
        </svg>
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative pl-10 md:pl-16">
        {children}
      </div>
    </motion.div>
  );
}

// Timeline item component for use with TracingBeam
interface TimelineItemProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

export function TimelineItem({
  children,
  className,
  isActive = false,
}: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setIsInView(value > 0 && value < 1);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative pb-12 last:pb-0", className)}
      initial={{ opacity: 0.5 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      {/* Dot marker */}
      <motion.div
        className={cn(
          "absolute -left-10 md:-left-12 top-1 w-3 h-3 rounded-full border-2 transition-all duration-300",
          isInView || isActive
            ? "bg-cyan-500 border-cyan-500 shadow-lg shadow-cyan-500/50"
            : "bg-background border-border"
        )}
        animate={{
          scale: isInView ? 1.2 : 1,
        }}
      />

      {/* Content with glow when active */}
      <div
        className={cn(
          "transition-all duration-500",
          isInView && "relative"
        )}
      >
        {isInView && (
          <div className="absolute -inset-4 bg-cyan-500/5 rounded-xl blur-xl pointer-events-none" />
        )}
        <div className="relative">{children}</div>
      </div>
    </motion.div>
  );
}

export default TracingBeam;
