"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Code2,
  Download,
  ChevronRight,
  Linkedin,
  Mail,
  Ruler,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { GridBackground } from "@/components/ui/GridBackground";
import { MicroIconGrid } from "@/components/ui/MicroIconGrid";
import { PipelineTimeline, type TimelineItem } from "@/components/ui/PipelineTimeline";
import { ArchitecturalBlueprint } from "@/components/ui/ArchitecturalBlueprint";
import { PaintingGallery } from "@/components/ui/PaintingGallery";

/**
 * Experience data with company logos.
 */
const experience: TimelineItem[] = [
  {
    title: "Data Engineer (FinOps & AI)",
    company: "Motorola Solutions",
    location: "Bangalore",
    period: "July 2025 – Present",
    description: [
      "Architected Multi-Cloud Chargeback Platform with 99.9% accuracy across AWS, Azure, and GCP",
      "Drove $1.5M+ in cloud cost savings via automated recommendation pipelines",
      "Built FinOps tooling using PySpark, Airflow, and GenAI for cost attribution",
    ],
    technologies: ["PySpark", "Airflow", "GenAI", "AWS", "GCP"],
    highlight: "$1.5M+ savings",
    logo: "https://cdn.simpleicons.org/motorola/000000",
    companyQuote: "We help people be their best in the moments that matter.",
    isCurrent: true,
  },
  {
    title: "Associate Consultant (Data & GenAI)",
    company: "Mastek",
    location: "Ahmedabad",
    period: "Jan 2024 – July 2025",
    description: [
      "Built 'SQLator' - an intelligent Text-to-SQL engine using GenAI",
      "Identified £645k+ in financial leakage using custom PL/SQL algorithms",
      "Developed data pipelines for enterprise clients",
    ],
    technologies: ["Python", "PL/SQL", "GenAI", "Oracle"],
    highlight: "£645k+ leakage",
    logo: "/logos/mastek.png",
  },
  {
    title: "Data Engineering Intern",
    company: "Jio Platforms Ltd.",
    location: "Mumbai",
    period: "May 2023 – July 2023",
    description: [
      "Processed high-volume logs with Splunk for real-time API monitoring",
      "Built dashboards for system health and performance tracking",
    ],
    technologies: ["Splunk", "Python", "SQL", "Linux"],
    highlight: "Real-time monitoring",
    logo: "/logos/jio.png",
  },
];

const education = {
  degree: "B.Tech in Computer Engineering",
  school: "Charotar University of Science & Technology",
  period: "May 2024",
  cgpa: "9.79 / 10.0",
};

const certifications = [
  { name: "Introduction to FinOps", org: "FinOps Foundation" },
  { name: "Airflow 3 Fundamentals", org: "Astronomer" },
  { name: "Cloud GenAI Professional", org: "Oracle" },
];

const stats = [
  { label: "Savings", value: "$1.5M+", color: "text-emerald-600" },
  { label: "CGPA", value: "9.79", color: "text-amber-600" },
  { label: "Exp", value: "3+ yrs", color: "text-blue-600" },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0">
        <GridBackground
          dotSize={1}
          dotSpacing={20}
          dotColor="rgba(148, 163, 184, 0.25)"
          highlightColor="rgba(56, 189, 248, 0.5)"
          highlightRadius={100}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-28 md:pb-16">
        
        {/* ===== SECTION 1: Split-Screen Layout ===== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-16">
          
          {/* LEFT COLUMN (Sticky Sidebar) */}
          <aside className="md:col-span-4 lg:col-span-4">
            <div className="md:sticky md:top-24 space-y-5">
              
              {/* Profile Card - WHITE with border and shadow */}
              <MotionWrapper>
                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  {/* Avatar & Name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/30">
                        DS
                      </div>
                      <motion.div 
                        animate={{ 
                          boxShadow: [
                            "0 0 6px rgba(16,185,129,0.5)",
                            "0 0 14px rgba(16,185,129,0.8)",
                            "0 0 6px rgba(16,185,129,0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900"
                      />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                        Dhwani Suthar
                      </h1>
                      <p className="text-sm bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent font-semibold">
                        FinOps & Data Engineer
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4 leading-relaxed">
                    Building custom engines that saved{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">$1.5M+</span> in 
                    cloud costs using PySpark, Airflow, and GenAI.
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="text-center py-2.5 px-1 rounded-xl bg-gray-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-700/50"
                      >
                        <div className={cn("text-sm font-bold", stat.color, "dark:text-opacity-100")}>
                          {stat.value}
                        </div>
                        <div className="text-[9px] text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social Buttons */}
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <motion.a
                      href="https://linkedin.com/in/dhwanisuthar"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "inline-flex items-center justify-center gap-2",
                        "px-4 py-2.5 rounded-xl text-sm font-semibold",
                        "bg-[#0A66C2] hover:bg-[#0077B5] text-white",
                        "shadow-md shadow-[#0A66C2]/20 hover:shadow-lg hover:shadow-[#0A66C2]/30",
                        "transition-all duration-200"
                      )}
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </motion.a>
                    <motion.a
                      href="mailto:dhwani.suthar@example.com"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "inline-flex items-center justify-center gap-2",
                        "px-4 py-2.5 rounded-xl text-sm font-semibold",
                        "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-200",
                        "border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600",
                        "hover:bg-gray-200 dark:hover:bg-zinc-700/80",
                        "transition-all duration-200"
                      )}
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </motion.a>
                  </div>

                  {/* Download Resume */}
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2",
                      "px-4 py-2.5 rounded-xl text-sm font-semibold",
                      "bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-500/10 dark:to-blue-500/10",
                      "text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300",
                      "border border-cyan-200 dark:border-cyan-500/30 hover:border-cyan-300 dark:hover:border-cyan-500/50",
                      "hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-500/20 dark:hover:to-blue-500/20",
                      "transition-all duration-200"
                    )}
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </motion.a>
                </div>
              </MotionWrapper>

              {/* Tech Stack - WHITE Card with Full Color Icons */}
              <MotionWrapper delay={0.1}>
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <Code2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      Tech Stack
                    </h2>
                  </div>
                  <MicroIconGrid />
                </div>
              </MotionWrapper>

              {/* Education - WHITE Card */}
              <MotionWrapper delay={0.15}>
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                      <GraduationCap className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      Education
                    </h2>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {education.degree}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-zinc-500 mb-1.5">
                      {education.school}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        CGPA: {education.cgpa}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-zinc-500">
                        {education.period}
                      </span>
                    </div>
                  </div>
                </div>
              </MotionWrapper>

              {/* Certifications - WHITE Card */}
              <MotionWrapper delay={0.2}>
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                      <Award className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                      Certifications
                    </h2>
                  </div>
                  <div className="space-y-2">
                    {certifications.map((cert, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="group flex items-start gap-2"
                      >
                        <ChevronRight className="w-3 h-3 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        <div className="text-xs">
                          <p className="font-semibold text-gray-700 dark:text-zinc-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                            {cert.name}
                          </p>
                          <p className="text-gray-400 dark:text-zinc-600">{cert.org}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>

            </div>
          </aside>

          {/* RIGHT COLUMN (Experience Timeline) */}
          <main className="md:col-span-8 lg:col-span-8">
            <MotionWrapper delay={0.1}>
              <PipelineTimeline items={experience} />
            </MotionWrapper>
          </main>

        </div>

        {/* ===== SECTION 2: The Architectural Blueprint ===== */}
        <section className="mb-16">
          <MotionWrapper>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Ruler className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  The Architectural Blueprint
                </h2>
                <p className="text-xs text-gray-500 dark:text-zinc-500">
                  A roadmap, not a rigid ladder
                </p>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 via-cyan-500/30 to-transparent" />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <ArchitecturalBlueprint />
          </MotionWrapper>
        </section>

        {/* ===== SECTION 3: Creative Engineering ===== */}
        <section>
          <MotionWrapper>
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Creative Engineering
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-amber-500/50 via-rose-500/30 to-transparent" />
            </div>
          </MotionWrapper>

          {/* Introduction Text - Clean, no card wrapper */}
          <MotionWrapper delay={0.1}>
            <p className="text-base text-gray-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-2xl">
              Great architecture requires the same{" "}
              <span className="text-amber-600 dark:text-amber-400 font-medium">patience</span> and{" "}
              <span className="text-rose-600 dark:text-rose-400 font-medium">perspective</span>{" "}
              as art. When I&apos;m not optimizing pipelines, I paint.
            </p>
          </MotionWrapper>

          {/* Clean Gallery - No card wrapper */}
          <MotionWrapper delay={0.15}>
            <PaintingGallery />
          </MotionWrapper>
        </section>

      </div>
    </div>
  );
}
