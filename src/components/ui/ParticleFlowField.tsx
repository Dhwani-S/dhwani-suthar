"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

/**
 * Particle Flow Field - "Digital Oil" Canvas
 * Data turning into Art - Perlin noise flow field with painting colors
 */

// Simple noise function (simplex-like)
function createNoise() {
  const permutation = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [permutation[i], permutation[j]] = [permutation[j], permutation[i]];
  }
  const p = [...permutation, ...permutation];

  function fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(a: number, b: number, t: number) {
    return a + t * (b - a);
  }

  function grad(hash: number, x: number, y: number) {
    const h = hash & 3;
    const u = h < 2 ? x : y;
    const v = h < 2 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  return function noise(x: number, y: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const A = p[X] + Y;
    const B = p[X + 1] + Y;
    return lerp(
      lerp(grad(p[A], x, y), grad(p[B], x - 1, y), u),
      lerp(grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1), u),
      v
    );
  };
}

// Color palette from paintings
const COLORS = [
  { r: 30, g: 64, b: 175 },   // Deep Blue
  { r: 79, g: 70, b: 229 },   // Indigo
  { r: 99, g: 102, b: 241 },  // Light Indigo
  { r: 217, g: 169, b: 79 },  // Soft Gold
  { r: 251, g: 191, b: 36 },  // Amber
  { r: 16, g: 185, b: 129 },  // Emerald
  { r: 139, g: 92, b: 246 },  // Violet
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: typeof COLORS[0];
  size: number;
  life: number;
  maxLife: number;
}

export function ParticleFlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const noiseRef = useRef(createNoise());
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const count = Math.min(2500, Math.floor((width * height) / 200));
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 2 + 1,
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 100,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Fade effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(0, 0, width, height);

      const noise = noiseRef.current;
      const mouse = mouseRef.current;
      timeRef.current += 0.002;

      particlesRef.current.forEach((particle) => {
        // Flow field angle from noise
        const scale = 0.005;
        const angle = noise(
          particle.x * scale + timeRef.current,
          particle.y * scale
        ) * Math.PI * 4;

        // Base velocity from flow field
        particle.vx += Math.cos(angle) * 0.15;
        particle.vy += Math.sin(angle) * 0.15;

        // Mouse interaction - swirl effect
        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            const force = (150 - dist) / 150;
            // Create swirl by adding perpendicular force
            particle.vx += (-dy / dist) * force * 2;
            particle.vy += (dx / dist) * force * 2;
          }
        }

        // Apply friction
        particle.vx *= 0.96;
        particle.vy *= 0.96;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Update life
        particle.life++;
        if (particle.life > particle.maxLife) {
          particle.life = 0;
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Draw particle
        const alpha = Math.sin((particle.life / particle.maxLife) * Math.PI) * 0.7;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${alpha})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="relative"
    >
      {/* Canvas Container with glass effect */}
      <div className="relative w-[450px] h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/20 border border-white/20">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-indigo-100/30 pointer-events-none z-10" />
        
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          style={{ background: "linear-gradient(135deg, #fafafa 0%, #f0f4ff 100%)" }}
        />

        {/* Label */}
        <div className="absolute bottom-4 left-4 z-20">
          <p className="text-xs font-mono text-zinc-400 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
            Interactive · Move your cursor
          </p>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/15 rounded-full blur-[80px] -z-10" />
    </motion.div>
  );
}

export default ParticleFlowField;
