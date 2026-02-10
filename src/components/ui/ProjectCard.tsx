"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PostMetadata } from "@/lib/mdx";

interface ProjectCardProps {
  project: PostMetadata;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "group block h-full overflow-hidden rounded-2xl border border-border bg-card",
          "transition-all duration-300",
          "hover:border-border/80 hover:shadow-xl hover:shadow-primary/5"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            {project.featured && (
              <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Featured
              </span>
            )}
            <span className="text-sm text-muted-foreground ml-auto">
              {new Date(project.date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h2>

          {/* Summary */}
          <p className="text-muted-foreground mb-5 line-clamp-2 flex-1">
            {project.summary}
          </p>

          {/* Key Metrics Section */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-5 p-4 rounded-xl bg-secondary/50 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Key Metrics
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {project.metrics.slice(0, 4).map((metric, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-lg font-bold text-emerald-500">
                      {metric.value}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary text-muted-foreground">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all mt-auto">
            View case study <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Compact version for sidebars or smaller spaces
export function ProjectCardCompact({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "group flex items-start gap-4 p-4 rounded-xl",
          "border border-transparent hover:border-border hover:bg-card",
          "transition-all duration-200"
        )}
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
            {project.summary}
          </p>
          {/* Single highlight metric */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-2 inline-flex items-center gap-1">
              <span className="text-sm font-bold text-emerald-500">
                {project.metrics[0].value}
              </span>
              <span className="text-xs text-muted-foreground">
                {project.metrics[0].label}
              </span>
            </div>
          )}
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
      </Link>
    </motion.div>
  );
}

export default ProjectCard;
