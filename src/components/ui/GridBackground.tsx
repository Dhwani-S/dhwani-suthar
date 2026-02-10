"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  dotSize?: number;
  dotSpacing?: number;
  dotColor?: string;
  highlightColor?: string;
  highlightRadius?: number;
}

export function GridBackground({
  className,
  dotSize = 1,
  dotSpacing = 24,
  dotColor = "rgba(148, 163, 184, 0.4)", // Visible slate gray dots
  highlightColor = "rgba(56, 189, 248, 0.6)", // Subtle sky blue
  highlightRadius = 120,
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const targetMouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Smooth lerp for mouse following
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // Get distance between two points
  const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    // Smooth mouse movement
    mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, 0.15);
    mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, 0.15);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid dots
    const cols = Math.ceil(width / dotSpacing) + 1;
    const rows = Math.ceil(height / dotSpacing) + 1;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * dotSpacing;
        const y = j * dotSpacing;
        
        const dist = getDistance(x, y, mouseRef.current.x, mouseRef.current.y);
        
        // Calculate subtle highlight
        let isHighlighted = false;
        let highlightAmount = 0;
        
        if (dist < highlightRadius && mouseRef.current.x > 0) {
          isHighlighted = true;
          highlightAmount = 1 - (dist / highlightRadius);
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        
        if (isHighlighted) {
          // Highlighted dot - subtle blue tint
          const alpha = 0.4 + (highlightAmount * 0.4);
          ctx.fillStyle = highlightColor.replace("0.6", String(alpha));
        } else {
          // Normal dot - always visible
          ctx.fillStyle = dotColor;
        }
        
        ctx.fill();
      }
    }

    // Draw very subtle cursor glow
    if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, highlightRadius
      );
      gradient.addColorStop(0, "rgba(56, 189, 248, 0.08)");
      gradient.addColorStop(0.5, "rgba(56, 189, 248, 0.03)");
      gradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, highlightRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [dotColor, dotSize, dotSpacing, highlightColor, highlightRadius]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  // Handle mouse move (global)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    targetMouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    targetMouseRef.current = { x: -1000, y: -1000 };
  }, []);

  useEffect(() => {
    handleResize();
    
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(resizeTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate, handleMouseLeave, handleMouseMove, handleResize]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

export default GridBackground;
