"use client";

import { useRef } from "react";

interface TechItem {
  name: string;
  logo: string;
}

interface TechMarqueeProps {
  items: TechItem[];
}

export function TechMarquee({ items }: TechMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Double the items for seamless loop
  const doubledItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-6">
      {/* Fade Edges */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      />
      
      {/* Scrolling Container */}
      <div 
        ref={containerRef}
        className="flex items-center gap-16 animate-marquee hover:[animation-play-state:paused]"
        style={{
          width: 'max-content',
        }}
      >
        {doubledItems.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex items-center gap-3 opacity-40 grayscale hover:opacity-90 hover:grayscale-0 transition-all duration-500 group"
            title={tech.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tech.logo}
              alt={tech.name}
              width={28}
              height={28}
              className="w-7 h-7 flex-shrink-0"
            />
            <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-600 transition-colors whitespace-nowrap hidden sm:block">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
