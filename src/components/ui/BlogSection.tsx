"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Database, ChevronRight, Flame, TrendingDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { MotionWrapper } from "./MotionWrapper";

/**
 * BlogSection - 3-Card Row Layout with Split Sidebar
 * Left (2 cols): Hero + 3 Topic Cards | Right (1 col): Best Of + Certifications
 */

// Featured Article
const featuredArticle = {
  title: "How to burn a hole in your Cloud Budget",
  subtitle: "Fixing a 4-hour SQL timeout in 2 minutes using execution plan analysis. A deep dive into non-SARGable predicates and index seek restoration.",
  tags: ["FinOps", "Azure", "SQL"],
  date: "Feb 10, 2026",
  readTime: "3 min",
  href: "https://www.linkedin.com/feed/update/urn:li:activity:7403078882502787072/",
};

// Small Cards - 2 cards for left column
const smallCards = [
  {
    id: 1,
    title: "Scaling Spark",
    subtitle: "Memory management and partitioning for petabyte-scale processing.",
    tag: "BigData",
    href: "https://www.linkedin.com/posts/dhwani-suthar_dataengineering-apachespark-bigdata-activity-7421183389669556224-dd3l",
    icon: Sparkles,
    iconColor: "text-orange-500",
    accentGradient: "from-orange-500 to-amber-500",
  },
  {
    id: 2,
    title: "DataOps Reliability",
    subtitle: "Implementing DataOps for bulletproof system resilience.",
    tag: "DataOps",
    href: "https://www.linkedin.com/posts/dhwani-suthar_dataops-reliabilityengineering-distributedsystems-activity-7418253501585276928-sp63",
    icon: Database,
    iconColor: "text-blue-500",
    accentGradient: "from-cyan-500 to-blue-500",
  },
];

// Delta Lake card for right sidebar
const deltaLakeCard = {
  id: 3,
  title: "Delta Lake Speed",
  subtitle: "Z-Ordering, compaction, and file skipping techniques.",
  tag: "Optimization",
  href: "https://www.linkedin.com/posts/dhwani-suthar_dataengineering-deltalake-optimization-activity-7415765617539977217-rTAe",
  icon: Zap,
  iconColor: "text-emerald-500",
  accentGradient: "from-emerald-500 to-teal-500",
};

// Curated List - Compact for split sidebar
const curatedList = [
  { title: "Big Data Architecture Patterns", href: "https://www.linkedin.com/feed/update/urn:li:activity:7412833153356136448/" },
  { title: "FinOps Strategy Guide", href: "https://www.linkedin.com/feed/update/urn:li:activity:7405872418105540608/" },
  { title: "Cloud Cost Optimization", href: "https://medium.com/@dhwani.suthar26" },
  { title: "Data Pipeline Best Practices", href: "https://medium.com/@dhwani.suthar26" },
];


// Shared card styles
const cardStyles = cn(
  "rounded-2xl",
  "bg-white border border-zinc-200 shadow-sm",
  "dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-sm",
  "hover:shadow-lg hover:-translate-y-0.5",
  "dark:hover:bg-white/[0.07] dark:hover:border-white/20",
  "transition-all duration-300"
);

// Hero Card - Stacked Layout (flex-col), Full Width Text, Chart at Bottom
function HeroCard() {
  return (
    <motion.a
      href={featuredArticle.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(cardStyles, "group relative flex-1 overflow-hidden flex flex-col")}
    >
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

      {/* Main Content - Full Width Text */}
      <div className="relative p-6 flex-1">
        {/* Badge Row */}
        <div className="flex items-center gap-3 mb-4">
          <span className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
            "bg-amber-100 text-amber-700 border border-amber-200",
            "dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30",
            "text-[10px] font-bold tracking-wider uppercase"
          )}>
            <Flame className="w-3 h-3" />
            Featured
          </span>
          <span className="text-xs font-mono text-zinc-400">
            {featuredArticle.date} • {featuredArticle.readTime}
          </span>
        </div>

        {/* Title - LARGE and BOLD, Full Width */}
        <h3 className={cn(
          "text-2xl md:text-3xl font-extrabold leading-tight mb-3",
          "text-zinc-900 dark:text-white",
          "group-hover:text-amber-600 dark:group-hover:text-amber-400",
          "transition-colors"
        )}>
          <span className="mr-2">📉</span>
          {featuredArticle.title}
        </h3>

        {/* Subtitle - Full Width */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
          {featuredArticle.subtitle}
        </p>

        {/* Tags + CTA Row */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {featuredArticle.tags.map((tag) => (
              <span 
                key={tag} 
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium",
                  "bg-zinc-100 text-zinc-600",
                  "dark:bg-zinc-800 dark:text-zinc-400"
                )}
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className={cn(
            "flex items-center gap-2 text-sm font-medium",
            "text-zinc-500 group-hover:text-amber-600",
            "dark:text-zinc-400 dark:group-hover:text-amber-400",
            "transition-colors"
          )}>
            <span>Read on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>

      {/* Footer Graphic - Code-Drawn SVG CPU Graph */}
      <div className="relative h-36 border-t border-zinc-100 dark:border-white/5 overflow-hidden rounded-b-2xl bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900/50 dark:to-zinc-900">
        {/* Horizontal Grid Lines */}
        <div className="absolute inset-x-0 top-[20%] border-t border-zinc-200/50 dark:border-white/5" />
        <div className="absolute inset-x-0 top-[40%] border-t border-zinc-200/50 dark:border-white/5" />
        <div className="absolute inset-x-0 top-[60%] border-t border-zinc-200/50 dark:border-white/5" />
        <div className="absolute inset-x-0 top-[80%] border-t border-zinc-200/50 dark:border-white/5" />
        
        {/* Metric overlay */}
        <div className="absolute top-3 right-4 z-20 flex items-center gap-3">
          <TrendingDown className="w-5 h-5 text-red-500" />
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm font-bold">
              <span className="text-red-500 line-through">4 hrs</span>
              <span className="text-zinc-400">→</span>
              <span className="text-emerald-600 dark:text-emerald-400">2 min</span>
            </div>
            <p className="text-[10px] text-zinc-400 font-mono">Query Runtime</p>
          </div>
        </div>

        {/* The SVG Graph */}
        <svg 
          viewBox="0 0 400 100" 
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="cpuGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            {/* Glow filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Fill Area (The story: High CPU -> Drop -> Low CPU) */}
          <path
            d="M 0,8 
               L 40,8 
               C 50,8 55,10 60,12
               L 80,18
               C 90,22 100,35 110,55
               L 130,75
               C 140,82 150,88 170,90
               L 400,90
               L 400,100
               L 0,100
               Z"
            fill="url(#cpuGradient)"
          />

          {/* Line (The actual graph line) */}
          <path
            d="M 0,8 
               L 40,8 
               C 50,8 55,10 60,12
               L 80,18
               C 90,22 100,35 110,55
               L 130,75
               C 140,82 150,88 170,90
               L 400,90"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          {/* Critical Point Marker (The moment of the fix) */}
          <circle cx="150" cy="88" r="4" fill="#3b82f6" className="animate-pulse" />
        </svg>

        {/* Time Labels */}
        <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[9px] font-mono text-zinc-400 dark:text-zinc-600">
          <span>09:00</span>
          <span className="text-red-500 font-semibold">09:45 ⚠️</span>
          <span className="text-emerald-500 font-semibold">10:15 ✓</span>
          <span>11:00</span>
        </div>

        {/* Y-Axis Labels */}
        <div className="absolute top-2 left-2 bottom-6 flex flex-col justify-between text-[8px] font-mono text-zinc-400 dark:text-zinc-600">
          <span>95%</span>
          <span>50%</span>
          <span>5%</span>
        </div>
      </div>
    </motion.a>
  );
}

// Small Card Component - Compact for 3-column layout
function SmallCard({ card, index }: { card: typeof smallCards[0]; index: number }) {
  const Icon = card.icon;

  return (
    <motion.a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
      className={cn(cardStyles, "group relative h-full overflow-hidden flex flex-col")}
    >
      {/* Top Accent */}
      <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", card.accentGradient)} />

      <div className="p-4 flex flex-col h-full">
        {/* Header: Icon + Tag */}
        <div className="flex items-start justify-between mb-2">
          <div className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center",
            "bg-zinc-100 dark:bg-zinc-800",
            "group-hover:scale-110 transition-transform"
          )}>
            <Icon className={cn("w-4 h-4", card.iconColor)} />
          </div>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-[9px] font-medium",
            "bg-zinc-100 text-zinc-500",
            "dark:bg-zinc-800 dark:text-zinc-400"
          )}>
            #{card.tag}
          </span>
        </div>

        {/* Title - Truncate if needed */}
        <h4 className={cn(
          "text-sm font-bold mb-1.5 leading-snug truncate",
          "text-zinc-900 dark:text-white",
          "group-hover:text-blue-600 dark:group-hover:text-cyan-400",
          "transition-colors"
        )}>
          {card.title}
        </h4>

        {/* Subtitle - 2 lines max */}
        <p className="text-[11px] text-zinc-500 dark:text-zinc-500 flex-1 line-clamp-2 leading-relaxed">
          {card.subtitle}
        </p>

        {/* Footer CTA */}
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-medium mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800",
          "text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400",
          "transition-colors"
        )}>
          <span>Read</span>
          <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.a>
  );
}

// Best Of Card (~60% height)
function BestOfCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(cardStyles, "flex-[3] flex flex-col overflow-hidden")}
    >
      {/* Header */}
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-cyan-500">
            Best Of
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent dark:from-cyan-500/30" />
        </div>
        <p className="text-[10px] text-zinc-400 mt-1 font-mono">
          Curated engineering reads
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
        <div className="space-y-0.5">
          {curatedList.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex items-center gap-2.5 px-3 py-2.5 rounded-lg",
                "hover:bg-zinc-50 dark:hover:bg-white/5",
                "transition-all duration-200"
              )}
            >
              <span className={cn(
                "w-1.5 h-1.5 rounded-full flex-shrink-0",
                "bg-zinc-300 group-hover:bg-blue-500",
                "dark:bg-zinc-700 dark:group-hover:bg-cyan-500",
                "transition-colors"
              )} />
              <span className={cn(
                "text-xs truncate flex-1",
                "text-zinc-600 group-hover:text-zinc-900",
                "dark:text-zinc-400 dark:group-hover:text-white",
                "transition-colors"
              )}>
                {item.title}
              </span>
              <ChevronRight className={cn(
                "w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100",
                "text-blue-500 dark:text-cyan-500",
                "transition-all group-hover:translate-x-0.5"
              )} />
            </a>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 flex-shrink-0">
        <a
          href="https://medium.com/@dhwani.suthar26"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center justify-center gap-1.5 w-full py-2 rounded-lg",
            "bg-blue-50 hover:bg-blue-100 border border-blue-200",
            "dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 dark:border-cyan-500/20",
            "text-xs font-medium",
            "text-blue-600 dark:text-cyan-400",
            "transition-all duration-200"
          )}
        >
          <span>View all on Medium</span>
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

// Delta Lake Card (~40% height) - For right sidebar
function DeltaLakeCard() {
  const Icon = deltaLakeCard.icon;

  return (
    <motion.a
      href={deltaLakeCard.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(cardStyles, "flex-[2] group relative overflow-hidden flex flex-col")}
    >
      {/* Top Accent */}
      <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", deltaLakeCard.accentGradient)} />

      <div className="p-4 flex flex-col h-full">
        {/* Header: Icon + Tag */}
        <div className="flex items-start justify-between mb-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center",
            "bg-zinc-100 dark:bg-zinc-800",
            "group-hover:scale-110 transition-transform"
          )}>
            <Icon className={cn("w-5 h-5", deltaLakeCard.iconColor)} />
          </div>
          <span className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-medium",
            "bg-zinc-100 text-zinc-500",
            "dark:bg-zinc-800 dark:text-zinc-400"
          )}>
            #{deltaLakeCard.tag}
          </span>
        </div>

        {/* Title */}
        <h4 className={cn(
          "text-base font-bold mb-2 leading-snug",
          "text-zinc-900 dark:text-white",
          "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
          "transition-colors"
        )}>
          {deltaLakeCard.title}
        </h4>

        {/* Subtitle */}
        <p className="text-xs text-zinc-500 dark:text-zinc-500 flex-1 leading-relaxed">
          {deltaLakeCard.subtitle}
        </p>

        {/* Footer CTA */}
        <div className={cn(
          "flex items-center gap-1.5 text-xs font-medium mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800",
          "text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
          "transition-colors"
        )}>
          <span>Read more</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.a>
  );
}

// Main Section
export function BlogSection() {
  return (
    <section id="writing" className={cn(
      "relative py-12 overflow-hidden scroll-mt-12",
      "bg-zinc-50 dark:bg-zinc-950"
    )}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(148, 163, 184, 0.25) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="hidden dark:block">
          <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-cyan-500/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-500/5 rounded-full blur-[80px]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionWrapper>
          <div className="mb-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-cyan-500 mb-2">
              Latest Writing
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Engineering Logs
            </h2>
          </div>
        </MotionWrapper>

        {/* Bento Grid - 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT WRAPPER (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Hero Card */}
            <HeroCard />
            
            {/* 2-Card Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {smallCards.map((card, index) => (
                <SmallCard key={card.id} card={card} index={index} />
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR (1 col) - Two stacked cards */}
          <div className="lg:col-span-1 h-full flex flex-col gap-4">
            <BestOfCard />
            <DeltaLakeCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
