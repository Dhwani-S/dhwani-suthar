"use client";

import { motion } from "framer-motion";
import { 
  Terminal, 
  Layers, 
  Users, 
  TrendingUp,
  ChevronRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Milestone {
  id: number;
  phase: string;
  title: string;
  description: string;
  icon: typeof Terminal;
  color: string;
  textColor: string;
  borderColor: string;
  status: "completed" | "current" | "future";
}

const milestones: Milestone[] = [
  {
    id: 1,
    phase: "2 Years",
    title: "The Foundation",
    description: "Mastered Data Engineering & FinOps basics across GCP/AWS/Azure.",
    icon: Terminal,
    color: "bg-emerald-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-500",
    status: "completed",
  },
  {
    id: 2,
    phase: "4 Years",
    title: "The Expansion",
    description: "Achieving the 'Cloud Trifecta'. Deepening Multi-Cloud Architecture expertise.",
    icon: Layers,
    color: "bg-blue-500",
    textColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-400",
    status: "current",
  },
  {
    id: 3,
    phase: "7 Years",
    title: "The Leadership",
    description: "Staff/Principal Architect. Mentoring the next generation of builders.",
    icon: Users,
    color: "bg-purple-500",
    textColor: "text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-400",
    status: "future",
  },
  {
    id: 4,
    phase: "15 Years",
    title: "Organizational Scale",
    description: "Leading the convergence of Engineering, Finance, and Product. Building the backbone of profitable tech companies.",
    icon: TrendingUp,
    color: "bg-amber-500",
    textColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-400",
    status: "future",
  },
];

// Desktop: Horizontal Pipeline Node
function HorizontalNode({ milestone, index }: { milestone: Milestone; index: number }) {
  const Icon = milestone.icon;
  const isAbove = index % 2 === 0;
  const isLast = index === milestones.length - 1;

  return (
    <div className="relative flex-1 flex flex-col items-center">
      {/* Content - Above or Below based on index */}
      <motion.div
        initial={{ opacity: 0, y: isAbove ? 10 : -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.4 }}
        className={cn(
          "absolute w-full max-w-[200px] px-2 text-center",
          isAbove ? "bottom-full mb-4" : "top-full mt-4"
        )}
      >
        {/* Phase Badge */}
        <span className={cn(
          "inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest mb-1",
          milestone.status === "current" ? milestone.textColor : 
          milestone.status === "completed" ? "text-emerald-600 dark:text-emerald-400" :
          "text-gray-400 dark:text-zinc-500"
        )}>
          {milestone.status === "current" && (
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-blue-500"
            />
          )}
          {milestone.phase}
        </span>
        
        {/* Title */}
        <h4 className={cn(
          "text-xs font-bold uppercase tracking-wider mb-1",
          "text-gray-800 dark:text-white"
        )}>
          {milestone.title}
        </h4>
        
        {/* Description */}
        <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-tight">
          {milestone.description}
        </p>
      </motion.div>

      {/* Node */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.15 }}
        className="relative z-10"
      >
        {milestone.status === "completed" ? (
          // Completed Node - Solid filled with checkmark
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            "bg-emerald-500",
            "border-2 border-emerald-400"
          )}>
            <Check className="w-5 h-5 text-white" strokeWidth={3} />
          </div>
        ) : milestone.status === "current" ? (
          // Current Node - Pulsing Blue
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 w-10 h-10 rounded-full bg-blue-500 opacity-30"
            />
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 15px rgba(59,130,246,0.4)",
                  "0 0 25px rgba(59,130,246,0.6)",
                  "0 0 15px rgba(59,130,246,0.4)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-gradient-to-br from-blue-400 to-cyan-500",
                "border-2 border-white dark:border-blue-300"
              )}
            >
              <Icon className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        ) : (
          // Future Nodes - Hollow with hover glow
          <motion.div
            whileHover={{ boxShadow: `0 0 20px ${milestone.color.includes('purple') ? 'rgba(168,85,247,0.5)' : 'rgba(251,191,36,0.5)'}` }}
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              "border-2 transition-all duration-300",
              milestone.borderColor,
              "bg-white dark:bg-zinc-900",
              "hover:bg-gray-50 dark:hover:bg-zinc-800"
            )}
          >
            <Icon className={cn("w-4 h-4", milestone.textColor)} />
          </motion.div>
        )}
      </motion.div>

      {/* Connector Line to Next Node */}
      {!isLast && (
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-full h-[2px] z-0">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
            className="origin-left w-full h-full"
          >
            {/* Solid line for completed, dashed for future */}
            {milestone.status === "completed" ? (
              <div className="w-full h-full bg-emerald-500" />
            ) : (
              <div 
                className="w-full h-full"
                style={{
                  background: `repeating-linear-gradient(90deg, 
                    ${milestone.status === "current" ? '#3B82F6' : '#8B5CF6'} 0px, 
                    ${milestone.status === "current" ? '#3B82F6' : '#8B5CF6'} 8px, 
                    transparent 8px, 
                    transparent 16px)`
                }}
              />
            )}
          </motion.div>
          
          {/* Flow arrow */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.5 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1"
          >
            <ChevronRight className={cn("w-3 h-3", 
              milestone.status === "completed" ? "text-emerald-500" : milestone.textColor
            )} />
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Mobile: Vertical Stack Node
function VerticalNode({ milestone, index }: { milestone: Milestone; index: number }) {
  const Icon = milestone.icon;
  const isLast = index === milestones.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative flex items-start gap-4 pl-2"
    >
      {/* Vertical Line */}
      {!isLast && (
        <div className="absolute left-[18px] top-10 bottom-0 w-[2px] -mb-4">
          {milestone.status === "completed" ? (
            <div className="w-full h-full bg-emerald-500" />
          ) : (
            <div 
              className="w-full h-full"
              style={{
                background: `repeating-linear-gradient(180deg, 
                  ${milestone.status === "current" ? '#3B82F6' : '#8B5CF6'} 0px, 
                  ${milestone.status === "current" ? '#3B82F6' : '#8B5CF6'} 6px, 
                  transparent 6px, 
                  transparent 12px)`
              }}
            />
          )}
        </div>
      )}

      {/* Node */}
      <div className="relative z-10 flex-shrink-0">
        {milestone.status === "completed" ? (
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            "bg-emerald-500 border-2 border-emerald-400"
          )}>
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
        ) : milestone.status === "current" ? (
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 10px rgba(59,130,246,0.4)",
                "0 0 20px rgba(59,130,246,0.6)",
                "0 0 10px rgba(59,130,246,0.4)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              "bg-gradient-to-br from-blue-400 to-cyan-500",
              "border-2 border-white"
            )}
          >
            <Icon className="w-3.5 h-3.5 text-white" />
          </motion.div>
        ) : (
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            "border-2 bg-white dark:bg-zinc-900",
            milestone.borderColor
          )}>
            <Icon className={cn("w-3.5 h-3.5", milestone.textColor)} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <span className={cn(
          "inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest",
          milestone.status === "current" ? milestone.textColor : 
          milestone.status === "completed" ? "text-emerald-600 dark:text-emerald-400" :
          "text-gray-400"
        )}>
          {milestone.status === "current" && (
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-blue-500"
            />
          )}
          {milestone.phase}
        </span>
        <h4 className="text-sm font-bold text-gray-800 dark:text-white">
          {milestone.title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed mt-0.5">
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
}

export function ArchitecturalBlueprint() {
  return (
    <div className="space-y-6">
      {/* Glass Panel Container */}
      <div className={cn(
        "rounded-2xl p-6 md:p-8",
        "bg-gray-50/50 dark:bg-zinc-800/30",
        "border border-gray-100 dark:border-zinc-700/50",
        "backdrop-blur-sm"
      )}>
        
        {/* Desktop: Horizontal Pipeline */}
        <div className="hidden md:block">
          <div className="relative pt-24 pb-28">
            {/* Nodes Container - positioned first to establish the node positions */}
            <div className="relative flex items-center justify-between px-4">
              {/* Background horizontal line - aligned with nodes */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-200 dark:bg-zinc-700 rounded-full z-0" />
              
              {milestones.map((milestone, index) => (
                <HorizontalNode key={milestone.id} milestone={milestone} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Stack */}
        <div className="md:hidden">
          {milestones.map((milestone, index) => (
            <VerticalNode key={milestone.id} milestone={milestone} index={index} />
          ))}
        </div>
      </div>

      {/* Terminal-style Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <p className="font-mono text-xs md:text-sm text-gray-400 dark:text-zinc-500">
          <span className="text-emerald-600 dark:text-emerald-500">{"// "}</span>
          <span>This is the architecture I&apos;ve drafted, but I remain </span>
          <span className="text-blue-600 dark:text-blue-400 font-medium">agile</span>
          <span>.</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-1.5 h-3 bg-emerald-500 ml-1 align-middle"
          />
        </p>
      </motion.div>
    </div>
  );
}

export default ArchitecturalBlueprint;
