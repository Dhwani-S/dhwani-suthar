"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface ParticleNetworkProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  mouseRadius?: number;
  particleColor?: string;
  lineColor?: string;
  speed?: number;
}

export function ParticleNetwork({
  className,
  particleCount = 50,
  connectionDistance = 150,
  mouseRadius = 200,
  particleColor = "rgba(6, 182, 212, 0.6)",
  lineColor = "rgba(6, 182, 212, 0.15)",
  speed = 0.3,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Initialize particles
  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    },
    [particleCount, speed]
  );

  // Calculate distance between two points
  const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Clear canvas with fade effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Mouse interaction - attract slightly or repel
      const distToMouse = getDistance(particle.x, particle.y, mouse.x, mouse.y);
      if (distToMouse < mouseRadius && distToMouse > 0) {
        const angle = Math.atan2(particle.y - mouse.y, particle.x - mouse.x);
        const force = (mouseRadius - distToMouse) / mouseRadius;
        // Subtle repulsion
        particle.vx += Math.cos(angle) * force * 0.02;
        particle.vy += Math.sin(angle) * force * 0.02;
      }

      // Apply velocity with dampening
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Ensure minimum movement
      if (Math.abs(particle.vx) < 0.1) particle.vx = (Math.random() - 0.5) * speed;
      if (Math.abs(particle.vy) < 0.1) particle.vy = (Math.random() - 0.5) * speed;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor.replace("0.6", String(particle.opacity));
      ctx.fill();

      // Draw connections to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const other = particles[j];
        const dist = getDistance(particle.x, particle.y, other.x, other.y);

        if (dist < connectionDistance) {
          const opacity = (1 - dist / connectionDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = lineColor.replace("0.15", String(opacity));
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw connection to mouse if close
      if (distToMouse < mouseRadius) {
        const opacity = (1 - distToMouse / mouseRadius) * 0.4;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw mouse glow
    if (mouse.x > 0 && mouse.y > 0) {
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        100
      );
      gradient.addColorStop(0, "rgba(6, 182, 212, 0.1)");
      gradient.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
      ctx.fill();
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [connectionDistance, lineColor, mouseRadius, particleColor, speed]);

  // Handle resize
  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
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

      initParticles(rect.width, rect.height);
    }, 100);
  }, [initParticles]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [animate, handleMouseLeave, handleMouseMove, handleResize]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />
      {/* Edge fade overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background via-transparent to-background opacity-50" />
    </div>
  );
}

export default ParticleNetwork;
