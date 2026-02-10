"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Cloud, 
  Layers, 
  Crown,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Cpu;
  iconBg: string;
  iconColor: string;
  period: string;
  isCurrent?: boolean;
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    title: "Now",
    subtitle: "FinOps Specialist",
    description: "Deepening GKE/Spark mastery & multi-cloud cost optimization",
    icon: Cpu,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    period: "Current",
    isCurrent: true,
  },
  {
    id: 2,
    title: "Next 18 Months",
    subtitle: "The Trifecta",
    description: "Azure + AWS + GCP Architect Certifications",
    icon: Cloud,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    period: "2026-2027",
  },
  {
    id: 3,
    title: "Year 3",
    subtitle: "Staff Data Architect",
    description: "Designing end-to-end multi-cloud systems",
    icon: Layers,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    period: "2028",
  },
  {
    id: 4,
    title: "Year 5",
    subtitle: "Principal Architect",
    description: "Bridging Business Strategy & Engineering",
    icon: Crown,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    period: "2030",
  },
];

function StepCard({ step, index, total }: { step: RoadmapStep; index: number; total: number }) {
  const isLast = index === total - 1;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="relative flex-1"
    >
      {/* Card */}
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        className={cn(
          "relative p-4 rounded-xl border transition-all duration-300 h-full",
          "bg-white dark:bg-zinc-800/50",
          step.isCurrent 
            ? "border-emerald-300 dark:border-emerald-500/40 shadow-md shadow-emerald-100 dark:shadow-emerald-500/10" 
            : "border-gray-200 dark:border-zinc-700/50 opacity-75 hover:opacity-100 hover:border-gray-300"
        )}
      >
        {/* Current Indicator */}
        {step.isCurrent && (
          <div className="absolute -top-2 -right-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-white" />
            </motion.div>
          </div>
        )}

        {/* Period Badge */}
        <div className={cn(
          "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3",
          step.isCurrent 
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" 
            : "bg-gray-100 text-gray-600 dark:bg-zinc-700/50 dark:text-zinc-400"
        )}>
          {step.period}
        </div>

        {/* Icon */}
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
          step.iconBg
        )}>
          <step.icon className={cn("w-5 h-5", step.iconColor)} />
        </div>

        {/* Content */}
        <h4 className={cn(
          "text-sm font-bold mb-0.5 text-gray-900 dark:text-zinc-100",
          step.isCurrent && "text-emerald-700 dark:text-emerald-400"
        )}>
          {step.title}
        </h4>
        <p className={cn(
          "text-xs font-semibold mb-2",
          step.iconColor
        )}>
          {step.subtitle}
        </p>
        <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-relaxed">
          {step.description}
        </p>
      </motion.div>

      {/* Connector Arrow (Desktop) */}
      {!isLast && (
        <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
          <ArrowRight className={cn(
            "w-5 h-5",
            step.isCurrent ? "text-emerald-500" : "text-gray-300 dark:text-zinc-600"
          )} />
        </div>
      )}
    </motion.div>
  );
}

export function ArchitectRoadmap() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Layers className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-foreground">
            The Path to Architect
          </h3>
          <p className="text-[10px] text-gray-500 dark:text-muted-foreground uppercase tracking-wider">
            5-Year Career Vision
          </p>
        </div>
      </motion.div>

      {/* Progress Track */}
      <div className="relative">
        {/* Background Track */}
        <div className="h-2 rounded-full bg-gray-100 dark:bg-zinc-800/80 overflow-hidden">
          {/* Progress Fill */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "25%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"
          />
        </div>
        {/* Milestone Dots */}
        <div className="absolute inset-x-0 top-0 flex justify-between items-center h-2">
          {roadmapSteps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={cn(
                "w-3 h-3 rounded-full border-2",
                i === 0 
                  ? "bg-emerald-500 border-emerald-300 shadow-md shadow-emerald-500/50" 
                  : "bg-white dark:bg-zinc-700 border-gray-300 dark:border-zinc-600"
              )}
            />
          ))}
        </div>
      </div>

      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 pt-2">
        {roadmapSteps.map((step, index) => (
          <StepCard 
            key={step.id} 
            step={step} 
            index={index} 
            total={roadmapSteps.length}
          />
        ))}
      </div>
    </div>
  );
}

export default ArchitectRoadmap;
