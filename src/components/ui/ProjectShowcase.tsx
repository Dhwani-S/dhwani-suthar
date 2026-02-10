"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, PieChart } from "lucide-react";

/**
 * Project Showcase - Horizontal project cards with icons
 */
const featuredProjects = [
  {
    id: 1,
    slug: "multi-cloud-finops-engine",
    title: "Multi-Cloud FinOps Engine",
    description:
      "Architected a chargeback platform for Motorola Solutions to allocate shared Kubernetes costs. Built a recommendation engine identifying idle resources across AWS, GCP, and Azure.",
    metric: {
      value: "$1.5M+",
      label: "Annual Savings",
    },
    tags: ["PySpark", "Airflow", "GCP BigQuery", "FinOps"],
    icon: PieChart,
    color: "emerald",
    pattern: "finops",
  },
  {
    id: 2,
    slug: "autonomous-finops-swarm",
    title: "Autonomous FinOps Swarm",
    description:
      "Engineered a Multi-Agent System (MAS) using LangGraph that routes tasks between 'Analyst' and 'Optimizer' agents to audit cloud bills autonomously with 99.9% accuracy.",
    metric: {
      value: "99.9%",
      label: "Allocation Accuracy",
    },
    tags: ["LangGraph", "Vertex AI", "Gemini", "Python"],
    icon: Zap,
    color: "blue",
    pattern: "streaming",
  },
];

interface ProjectCardProps {
  project: (typeof featuredProjects)[0];
  index: number;
  reverse?: boolean;
}

function ProjectCard({ project, index, reverse }: ProjectCardProps) {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div
          className={`
            group bg-white border border-zinc-100 rounded-2xl overflow-hidden
            hover:shadow-xl hover:border-zinc-200 transition-all duration-300
            grid md:grid-cols-2 gap-0
          `}
        >
          {/* Visual Side with Pattern */}
          <div
            className={`
              relative h-64 md:h-80 overflow-hidden
              ${project.color === "emerald" ? "bg-emerald-50" : "bg-blue-50"}
              ${reverse ? "md:order-2" : "md:order-1"}
            `}
          >
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  project.pattern === "streaming"
                    ? `linear-gradient(90deg, transparent 24px, rgba(59, 130, 246, 0.1) 25px, transparent 26px),
                       linear-gradient(180deg, transparent 24px, rgba(59, 130, 246, 0.1) 25px, transparent 26px)`
                    : `radial-gradient(circle, rgba(16, 185, 129, 0.15) 1px, transparent 1px)`,
                backgroundSize: project.pattern === "streaming" ? "25px 25px" : "20px 20px",
              }}
            />

            {/* Floating Elements for Streaming */}
            {project.pattern === "streaming" && (
              <>
                <motion.div
                  className="absolute top-8 left-8 w-2 h-2 rounded-full bg-blue-400"
                  animate={{ x: [0, 200], opacity: [1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-16 left-12 w-1.5 h-1.5 rounded-full bg-blue-300"
                  animate={{ x: [0, 180], opacity: [1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.3 }}
                />
                <motion.div
                  className="absolute top-24 left-6 w-2 h-2 rounded-full bg-blue-500"
                  animate={{ x: [0, 220], opacity: [1, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
                />
              </>
            )}

            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className={`
                  w-24 h-24 rounded-2xl flex items-center justify-center
                  ${project.color === "emerald" ? "bg-emerald-100" : "bg-blue-100"}
                  group-hover:scale-110 transition-transform duration-500
                `}
                whileHover={{ rotate: 5 }}
              >
                <Icon
                  className={`w-10 h-10 ${
                    project.color === "emerald" ? "text-emerald-600" : "text-blue-600"
                  }`}
                  strokeWidth={1.5}
                />
              </motion.div>
            </div>

            {/* Corner Decorations */}
            <div
              className={`absolute bottom-4 right-4 w-16 h-16 rounded-xl ${
                project.color === "emerald" ? "bg-emerald-200/50" : "bg-blue-200/50"
              }`}
            />
            <div
              className={`absolute top-4 left-4 w-8 h-8 rounded-lg ${
                project.color === "emerald" ? "bg-emerald-200/30" : "bg-blue-200/30"
              }`}
            />
          </div>

          {/* Content Side */}
          <div
            className={`
              p-8 md:p-10 flex flex-col justify-center
              ${reverse ? "md:order-1" : "md:order-2"}
            `}
          >
            {/* Metric Badge */}
            <div
              className={`
                inline-flex items-baseline gap-2 mb-4 w-fit
                px-3 py-1.5 rounded-full
                ${project.color === "emerald" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}
              `}
            >
              <span className="text-xl font-bold">{project.metric.value}</span>
              <span className="text-xs font-medium">{project.metric.label}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-zinc-800 mb-3 group-hover:text-zinc-900 transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-100 text-zinc-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link */}
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-800 group-hover:text-zinc-900 group-hover:gap-3 transition-all">
              View Case Study
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ProjectShowcase() {
  return (
    <div className="space-y-8">
      {featuredProjects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          reverse={index % 2 === 1}
        />
      ))}
    </div>
  );
}

export default ProjectShowcase;
