"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Activity, DollarSign, TrendingUp, PieChart, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

// Sparkline component
function Sparkline({
  data,
  width = 60,
  height = 20,
}: {
  data: number[];
  width?: number;
  height?: number;
}) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height * 0.8 - height * 0.1;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="flex-shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke="rgb(6, 182, 212)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface SystemStatusProps {
  className?: string;
}

export function SystemStatus({ className }: SystemStatusProps) {
  const [metrics, setMetrics] = useState({
    spendRate: 48.2,
    savingsFound: 1.5,
    allocation: 99.9,
    activeConnections: 0,
  });
  const [spendHistory, setSpendHistory] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const generateMetrics = useCallback(() => {
    // Fluctuate spend rate slightly around $48.20/hr
    const baseSpend = 48.2;
    const spend = baseSpend + (Math.random() * 4 - 2) + Math.sin(Date.now() / 3000) * 1.5;

    const connections = Math.floor(45 + Math.random() * 20);

    setMetrics({
      spendRate: Math.max(44, Math.min(52, spend)),
      savingsFound: 1.5, // Static
      allocation: 99.9, // Static
      activeConnections: connections,
    });

    setSpendHistory((prev) => [...prev, spend].slice(-15));
  }, []);

  useEffect(() => {
    generateMetrics();
    intervalRef.current = setInterval(generateMetrics, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [generateMetrics]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl border border-border bg-card p-4 w-full max-w-xs",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-500" />
          <span className="text-sm font-medium text-foreground">Cost Monitor</span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-emerald-500">Live</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        {/* Spend Rate */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <DollarSign className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
            <span className="text-xs text-muted-foreground">Spend Rate</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkline data={spendHistory} width={50} height={16} />
            <span className="text-xs font-mono font-medium text-foreground w-20 text-right">
              ${metrics.spendRate.toFixed(2)}/hr
            </span>
          </div>
        </div>

        {/* Savings Found */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span className="text-xs text-muted-foreground">Savings Found</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-500">
            ${metrics.savingsFound}M
          </span>
        </div>

        {/* Allocation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <PieChart className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
            <span className="text-xs text-muted-foreground">Allocation</span>
          </div>
          <span className="text-xs font-mono font-medium text-foreground">
            {metrics.allocation}%
          </span>
        </div>

        {/* Connections */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Wifi className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
            <span className="text-xs text-muted-foreground">Cloud Accounts</span>
          </div>
          <span className="text-xs font-mono font-medium text-foreground">
            {metrics.activeConnections}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Compact inline version
export function SystemStatusMini({ className }: { className?: string }) {
  const [rate, setRate] = useState(48.2);
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    const generate = () => {
      const value = 48.2 + (Math.random() * 4 - 2);
      setRate(value);
      setHistory((prev) => [...prev, value].slice(-12));
    };

    generate();
    const interval = setInterval(generate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-1.5">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-emerald-500"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-xs text-muted-foreground">Live</span>
      </div>
      <div className="flex items-center gap-2">
        <DollarSign className="w-3 h-3 text-cyan-500" />
        <span className="text-xs font-mono text-foreground">${rate.toFixed(2)}/hr</span>
      </div>
      <Sparkline data={history} width={40} height={14} />
    </div>
  );
}

export default SystemStatus;
