"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, Trophy, Flame, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeetCodeStats {
  solved: number;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  streak: number;
  ranking: string;
}

// Placeholder stats - update these with real values
const stats: LeetCodeStats = {
  solved: 300,
  total: 3000,
  easy: 120,
  medium: 150,
  hard: 30,
  streak: 45,
  ranking: "Top 15%",
};

// Calculate percentage for doughnut
const solvedPercentage = (stats.solved / stats.total) * 100;

export function LeetCodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "p-5 rounded-xl h-full",
        // Light mode: white card
        "bg-white border border-gray-200 shadow-sm",
        // Dark mode: dark card
        "dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800",
        "dark:border-zinc-700/50",
        "hover:border-amber-300 dark:hover:border-amber-500/30",
        "transition-all duration-300"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Code Activity
            </h4>
            <p className="text-[10px] text-gray-500 dark:text-zinc-500">LeetCode</p>
          </div>
        </div>
        <motion.a
          href="https://leetcode.com/u/dhwanisuthar"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1 font-medium"
        >
          Profile
          <ExternalLink className="w-3 h-3" />
        </motion.a>
      </div>

      {/* Doughnut Chart + Stats */}
      <div className="flex items-center gap-5 mb-5">
        {/* Doughnut Chart */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-gray-100 dark:text-zinc-800"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${solvedPercentage * 2.51} 251`}
              initial={{ strokeDasharray: "0 251" }}
              whileInView={{ strokeDasharray: `${solvedPercentage * 2.51} 251` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-2xl font-black text-amber-600 dark:text-amber-400"
            >
              {stats.solved}
            </motion.span>
            <span className="text-[9px] text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
              Solved
            </span>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="flex-1 space-y-2">
          {/* Easy */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs text-gray-500 dark:text-zinc-400">Easy</span>
            </div>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{stats.easy}</span>
          </div>
          {/* Medium */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs text-gray-500 dark:text-zinc-400">Medium</span>
            </div>
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{stats.medium}</span>
          </div>
          {/* Hard */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-xs text-gray-500 dark:text-zinc-400">Hard</span>
            </div>
            <span className="text-sm font-bold text-rose-600 dark:text-rose-400">{stats.hard}</span>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
          <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">Knight</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
          <Flame className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
          <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">{stats.streak} Days</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20">
          <Target className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">{stats.ranking}</span>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
        <p className="text-[10px] text-gray-500 dark:text-zinc-500 uppercase tracking-wider mb-2">Focus Areas</p>
        <div className="flex gap-2">
          <span className="px-2 py-1 text-[10px] font-medium rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">SQL</span>
          <span className="px-2 py-1 text-[10px] font-medium rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">Algorithms</span>
          <span className="px-2 py-1 text-[10px] font-medium rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400">Dynamic Programming</span>
        </div>
      </div>
    </motion.div>
  );
}

export default LeetCodeCard;
