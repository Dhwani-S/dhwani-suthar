"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TechItem {
  name: string;
  slug: string;
  color: string;
  // Use devicon CDN for certain icons that don't work well with Simple Icons
  useDevicon?: boolean;
  deviconSlug?: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

// Helper to get icon URL
function getIconUrl(item: TechItem): string {
  if (item.useDevicon && item.deviconSlug) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.deviconSlug}/${item.deviconSlug}-original.svg`;
  }
  return `https://cdn.simpleicons.org/${item.slug}/${item.color}`;
}

// Skills data organized by category - Updated to match About page
export const techStackData: TechCategory[] = [
  {
    title: "Languages",
    items: [
      { name: "Python", slug: "python", color: "3776AB" },
      { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
      { name: "Oracle", slug: "oracle", color: "F80000", useDevicon: true, deviconSlug: "oracle" },
    ],
  },
  {
    title: "Cloud & Infra",
    items: [
      { name: "Google Cloud", slug: "googlecloud", color: "4285F4" },
      { name: "AWS", slug: "aws", color: "FF9900", useDevicon: true, deviconSlug: "amazonwebservices" },
      { name: "Azure", slug: "azure", color: "0078D4", useDevicon: true, deviconSlug: "azure" },
      { name: "Kubernetes", slug: "kubernetes", color: "326CE5" },
      { name: "Docker", slug: "docker", color: "2496ED" },
    ],
  },
  {
    title: "Data Processing",
    items: [
      { name: "Apache Spark", slug: "apachespark", color: "E25A1C" },
      { name: "Databricks", slug: "databricks", color: "FF3621" },
      { name: "Apache Airflow", slug: "apacheairflow", color: "017CEE" },
      { name: "Kafka", slug: "apachekafka", color: "231F20" },
    ],
  },
  {
    title: "Databases & AI",
    items: [
      { name: "BigQuery", slug: "googlebigquery", color: "669DF6" },
      { name: "Snowflake", slug: "snowflake", color: "29B5E8" },
      { name: "Neo4j", slug: "neo4j", color: "4581C3" },
      { name: "LangChain", slug: "langchain", color: "1C3C3C" },
    ],
  },
  {
    title: "FinOps",
    items: [
      { name: "Cost Allocation", slug: "null", color: "10B981" },
      { name: "Chargeback", slug: "null", color: "10B981" },
      { name: "Showback", slug: "null", color: "10B981" },
      { name: "Anomaly Detection", slug: "null", color: "10B981" },
      { name: "Unit Economics", slug: "null", color: "10B981" },
    ],
  },
];

// Single tech item component
function TechItemCard({ item, index }: { item: TechItem; index: number }) {
  const hasIcon = item.slug !== "null";
  const iconUrl = getIconUrl(item);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group flex items-center gap-3 p-3 rounded-xl",
        "bg-secondary/30 hover:bg-secondary/60",
        "border border-transparent hover:border-border/50",
        "transition-all duration-300 cursor-default"
      )}
    >
      {hasIcon ? (
        <div className="relative w-8 h-8 flex-shrink-0">
          <Image
            src={iconUrl}
            alt={item.name}
            width={32}
            height={32}
            className="transition-transform duration-300 group-hover:scale-110"
            unoptimized
          />
        </div>
      ) : (
        <div 
          className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: `#${item.color}20`, color: `#${item.color}` }}
        >
          {item.name.charAt(0)}
        </div>
      )}
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        {item.name}
      </span>
    </motion.div>
  );
}

// Category section component
function TechCategory({ category, categoryIndex }: { category: TechCategory; categoryIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: categoryIndex * 0.1 }}
      className="space-y-3"
    >
      <h3 className="text-sm font-semibold text-foreground px-1">
        {category.title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {category.items.map((item, index) => (
          <TechItemCard key={item.name} item={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

// Main TechStackGrid component
interface TechStackGridProps {
  className?: string;
  compact?: boolean;
}

export function TechStackGrid({ className, compact = false }: TechStackGridProps) {
  if (compact) {
    // Flat grid for compact display (e.g., in BentoGrid)
    // Select key technologies for compact view
    const compactItems: TechItem[] = [
      { name: "Python", slug: "python", color: "3776AB" },
      { name: "SQL", slug: "postgresql", color: "4169E1" },
      { name: "Oracle", slug: "oracle", color: "F80000", useDevicon: true, deviconSlug: "oracle" },
      { name: "Google Cloud", slug: "googlecloud", color: "4285F4" },
      { name: "AWS", slug: "aws", color: "FF9900", useDevicon: true, deviconSlug: "amazonwebservices" },
      { name: "Kubernetes", slug: "kubernetes", color: "326CE5" },
      { name: "Docker", slug: "docker", color: "2496ED" },
      { name: "Apache Spark", slug: "apachespark", color: "E25A1C" },
    ];
    
    return (
      <div className={cn("grid grid-cols-4 gap-2", className)}>
        {compactItems.map((item, index) => {
          const hasIcon = item.slug !== "null";
          const iconUrl = getIconUrl(item);
          
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border/50 transition-all cursor-default group"
            >
              {hasIcon ? (
                <Image
                  src={iconUrl}
                  alt={item.name}
                  width={28}
                  height={28}
                  className="mb-2 transition-transform duration-300 group-hover:scale-110"
                  unoptimized
                />
              ) : (
                <div 
                  className="w-7 h-7 mb-2 rounded-md flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: `#${item.color}20`, color: `#${item.color}` }}
                >
                  {item.name.charAt(0)}
                </div>
              )}
              <span className="text-xs text-muted-foreground text-center font-medium group-hover:text-foreground transition-colors line-clamp-1">
                {item.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Full categorized grid for About page
  return (
    <div className={cn("space-y-6", className)}>
      {techStackData.map((category, index) => (
        <TechCategory key={category.title} category={category} categoryIndex={index} />
      ))}
    </div>
  );
}

export default TechStackGrid;
