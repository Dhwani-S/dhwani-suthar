"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Blog Changelog - File Directory aesthetic
 * Format: [Date] ./Title-of-the-post.md [Tags]
 * Monospace font, hover highlights
 */

interface BlogEntry {
  slug: string;
  date: string;
  title: string;
  tags: string[];
}

const blogEntries: BlogEntry[] = [
  {
    slug: "building-realtime-pipelines",
    date: "2024-12-15",
    title: "Building-Realtime-Pipelines-at-Scale",
    tags: ["spark", "kafka"],
  },
  {
    slug: "finops-cost-allocation",
    date: "2024-11-08",
    title: "FinOps-Cost-Allocation-Deep-Dive",
    tags: ["finops", "gcp"],
  },
  {
    slug: "pyspark-optimization-tips",
    date: "2024-10-22",
    title: "PySpark-Optimization-Tips",
    tags: ["spark", "python"],
  },
  {
    slug: "airflow-best-practices",
    date: "2024-09-14",
    title: "Airflow-Best-Practices-2024",
    tags: ["airflow", "etl"],
  },
];

function BlogRow({ entry, index }: { entry: BlogEntry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        href={`/blog/${entry.slug}`}
        className="group flex items-center gap-4 py-3 px-4 -mx-4 rounded-md hover:bg-zinc-50 transition-colors font-mono text-sm"
      >
        {/* Date */}
        <span className="text-zinc-400 shrink-0 w-24">{entry.date}</span>

        {/* File path */}
        <span className="text-zinc-600 group-hover:text-zinc-900 transition-colors truncate">
          ./{entry.title}.md
        </span>

        {/* Tags */}
        <span className="text-zinc-300 hidden sm:flex gap-2 ml-auto shrink-0">
          {entry.tags.map((tag) => (
            <span key={tag} className="text-xs text-zinc-400">
              [{tag}]
            </span>
          ))}
        </span>
      </Link>
    </motion.div>
  );
}

export function BlogChangelog() {
  return (
    <div className="border border-zinc-100 rounded-lg bg-white/50">
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-100 flex items-center gap-2 font-mono text-xs text-zinc-400">
        <span className="text-zinc-300">~/</span>
        <span>posts/</span>
        <span className="ml-auto">{blogEntries.length} entries</span>
      </div>

      {/* Entries */}
      <div className="p-2">
        {blogEntries.map((entry, index) => (
          <BlogRow key={entry.slug} entry={entry} index={index} />
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-100">
        <Link
          href="/blog"
          className="font-mono text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          $ ls -la ./posts/ →
        </Link>
      </div>
    </div>
  );
}

export default BlogChangelog;
