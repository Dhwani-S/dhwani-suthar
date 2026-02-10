"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Living Architecture - Animated data pipeline visualization
 * Shows data packets flowing from sources through processing to storage
 */

interface DataPacket {
  id: number;
  path: number;
  progress: number;
  color: "blue" | "green";
}

export function LivingArchitecture() {
  const [packets, setPackets] = useState<DataPacket[]>([]);

  useEffect(() => {
    let id = 0;
    const interval = setInterval(() => {
      // Add new packet
      setPackets((prev) => [
        ...prev.slice(-12), // Keep max 12 packets
        {
          id: id++,
          path: Math.floor(Math.random() * 3), // 0, 1, or 2
          progress: 0,
          color: Math.random() > 0.5 ? "blue" : "green",
        },
      ]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Update packet positions
  useEffect(() => {
    const animationFrame = setInterval(() => {
      setPackets((prev) =>
        prev
          .map((p) => ({ ...p, progress: p.progress + 2 }))
          .filter((p) => p.progress <= 100)
      );
    }, 50);

    return () => clearInterval(animationFrame);
  }, []);

  // Calculate position along path
  const getPosition = (path: number, progress: number) => {
    const startY = 40 + path * 50; // 40, 90, 140
    const midY = 100;
    const endY = 40 + path * 50;

    if (progress < 30) {
      // Moving from source to center
      const t = progress / 30;
      return {
        x: 30 + t * 100,
        y: startY + (midY - startY) * t,
      };
    } else if (progress < 70) {
      // In the processing cluster
      const t = (progress - 30) / 40;
      return {
        x: 130 + t * 80,
        y: midY + Math.sin(t * Math.PI * 2) * 15,
      };
    } else {
      // Moving to storage
      const t = (progress - 70) / 30;
      return {
        x: 210 + t * 80,
        y: midY + (endY - midY) * t,
      };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      {/* Glass Card Container */}
      <div className="bg-white/80 backdrop-blur-md border border-zinc-200/60 rounded-2xl shadow-2xl shadow-zinc-200/50 p-8 w-[420px]">
        <svg viewBox="0 0 320 200" className="w-full h-auto">
          {/* Source Nodes (Left) */}
          <g className="sources">
            {[0, 1, 2].map((i) => (
              <g key={`source-${i}`}>
                <circle
                  cx="30"
                  cy={40 + i * 50}
                  r="12"
                  fill="none"
                  stroke="#d4d4d8"
                  strokeWidth="1.5"
                />
                <text
                  x="30"
                  y={44 + i * 50}
                  className="text-[8px] fill-zinc-400"
                  textAnchor="middle"
                >
                  {["API", "DB", "IOT"][i]}
                </text>
              </g>
            ))}
          </g>

          {/* Connection Lines (Source to Processing) */}
          {[0, 1, 2].map((i) => (
            <path
              key={`line-in-${i}`}
              d={`M 45 ${40 + i * 50} Q 90 ${70 + i * 20} 130 100`}
              fill="none"
              stroke="#e4e4e7"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          ))}

          {/* Processing Cluster (Center) */}
          <g className="processing">
            <rect
              x="125"
              y="70"
              width="70"
              height="60"
              rx="8"
              fill="none"
              stroke="#d4d4d8"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />
            <text
              x="160"
              y="95"
              className="text-[9px] fill-zinc-400"
              textAnchor="middle"
            >
              TRANSFORM
            </text>
            <text
              x="160"
              y="108"
              className="text-[7px] fill-zinc-300"
              textAnchor="middle"
            >
              Spark · Airflow
            </text>
          </g>

          {/* Connection Lines (Processing to Storage) */}
          {[0, 1, 2].map((i) => (
            <path
              key={`line-out-${i}`}
              d={`M 200 100 Q 240 ${70 + i * 20} 275 ${40 + i * 50}`}
              fill="none"
              stroke="#e4e4e7"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          ))}

          {/* Storage Nodes (Right) */}
          <g className="storage">
            {[0, 1, 2].map((i) => (
              <g key={`storage-${i}`}>
                <rect
                  x="265"
                  y={28 + i * 50}
                  width="40"
                  height="24"
                  rx="4"
                  fill="none"
                  stroke="#d4d4d8"
                  strokeWidth="1.5"
                />
                <text
                  x="285"
                  y={44 + i * 50}
                  className="text-[7px] fill-zinc-400"
                  textAnchor="middle"
                >
                  {["Delta", "BQ", "S3"][i]}
                </text>
              </g>
            ))}
          </g>

          {/* Animated Data Packets */}
          {packets.map((packet) => {
            const pos = getPosition(packet.path, packet.progress);
            return (
              <motion.circle
                key={packet.id}
                cx={pos.x}
                cy={pos.y}
                r="4"
                fill={packet.color === "blue" ? "#3b82f6" : "#22c55e"}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              />
            );
          })}

          {/* Labels */}
          <text x="30" y="175" className="text-[8px] fill-zinc-300" textAnchor="middle">
            Sources
          </text>
          <text x="160" y="145" className="text-[8px] fill-zinc-300" textAnchor="middle">
            Processing
          </text>
          <text x="285" y="175" className="text-[8px] fill-zinc-300" textAnchor="middle">
            Storage
          </text>
        </svg>

        {/* Status Bar */}
        <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-400 font-mono">Live</span>
          </div>
          <div className="text-zinc-400 font-mono">
            50TB/day · &lt;1s latency
          </div>
        </div>
      </div>

      {/* Ambient Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] -z-10" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] -z-10" />
    </motion.div>
  );
}

export default LivingArchitecture;
