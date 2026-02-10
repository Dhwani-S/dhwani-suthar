"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Case Studies - Premium "Technical Specification" Layout
 * Clean rows with smooth hover transitions
 */

interface CaseStudy {
  id: number;
  slug: string;
  year: string;
  role: string;
  title: string;
  problem: string;
  solution: string;
  tags: string[];
  diagramType: "streaming" | "finops";
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: "real-time-data-pipeline",
    year: "2024",
    role: "Lead Data Engineer",
    title: "Real-Time Streaming Pipeline",
    problem: "Legacy batch systems caused 4-hour reporting delays.",
    solution:
      "Architected a Kafka-Spark streaming architecture handling 1M+ events/sec with sub-second latency.",
    tags: ["Kafka", "Spark", "Databricks", "AWS"],
    diagramType: "streaming",
  },
  {
    id: 2,
    slug: "multi-cloud-chargeback-engine",
    year: "2025",
    role: "FinOps Engineer",
    title: "Multi-Cloud Chargeback Engine",
    problem: "Zero visibility into $2M+ monthly cloud spend across teams.",
    solution:
      "Built custom allocation engine with 99.9% accuracy, driving $1.5M annual savings through automated recommendations.",
    tags: ["PySpark", "Airflow", "BigQuery", "K8s"],
    diagramType: "finops",
  },
];

// Premium wireframe-style flow diagram
function FlowDiagram({ type }: { type: "streaming" | "finops" }) {
  if (type === "streaming") {
    return (
      <svg viewBox="0 0 240 80" className="w-full h-full">
        {/* Source */}
        <circle cx="30" cy="40" r="18" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="4,2" />
        <text x="30" y="44" className="text-[9px] fill-zinc-500" textAnchor="middle">Source</text>
        
        {/* Arrow */}
        <line x1="52" y1="40" x2="75" y2="40" stroke="#d4d4d8" strokeWidth="1.5" />
        <text x="63" y="30" className="text-[7px] fill-zinc-400" textAnchor="middle">Kafka</text>
        
        {/* Process */}
        <rect x="80" y="25" width="40" height="30" rx="6" fill="none" stroke="#a1a1aa" strokeWidth="1.5" />
        <text x="100" y="44" className="text-[9px] fill-zinc-500" textAnchor="middle">Process</text>
        
        {/* Arrow */}
        <line x1="124" y1="40" x2="147" y2="40" stroke="#d4d4d8" strokeWidth="1.5" />
        <text x="135" y="30" className="text-[7px] fill-zinc-400" textAnchor="middle">Spark</text>
        
        {/* Storage */}
        <rect x="152" y="28" width="36" height="24" rx="4" fill="none" stroke="#a1a1aa" strokeWidth="1.5" />
        <text x="170" y="44" className="text-[9px] fill-zinc-500" textAnchor="middle">Store</text>
        
        {/* Latency indicator */}
        <text x="215" y="44" className="text-[9px] fill-emerald-500 font-medium" textAnchor="middle">&lt;1s</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 80" className="w-full h-full">
      {/* Multi-cloud sources */}
      <g transform="translate(10, 20)">
        <rect width="28" height="16" rx="3" fill="none" stroke="#a1a1aa" strokeWidth="1" />
        <text x="14" y="12" className="text-[6px] fill-zinc-400" textAnchor="middle">AWS</text>
      </g>
      <g transform="translate(10, 42)">
        <rect width="28" height="16" rx="3" fill="none" stroke="#a1a1aa" strokeWidth="1" />
        <text x="14" y="12" className="text-[6px] fill-zinc-400" textAnchor="middle">GCP</text>
      </g>
      
      {/* Merge lines */}
      <line x1="42" y1="28" x2="65" y2="40" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="42" y1="50" x2="65" y2="40" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="3,2" />
      
      {/* ETL */}
      <rect x="70" y="25" width="45" height="30" rx="6" fill="none" stroke="#a1a1aa" strokeWidth="1.5" />
      <text x="92" y="38" className="text-[8px] fill-zinc-500" textAnchor="middle">Allocate</text>
      <text x="92" y="48" className="text-[7px] fill-emerald-500" textAnchor="middle">99.9%</text>
      
      {/* Arrow */}
      <line x1="120" y1="40" x2="145" y2="40" stroke="#d4d4d8" strokeWidth="1.5" />
      
      {/* Output */}
      <circle cx="165" cy="40" r="16" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="165" y="44" className="text-[8px] fill-emerald-500 font-medium" textAnchor="middle">$1.5M</text>
      
      {/* Savings label */}
      <text x="210" y="44" className="text-[8px] fill-zinc-400" textAnchor="middle">saved</text>
    </svg>
  );
}

function CaseStudyRow({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={`/projects/${study.slug}`} className="group block">
        {/* Divider */}
        <div className="border-t border-zinc-200/80" />

        <div className="py-8 px-6 -mx-6 rounded-xl transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-zinc-50 group-hover:to-blue-50/30">
          <div className="grid grid-cols-12 gap-6 lg:gap-8">
            {/* Column 1: Metadata */}
            <div className="col-span-12 lg:col-span-2">
              <div className="font-mono text-sm">
                <div className="text-zinc-400">{study.year}</div>
                <div className="text-zinc-500 mt-1">{study.role}</div>
              </div>
            </div>

            {/* Column 2: The Story */}
            <div className="col-span-12 lg:col-span-6">
              <h3 className="text-xl font-semibold text-zinc-800 group-hover:text-zinc-900 transition-colors flex items-center gap-3">
                {study.title}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-500" />
              </h3>

              <p className="text-sm italic text-zinc-400 mt-2">
                {study.problem}
              </p>

              <p className="text-zinc-600 mt-3 leading-relaxed">
                {study.solution}
              </p>

              {/* Tech Tags - Subtle pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {study.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-zinc-500 bg-zinc-100/80 px-2.5 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 3: The Diagram */}
            <div className="col-span-12 lg:col-span-4">
              <div className="h-20 lg:h-full flex items-center opacity-60 group-hover:opacity-100 transition-opacity">
                <FlowDiagram type={study.diagramType} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function CaseStudyCards() {
  return (
    <div>
      {caseStudies.map((study, index) => (
        <CaseStudyRow key={study.id} study={study} index={index} />
      ))}
      {/* Final divider */}
      <div className="border-t border-zinc-200/80" />
    </div>
  );
}

export default CaseStudyCards;
