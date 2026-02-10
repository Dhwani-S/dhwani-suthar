"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TechIcon {
  name: string;
  slug: string;
  color: string;
  // Use devicon CDN for certain icons that don't work well with Simple Icons
  useDevicon?: boolean;
  deviconSlug?: string;
  deviconVariant?: string; // e.g., "original", "plain", "original-wordmark"
  // Use local image from public folder
  useLocalImage?: boolean;
  localPath?: string;
}

// All tech icons with brand colors - ordered by importance
const techIcons: TechIcon[] = [
  // Core Languages
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "SQL", slug: "postgresql", color: "4169E1" },
  { name: "Java", slug: "java", color: "007396", useDevicon: true, deviconSlug: "java" },
  { name: "Scala", slug: "scala", color: "DC322F", useDevicon: true, deviconSlug: "scala" },
  // Data Processing (Core)
  { name: "PySpark", slug: "apachespark", color: "E25A1C" },
  { name: "Apache Airflow", slug: "apacheairflow", color: "017CEE", useLocalImage: true, localPath: "/logos/airflow.png" },
  { name: "Kafka", slug: "apachekafka", color: "231F20" },
  { name: "Databricks", slug: "databricks", color: "FF3621" },
  { name: "DBT", slug: "dbt", color: "FF694B" },
  // Cloud Platforms (Multi-Cloud Expert)
  { name: "Google Cloud", slug: "googlecloud", color: "4285F4" },
  { name: "AWS", slug: "aws", color: "FF9900", useLocalImage: true, localPath: "/logos/aws.png" },
  { name: "Azure", slug: "azure", color: "0078D4", useDevicon: true, deviconSlug: "azure" },
  // Infrastructure
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Kubernetes", slug: "kubernetes", color: "326CE5" },
  // AI/ML & Databases
  { name: "LangChain", slug: "langchain", color: "1C3C3C" },
  { name: "Neo4j", slug: "neo4j", color: "4581C3" },
  { name: "BigQuery", slug: "googlebigquery", color: "669DF6" },
  { name: "Oracle", slug: "oracle", color: "F80000", useDevicon: true, deviconSlug: "oracle" },
];

function IconWithTooltip({ icon, index }: { icon: TechIcon; index: number }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Use local image, Devicon CDN, or Simple Icons
  const deviconVariant = icon.deviconVariant || "original";
  const iconUrl = icon.useLocalImage && icon.localPath
    ? icon.localPath
    : icon.useDevicon
      ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon.deviconSlug}/${icon.deviconSlug}-${deviconVariant}.svg`
      : `https://cdn.simpleicons.org/${icon.slug}/${icon.color}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <motion.div
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          // Light clean background
          "bg-gray-50 dark:bg-zinc-800/60",
          "border border-gray-100 dark:border-zinc-700/50",
          "shadow-sm hover:shadow-md",
          "transition-all duration-200 cursor-default group"
        )}
      >
        {hasError ? (
          // Fallback: Show initials with brand color
          <span 
            className="text-[10px] font-bold"
            style={{ color: `#${icon.color}` }}
          >
            {icon.name.slice(0, 3).toUpperCase()}
          </span>
        ) : (
          <Image
            src={iconUrl}
            alt={icon.name}
            width={22}
            height={22}
            className="transition-transform duration-300 group-hover:scale-110"
            unoptimized
            onError={() => setHasError(true)}
          />
        )}
      </motion.div>

      {/* Tooltip - centered above icon */}
      {showTooltip && (
        <div
          className={cn(
            "absolute bottom-full left-1/2 mb-2 z-50",
            "px-2.5 py-1 rounded-md",
            "bg-gray-900 text-white",
            "text-xs font-medium whitespace-nowrap",
            "pointer-events-none",
            "shadow-lg",
            // Center the tooltip
            "-translate-x-1/2"
          )}
        >
          {icon.name}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

interface MicroIconGridProps {
  className?: string;
}

export function MicroIconGrid({ className }: MicroIconGridProps) {
  return (
    <div className={cn("grid grid-cols-5 gap-2", className)}>
      {techIcons.map((icon, index) => (
        <IconWithTooltip key={icon.slug} icon={icon} index={index} />
      ))}
    </div>
  );
}

export default MicroIconGrid;
