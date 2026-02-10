"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Download, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Blueprint Page - "Professional + Physical" Design
 * Clean structure (Linear/Stripe) with tactile materiality (Paper, Glass, Shadows)
 */

// Case studies data
const caseStudies = [
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
    diagramType: "streaming" as const,
  },
  {
    id: 2,
    slug: "multi-cloud-chargeback-engine",
    year: "2025",
    role: "FinOps Engineer",
    title: "Multi-Cloud Chargeback Engine",
    problem: "Zero visibility into $2M+ monthly cloud spend across teams.",
    solution:
      "Built custom allocation engine with 99.9% accuracy, driving $1.5M annual savings.",
    tags: ["PySpark", "Airflow", "BigQuery", "K8s"],
    diagramType: "finops" as const,
  },
];

// Flow diagram on graph paper
function FlowDiagram({ type }: { type: "streaming" | "finops" }) {
  if (type === "streaming") {
    return (
      <svg viewBox="0 0 280 100" className="w-full h-full">
        {/* Source */}
        <circle cx="40" cy="50" r="16" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="40" y="54" className="text-[9px] fill-slate-500" textAnchor="middle">Source</text>
        
        {/* Arrow */}
        <line x1="60" y1="50" x2="95" y2="50" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="95,47 102,50 95,53" fill="#94a3b8" />
        <text x="78" y="40" className="text-[8px] fill-slate-400" textAnchor="middle">Kafka</text>
        
        {/* Process */}
        <rect x="110" y="35" width="50" height="30" rx="4" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="135" y="54" className="text-[9px] fill-slate-500" textAnchor="middle">Process</text>
        
        {/* Arrow */}
        <line x1="165" y1="50" x2="200" y2="50" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="200,47 207,50 200,53" fill="#94a3b8" />
        <text x="182" y="40" className="text-[8px] fill-slate-400" textAnchor="middle">Spark</text>
        
        {/* Storage */}
        <rect x="215" y="35" width="45" height="30" rx="4" fill="none" stroke="#64748b" strokeWidth="1.5" />
        <text x="237" y="54" className="text-[9px] fill-slate-500" textAnchor="middle">Store</text>
        
        {/* Latency */}
        <text x="237" y="80" className="text-[10px] fill-emerald-500 font-medium" textAnchor="middle">&lt;1s latency</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 280 100" className="w-full h-full">
      {/* Cloud sources */}
      <g transform="translate(15, 25)">
        <rect width="35" height="18" rx="3" fill="none" stroke="#64748b" strokeWidth="1" />
        <text x="17" y="13" className="text-[7px] fill-slate-500" textAnchor="middle">AWS</text>
      </g>
      <g transform="translate(15, 50)">
        <rect width="35" height="18" rx="3" fill="none" stroke="#64748b" strokeWidth="1" />
        <text x="17" y="13" className="text-[7px] fill-slate-500" textAnchor="middle">GCP</text>
      </g>
      
      {/* Merge */}
      <line x1="55" y1="34" x2="85" y2="50" stroke="#94a3b8" strokeWidth="1" />
      <line x1="55" y1="59" x2="85" y2="50" stroke="#94a3b8" strokeWidth="1" />
      
      {/* ETL */}
      <rect x="90" y="35" width="55" height="30" rx="4" fill="none" stroke="#64748b" strokeWidth="1.5" />
      <text x="117" y="48" className="text-[8px] fill-slate-500" textAnchor="middle">Allocate</text>
      <text x="117" y="58" className="text-[7px] fill-emerald-500" textAnchor="middle">99.9%</text>
      
      {/* Arrow */}
      <line x1="150" y1="50" x2="185" y2="50" stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points="185,47 192,50 185,53" fill="#94a3b8" />
      
      {/* Output */}
      <circle cx="220" cy="50" r="20" fill="none" stroke="#64748b" strokeWidth="1.5" />
      <text x="220" y="48" className="text-[11px] fill-emerald-500 font-bold" textAnchor="middle">$1.5M</text>
      <text x="220" y="58" className="text-[7px] fill-slate-400" textAnchor="middle">saved</text>
    </svg>
  );
}

// The Knolled Stack Component
function KnolledStack() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-80 h-[420px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Layer 1: Blueprint Schematic (Bottom) */}
      <motion.div
        animate={{
          x: isHovered ? -80 : 0,
          y: isHovered ? 40 : 0,
          rotate: isHovered ? -8 : -2,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute inset-0 z-10"
      >
        <div className="w-72 h-80 bg-slate-900 rounded-xl shadow-2xl overflow-hidden">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, #64748b 1px, transparent 1px),
                linear-gradient(to bottom, #64748b 1px, transparent 1px)
              `,
              backgroundSize: "16px 16px",
            }}
          />
          {/* Content */}
          <div className="relative z-10 p-6 h-full flex flex-col">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-4">
              Architecture Blueprint
            </p>
            <div className="flex-1 flex items-center justify-center">
              <svg viewBox="0 0 200 120" className="w-full h-32">
                {/* Data flow diagram */}
                <circle cx="30" cy="60" r="12" fill="none" stroke="#94a3b8" strokeWidth="1" />
                <text x="30" y="64" className="text-[7px] fill-slate-400" textAnchor="middle">IN</text>
                
                <line x1="45" y1="60" x2="70" y2="60" stroke="#64748b" strokeWidth="1" strokeDasharray="4,2" />
                
                <rect x="75" y="48" width="50" height="24" rx="3" fill="none" stroke="#94a3b8" strokeWidth="1" />
                <text x="100" y="64" className="text-[7px] fill-slate-400" textAnchor="middle">TRANSFORM</text>
                
                <line x1="130" y1="60" x2="155" y2="60" stroke="#64748b" strokeWidth="1" strokeDasharray="4,2" />
                
                <circle cx="170" cy="60" r="12" fill="none" stroke="#94a3b8" strokeWidth="1" />
                <text x="170" y="64" className="text-[7px] fill-slate-400" textAnchor="middle">OUT</text>
                
                {/* Decorative elements */}
                <line x1="20" y1="95" x2="180" y2="95" stroke="#334155" strokeWidth="0.5" />
                <text x="100" y="108" className="text-[6px] fill-slate-500" textAnchor="middle">DATA PIPELINE v2.4</text>
              </svg>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-700">
              <p className="text-slate-500 text-xs font-mono">Scale: 50TB/day</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Layer 2: Terminal Window (Middle) */}
      <motion.div
        animate={{
          x: isHovered ? 0 : 15,
          y: isHovered ? 0 : 30,
          rotate: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute inset-0 z-20"
      >
        <div className="w-72 h-80 bg-white rounded-xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden">
          {/* Window header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs text-slate-400 ml-2 font-mono">pipeline.py</span>
          </div>
          {/* Code content */}
          <div className="p-4 font-mono text-[11px] leading-relaxed">
            <div><span className="text-purple-600">from</span> pyspark.sql <span className="text-purple-600">import</span> SparkSession</div>
            <div className="mt-2"><span className="text-amber-600">@task</span></div>
            <div><span className="text-purple-600">def</span> <span className="text-blue-600">process</span>(src):</div>
            <div className="ml-4 text-slate-400"># TB-scale processing</div>
            <div className="ml-4">df = spark.read.parquet(src)</div>
            <div className="ml-4 mt-1"><span className="text-purple-600">return</span> {`{`}</div>
            <div className="ml-8"><span className="text-green-600">&quot;rows&quot;</span>: <span className="text-green-600">&quot;50B+&quot;</span>,</div>
            <div className="ml-8"><span className="text-green-600">&quot;status&quot;</span>: <span className="text-green-600">&quot;✓&quot;</span></div>
            <div className="ml-4">{`}`}</div>
          </div>
        </div>
      </motion.div>

      {/* Layer 3: Polaroid Photo (Top) */}
      <motion.div
        animate={{
          x: isHovered ? 90 : 30,
          y: isHovered ? 50 : 60,
          rotate: isHovered ? 6 : -3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute inset-0 z-30"
      >
        <div className="w-48 bg-white p-2 pb-12 shadow-2xl shadow-slate-300/50">
          <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
            <Image
              src="/paintings/mountain-landscape.jpg"
              alt="Painting"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
          <p
            className="absolute bottom-3 left-0 right-0 text-center text-sm text-slate-500"
            style={{ fontFamily: "Caveat, cursive" }}
          >
            Beyond the code ✨
          </p>
        </div>
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/5 rounded-full blur-[60px] -z-10" />
    </div>
  );
}

// Case Study Row Component
function CaseStudyRow({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/projects/${study.slug}`} className="group block">
        <div className="border-t border-slate-200" />
        <div className="py-10 px-6 -mx-6 rounded-xl transition-all duration-300 group-hover:bg-slate-50/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-6">
              <div className="font-mono text-xs text-slate-400 mb-3">
                {study.year} · {study.role}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 group-hover:text-slate-900 flex items-center gap-3 mb-3">
                {study.title}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
              </h3>
              <p className="text-sm italic text-slate-400 mb-3">{study.problem}</p>
              <p className="text-slate-600 leading-relaxed mb-4">{study.solution}</p>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Diagram on Graph Paper */}
            <div className="lg:col-span-6">
              <div
                className="rounded-xl p-6 h-32"
                style={{
                  backgroundColor: "#fafbfc",
                  backgroundImage: `
                    linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                    linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
                  `,
                  backgroundSize: "16px 16px",
                }}
              >
                <FlowDiagram type={study.diagramType} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlueprintPage() {
  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Noise Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Blueprint Grid (Faint) */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #94a3b8 0.5px, transparent 0.5px)`,
          backgroundSize: "24px 24px",
          opacity: 0.15,
          maskImage: `radial-gradient(ellipse 60% 50% at 50% 30%, black 0%, transparent 70%)`,
          WebkitMaskImage: `radial-gradient(ellipse 60% 50% at 50% 30%, black 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* === HERO SECTION === */}
        <section className="min-h-[90vh] flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Text */}
              <div>
                {/* Handwritten Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <span
                    className="text-2xl text-blue-600"
                    style={{ fontFamily: "Caveat, cursive" }}
                  >
                    👋 Hi, I&apos;m Dhwani
                  </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6"
                >
                  I design data systems
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                    that scale & save.
                  </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-slate-600 max-w-md mb-8 leading-relaxed"
                >
                  Senior Data Engineer & FinOps Specialist. I architect pipelines
                  that process terabytes and cut cloud costs by millions.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-4 mb-10"
                >
                  <Link
                    href="/about"
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-full",
                      "bg-slate-900 text-white font-medium",
                      "hover:bg-slate-800 transition-all",
                      "shadow-lg shadow-slate-900/20"
                    )}
                  >
                    View My Work
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/resume.pdf"
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-full",
                      "bg-white text-slate-700 font-medium",
                      "border border-slate-200 hover:border-slate-300 transition-all"
                    )}
                  >
                    <Download className="w-4 h-4" />
                    Resume
                  </Link>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-8 pt-8 border-t border-slate-100"
                >
                  <div>
                    <span className="text-2xl font-bold text-slate-900">3+</span>
                    <span className="text-sm text-slate-500 ml-2">years</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-emerald-600">$1.5M</span>
                    <span className="text-sm text-slate-500 ml-2">saved</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-slate-900">50TB</span>
                    <span className="text-sm text-slate-500 ml-2">/day</span>
                  </div>
                </motion.div>
              </div>

              {/* Right: Knolled Stack */}
              <div className="flex justify-center lg:justify-end">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <KnolledStack />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* === CASE STUDIES === */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-14"
            >
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Case Studies
              </p>
              <h2 className="text-3xl font-bold text-slate-900">Selected Work</h2>
            </motion.div>

            {caseStudies.map((study, index) => (
              <CaseStudyRow key={study.id} study={study} index={index} />
            ))}
            <div className="border-t border-slate-200" />
          </div>
        </section>

        {/* === CTA FOOTER === */}
        <section className="py-24 bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p
                className="text-xl text-slate-500 mb-4"
                style={{ fontFamily: "Caveat, cursive" }}
              >
                Let&apos;s build something great
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Ready to optimize your
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                  data infrastructure?
                </span>
              </h2>
              <a
                href="mailto:dhwani@example.com"
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-4 rounded-full",
                  "bg-slate-900 text-white font-medium text-lg",
                  "hover:bg-slate-800 transition-all",
                  "shadow-xl shadow-slate-900/20"
                )}
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Back to Main */}
        <div className="py-6 text-center border-t border-slate-100">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-slate-600 font-mono transition-colors"
          >
            ← Back to Main Site
          </Link>
        </div>
      </div>
    </div>
  );
}
