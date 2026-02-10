"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  spotlightColor?: "green" | "blue" | "cyan" | "purple";
}

export function SpotlightCard({
  children,
  className,
  href,
  spotlightColor = "cyan",
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const colorMap = {
    green: "rgba(34, 197, 94, 0.15)",
    blue: "rgba(59, 130, 246, 0.15)",
    cyan: "rgba(6, 182, 212, 0.15)",
    purple: "rgba(168, 85, 247, 0.15)",
  };

  const borderColorMap = {
    green: "rgba(34, 197, 94, 0.4)",
    blue: "rgba(59, 130, 246, 0.4)",
    cyan: "rgba(6, 182, 212, 0.4)",
    purple: "rgba(168, 85, 247, 0.4)",
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    },
    []
  );

  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative"
    >
      <Wrapper
        {...(wrapperProps as any)}
        className={cn(
          "group relative block overflow-hidden rounded-2xl border border-border bg-card",
          "transition-colors duration-300",
          href && "cursor-pointer",
          className
        )}
      >
        {/* Spotlight gradient overlay */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${colorMap[spotlightColor]}, transparent 40%)`,
          }}
        />

        {/* Animated border glow */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-300"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${borderColorMap[spotlightColor]}, transparent 40%)`,
            mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            maskComposite: "xor",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />

        {/* Grid pattern reveal on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          style={{
            backgroundImage: `
              linear-gradient(to right, ${borderColorMap[spotlightColor]} 1px, transparent 1px),
              linear-gradient(to bottom, ${borderColorMap[spotlightColor]} 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
            mask: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 60%)`,
            WebkitMask: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent 60%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-30">{children}</div>
      </Wrapper>
    </motion.div>
  );
}

// Grid container for spotlight cards
interface SpotlightGridProps {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightGrid({ children, className }: SpotlightGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative", className)}
      style={
        {
          "--mouse-x": `${mousePosition.x}px`,
          "--mouse-y": `${mousePosition.y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export default SpotlightCard;
