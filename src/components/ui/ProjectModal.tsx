"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Zap, Target, Lightbulb, Code2, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

// Extended project data with detailed content
export interface ProjectDetails {
  id: number;
  slug: string;
  title: string;
  description: string;
  metric: string;
  metricIcon: string;
  metricColor: string;
  tags: string[];
  gradient: string;
  // Extended details for modal
  status: "Production" | "Prototype" | "In Development";
  challenge: string;
  solution: string;
  technologies: {
    name: string;
    category: string;
  }[];
  keyFeatures: string[];
  caseStudyUrl?: string;
  sourceUrl?: string;
}

// Detailed project data
export const projectDetails: ProjectDetails[] = [
  {
    id: 1,
    slug: "multi-cloud-showback-engine",
    title: "Multi-Cloud Showback Engine",
    description: "Architected a showback platform for Motorola Solutions to allocate costs across AWS, Azure, and GCP. Built a unified cost attribution system at namespace and environment level.",
    metric: "$1.5M+ Annual Savings",
    metricIcon: "💰",
    metricColor: "text-emerald-600",
    tags: ["PySpark", "Airflow", "BigQuery", "ADLS", "FinOps"],
    gradient: "from-emerald-600 via-teal-500 to-emerald-400",
    status: "Production",
    challenge: "Motorola Solutions was operating across AWS, Azure, and GCP with zero visibility into which teams were consuming shared cloud resources. Cost allocation was manual, inaccurate, and teams had no accountability for their consumption patterns across the multi-cloud environment.",
    solution: "Built an end-to-end showback engine that ingests billing data from all three clouds (AWS, Azure, GCP), correlates them with workload metadata, and allocates costs at the namespace and environment level. Created a unified view of cloud spend across the entire organization.",
    technologies: [
      { name: "PySpark", category: "Processing" },
      { name: "Apache Airflow", category: "Orchestration" },
      { name: "GCP BigQuery", category: "Data Warehouse" },
      { name: "Azure ADLS", category: "Data Lake" },
      { name: "Power BI", category: "Visualization" },
      { name: "Multi-Cloud", category: "AWS / Azure / GCP" },
    ],
    keyFeatures: [
      "Cost attribution at namespace and environment level",
      "Automated anomaly detection for spend spikes",
      "Self-service dashboards for entire organization",
      "Unified multi-cloud cost visibility",
    ],
    caseStudyUrl: "https://www.linkedin.com/in/dhwani-suthar/",
  },
  {
    id: 2,
    slug: "autonomous-finops-swarm",
    title: "Self-Correcting Cost Agent",
    description: "Engineered a Multi-Agent System (MAS) using LangGraph & Gemini to autonomously audit cloud bills and route tasks between 'Analyst' and 'Optimizer' agents.",
    metric: "99.9% Allocation Accuracy",
    metricIcon: "🤖",
    metricColor: "text-blue-600",
    tags: ["LangGraph", "Vertex AI", "Gemini", "Python"],
    gradient: "from-blue-600 via-cyan-500 to-blue-400",
    status: "Prototype",
    challenge: "Manual cloud cost auditing was taking analysts 20+ hours per week. Errors in cost allocation were common, and the feedback loop for identifying optimization opportunities was too slow to capture savings.",
    solution: "Designed a multi-agent architecture where specialized AI agents collaborate: an 'Analyst' agent parses billing data and detects anomalies, while an 'Optimizer' agent generates actionable recommendations. The system self-corrects based on feedback loops.",
    technologies: [
      { name: "LangGraph", category: "Agent Framework" },
      { name: "Gemini Pro", category: "LLM" },
      { name: "Vertex AI", category: "ML Platform" },
      { name: "Python", category: "Language" },
      { name: "Neo4j", category: "Graph Database" },
      { name: "FastAPI", category: "API Framework" },
    ],
    keyFeatures: [
      "Multi-agent collaboration with task routing",
      "Natural language querying of cloud costs",
      "Automated report generation and insights",
      "Continuous learning from analyst feedback",
    ],
    sourceUrl: "https://github.com/dhwani-suthar",
  },
  {
    id: 3,
    slug: "api-latency-optimization",
    title: "API Latency Optimization",
    description: "Reduced API P99 latency from 21 seconds to under 500ms by architecting an analyze layer over existing snapshot tables for AI productivity ROI tracking.",
    metric: "97% Latency Reduction",
    metricIcon: "⚡",
    metricColor: "text-violet-600",
    tags: ["SQL Server", "Azure", "Performance Tuning", "API"],
    gradient: "from-indigo-600 via-violet-500 to-purple-400",
    status: "Production",
    challenge: "Motorola Solutions needed to measure productivity gains and ROI from AI license investments across the organization. The existing API for calculating user productivity metrics had a P99 latency of 21 seconds - far too slow for real-time dashboards and decision-making.",
    solution: "Architected an analyze layer on top of the existing data model with snapshot tables. This pre-aggregation strategy eliminated expensive runtime calculations and allowed the API to serve pre-computed productivity metrics instantly, dropping P99 latency to under 500ms.",
    technologies: [
      { name: "SQL Server", category: "Database" },
      { name: "Azure SQL", category: "Cloud Database" },
      { name: "Snapshot Tables", category: "Architecture" },
      { name: "Analyze Layer", category: "Pre-aggregation" },
      { name: "REST APIs", category: "Integration" },
      { name: "Power BI", category: "Visualization" },
    ],
    keyFeatures: [
      "P99 latency reduced from 21s to <500ms",
      "Analyze layer architecture over snapshot tables",
      "AI license ROI tracking across MSI",
      "Real-time productivity metrics for decision-making",
    ],
    caseStudyUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7403078882502787072/",
  },
];

interface ProjectModalProps {
  project: ProjectDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
          >
            <div
              className={cn(
                "relative h-full w-full max-w-5xl mx-auto overflow-hidden rounded-2xl",
                // Glassmorphism
                "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl",
                "border border-zinc-200/50 dark:border-white/10",
                "shadow-2xl shadow-black/20 dark:shadow-black/50"
              )}
            >
              {/* Gradient Header Bar */}
              <div
                className={cn(
                  "h-2 w-full",
                  `bg-gradient-to-r ${project.gradient}`
                )}
              />

              {/* Scrollable Content */}
              <div className="h-[calc(100%-8px)] overflow-y-auto">
                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      {/* Status Badge */}
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                            project.status === "Production"
                              ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400"
                              : project.status === "Prototype"
                              ? "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400"
                              : "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400"
                          )}
                        >
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              project.status === "Production"
                                ? "bg-emerald-500"
                                : project.status === "Prototype"
                                ? "bg-amber-500"
                                : "bg-blue-500"
                            )}
                          />
                          {project.status}
                        </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">
                          Case Study
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                        {project.title}
                      </h2>

                      {/* Metric */}
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{project.metricIcon}</span>
                        <span
                          className={cn(
                            "text-lg font-bold",
                            project.metricColor,
                            "dark:brightness-125"
                          )}
                        >
                          {project.metric}
                        </span>
                      </div>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={onClose}
                      className={cn(
                        "p-2 rounded-full",
                        "bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20",
                        "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-white",
                        "transition-colors duration-200"
                      )}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                    {/* Left Column - Challenge & Solution */}
                    <div className="lg:col-span-3 space-y-6">
                      {/* The Challenge */}
                      <div
                        className={cn(
                          "p-5 rounded-xl",
                          "bg-red-50 dark:bg-red-500/10",
                          "border border-red-100 dark:border-red-500/20"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-500/20">
                            <Target className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                          <h3 className="font-semibold text-red-900 dark:text-red-300">
                            The Challenge
                          </h3>
                        </div>
                        <p className="text-sm text-red-800 dark:text-red-200/80 leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>

                      {/* The Solution */}
                      <div
                        className={cn(
                          "p-5 rounded-xl",
                          "bg-emerald-50 dark:bg-emerald-500/10",
                          "border border-emerald-100 dark:border-emerald-500/20"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20">
                            <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <h3 className="font-semibold text-emerald-900 dark:text-emerald-300">
                            The Solution
                          </h3>
                        </div>
                        <p className="text-sm text-emerald-800 dark:text-emerald-200/80 leading-relaxed">
                          {project.solution}
                        </p>
                      </div>

                      {/* Key Features */}
                      <div
                        className={cn(
                          "p-5 rounded-xl",
                          "bg-zinc-50 dark:bg-white/5",
                          "border border-zinc-100 dark:border-white/10"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-white/10">
                            <Zap className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                          </div>
                          <h3 className="font-semibold text-zinc-900 dark:text-white">
                            Key Features
                          </h3>
                        </div>
                        <ul className="space-y-2">
                          {project.keyFeatures.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300"
                            >
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column - Technologies & Architecture */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Technologies */}
                      <div
                        className={cn(
                          "p-5 rounded-xl",
                          "bg-zinc-50 dark:bg-white/5",
                          "border border-zinc-100 dark:border-white/10"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-white/10">
                            <Layers className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                          </div>
                          <h3 className="font-semibold text-zinc-900 dark:text-white">
                            Tech Stack
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {project.technologies.map((tech, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                {tech.name}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-white/10 text-zinc-500 dark:text-zinc-400">
                                {tech.category}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Architecture Placeholder */}
                      <div
                        className={cn(
                          "p-5 rounded-xl",
                          "bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-white/5 dark:to-white/[0.02]",
                          "border border-zinc-200 dark:border-white/10",
                          "border-dashed"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className="p-1.5 rounded-lg bg-zinc-200 dark:bg-white/10">
                            <Code2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                          </div>
                          <h3 className="font-semibold text-zinc-700 dark:text-zinc-300">
                            Architecture
                          </h3>
                        </div>
                        <div className="aspect-video bg-zinc-200/50 dark:bg-white/5 rounded-lg flex items-center justify-center">
                          <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center px-4">
                            Architecture diagram
                            <br />
                            <span className="text-zinc-300 dark:text-zinc-600">
                              (Coming Soon)
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className={cn(
                              "px-3 py-1.5 text-xs font-medium rounded-full",
                              "bg-zinc-100 dark:bg-white/10",
                              "text-zinc-600 dark:text-zinc-300",
                              "border border-zinc-200 dark:border-white/10"
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-wrap items-center gap-3 mt-8 pt-6 border-t border-zinc-200 dark:border-white/10">
                    {project.caseStudyUrl && (
                      <a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-2 px-5 py-2.5 rounded-full",
                          "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900",
                          "text-sm font-medium",
                          "hover:bg-zinc-800 dark:hover:bg-zinc-100",
                          "transition-colors duration-200"
                        )}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Read Case Study
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-2 px-5 py-2.5 rounded-full",
                          "bg-zinc-100 dark:bg-white/10 text-zinc-700 dark:text-zinc-300",
                          "text-sm font-medium",
                          "border border-zinc-200 dark:border-white/10",
                          "hover:bg-zinc-200 dark:hover:bg-white/20",
                          "transition-colors duration-200"
                        )}
                      >
                        <Github className="w-4 h-4" />
                        View Source
                      </a>
                    )}
                    <button
                      onClick={onClose}
                      className={cn(
                        "ml-auto px-5 py-2.5 rounded-full",
                        "text-sm font-medium text-zinc-500 dark:text-zinc-400",
                        "hover:text-zinc-700 dark:hover:text-zinc-200",
                        "hover:bg-zinc-100 dark:hover:bg-white/10",
                        "transition-colors duration-200"
                      )}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
