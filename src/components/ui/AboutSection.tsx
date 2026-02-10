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
import { MicroIconGrid } from "@/components/ui/MicroIconGrid";
import { PipelineTimeline, type TimelineItem } from "@/components/ui/PipelineTimeline";
import { ArchitecturalBlueprint } from "@/components/ui/ArchitecturalBlueprint";
import { PaintingGallery } from "@/components/ui/PaintingGallery";

/**
 * AboutSection - Full About content as a section for SPA
 */

const experience: TimelineItem[] = [
  {
    title: "Data Engineer (FinOps & AI)",
    company: "Motorola Solutions",
    location: "Bangalore",
    period: "July 2025 – Present",
    description: [
      "Architecting the financial backbone of the cloud. Building systems that save millions.",
      "Achieved 99%+ tagging accuracy across the entire org",
      "Multi-cloud cost allocation with custom chargeback engine",
    ],
    technologies: ["PySpark", "Airflow", "GCP", "AWS"],
    highlight: "$1.5M+ saved",
    logo: "https://cdn.simpleicons.org/motorola/000000",
    companyQuote: "We help people be their best in moments that matter.",
    isCurrent: true,
  },
  {
    title: "Associate Consultant (Data & GenAI)",
    company: "Mastek",
    location: "Ahmedabad",
    period: "Jan 2024 – July 2025",
    description: [
      "Built 'SQLator' (Text-to-SQL) and hunted financial leakage",
      "Learned to solve business problems, not just code problems",
    ],
    technologies: ["Python", "PL/SQL", "GenAI", "Oracle"],
    highlight: "£645k+ found",
    logo: "/logos/mastek.png",
  },
  {
    title: "Data Engineering Intern",
    company: "Jio Platforms Ltd.",
    location: "Mumbai",
    period: "May 2023 – July 2023",
    description: [
      "Processed high-volume logs with Splunk",
      "My first taste of real-time data at scale",
    ],
    technologies: ["Splunk", "Python", "SQL"],
    highlight: "Where it started",
    logo: "/logos/jio.png",
  },
];

const education = {
  degree: "B.Tech in Computer Engineering",
  school: "Charotar University of Science & Technology",
  period: "May 2024",
  cgpa: "9.79 / 10.0",
  story: "Graduated with 9.79 CGPA. Won State-level Hackathon (AKAM - Azadi ka Amrit Mahotsav) 🏆",
};

const certifications = [
  { name: "Introduction to FinOps", org: "FinOps Foundation" },
  { name: "Airflow 3 Fundamentals", org: "Astronomer" },
  { name: "Cloud GenAI Professional", org: "Oracle" },
];

const stats = [
  { label: "Saved", value: "$1.5M+", color: "text-emerald-600" },
  { label: "Tag Accuracy", value: "99%+", color: "text-blue-600" },
  { label: "CGPA", value: "9.79", color: "text-amber-600" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative bg-gray-50 dark:bg-zinc-900 scroll-mt-12">
      {/* Dot Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none dark:opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148, 163, 184, 0.25) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        
        {/* Section Header */}
        <MotionWrapper>
          <div className="mb-6">
            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-1.5">
              The Story
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
              About Me
            </h2>
          </div>
        </MotionWrapper>

        {/* ===== Split-Screen Layout ===== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 mb-10">
          
          {/* LEFT COLUMN (Sticky Sidebar) */}
          <aside className="md:col-span-4 lg:col-span-4">
            <div className="md:sticky md:top-20 space-y-4">
              
              {/* Profile Card */}
              <MotionWrapper>
                <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 shadow-sm dark:shadow-black/20">
                  {/* Avatar & Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 flex items-center justify-center text-white text-base font-bold shadow-md shadow-blue-500/30">
                        DS
                      </div>
                      <motion.div 
                        animate={{ 
                          boxShadow: [
                            "0 0 4px rgba(16,185,129,0.5)",
                            "0 0 10px rgba(16,185,129,0.8)",
                            "0 0 4px rgba(16,185,129,0.5)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-800"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        Dhwani Suthar
                      </h3>
                      <p className="text-xs bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent font-semibold">
                        Data & FinOps Specialist
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-gray-600 dark:text-zinc-400 mb-3 leading-relaxed">
                    I&apos;m not your typical engineer. I started with oil paints, learning that{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">every stroke matters</span>. 
                    Today, I apply that philosophy to code - building systems as{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">elegant as they are efficient</span>.
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-1.5 mb-4">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="text-center py-2 px-1 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10"
                      >
                        <div className={cn("text-xs font-bold", stat.color, "dark:brightness-125")}>
                          {stat.value}
                        </div>
                        <div className="text-[8px] text-gray-500 dark:text-zinc-500 uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social Buttons */}
                  <div className="grid grid-cols-2 gap-1.5 mb-1.5">
                    <div className="relative group">
                      <motion.a
                        href="https://www.linkedin.com/in/dhwani-suthar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "inline-flex items-center justify-center gap-1.5 w-full",
                          "px-3 py-2 rounded-lg text-xs font-semibold",
                          "bg-[#0A66C2] hover:bg-[#0077B5] text-white",
                          "shadow-sm shadow-[#0A66C2]/20",
                          "transition-all duration-200"
                        )}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        LinkedIn
                      </motion.a>
                      {/* Tooltip */}
                      <div className={cn(
                        "absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md",
                        "bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-medium whitespace-nowrap",
                        "opacity-0 group-hover:opacity-100 pointer-events-none",
                        "transition-opacity duration-200 z-10",
                        "shadow-lg"
                      )}>
                        dhwani-suthar
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-zinc-900 dark:bg-zinc-800" />
                      </div>
                    </div>
                    <div className="relative group">
                      <motion.a
                        href="mailto:dhwani.suthar02@gmail.com"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "inline-flex items-center justify-center gap-1.5 w-full",
                          "px-3 py-2 rounded-lg text-xs font-semibold",
                          "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-zinc-300",
                          "border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20",
                          "hover:bg-gray-200 dark:hover:bg-white/15",
                          "transition-all duration-200"
                        )}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        Email
                      </motion.a>
                      {/* Tooltip */}
                      <div className={cn(
                        "absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md",
                        "bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-medium whitespace-nowrap",
                        "opacity-0 group-hover:opacity-100 pointer-events-none",
                        "transition-opacity duration-200 z-10",
                        "shadow-lg"
                      )}>
                        dhwani.suthar02@gmail.com
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-zinc-900 dark:bg-zinc-800" />
                      </div>
                    </div>
                  </div>

                  {/* Download Resume */}
                  <motion.a
                    href="/resume.pdf"
                    target="_blank"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2",
                      "px-4 py-2.5 rounded-xl text-sm font-semibold",
                      "bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-500/10 dark:to-blue-500/10",
                      "text-cyan-700 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300",
                      "border border-cyan-200 dark:border-cyan-500/20 hover:border-cyan-300 dark:hover:border-cyan-500/30",
                      "hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-500/20 dark:hover:to-blue-500/20",
                      "transition-all duration-200"
                    )}
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </motion.a>
                </div>
              </MotionWrapper>

              {/* Tech Stack Card */}
              <MotionWrapper delay={0.1}>
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 shadow-sm dark:shadow-black/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <Code2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      Tech Stack
                    </h3>
                  </div>
                  <MicroIconGrid />
                </div>
              </MotionWrapper>

              {/* Education Card */}
              <MotionWrapper delay={0.15}>
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 shadow-sm dark:shadow-black/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                      <GraduationCap className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      Education
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {education.degree}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-zinc-400 mb-1.5">
                      {education.school}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        CGPA: {education.cgpa}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-zinc-500">
                        {education.period}
                      </span>
                    </div>
                    {/* Hackathon Achievement */}
                    <div className="pt-2 border-t border-gray-100 dark:border-zinc-700">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🥇</span>
                        <div>
                          <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                            State-Level Hackathon Winner
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-zinc-500">
                            AKAM - Azadi ka Amrit Mahotsav
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionWrapper>

              {/* Certifications Card */}
              <MotionWrapper delay={0.2}>
                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 shadow-sm dark:shadow-black/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                      <Award className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      Certifications
                    </h3>
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
                          <p className="text-gray-400 dark:text-zinc-500">{cert.org}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </MotionWrapper>

            </div>
          </aside>

          {/* RIGHT COLUMN (Experience Timeline) */}
          <div className="md:col-span-8 lg:col-span-8">
            <MotionWrapper delay={0.1}>
              <PipelineTimeline items={experience} />
            </MotionWrapper>
          </div>

        </div>

        {/* ===== Architectural Blueprint ===== */}
        <div className="mb-16">
          <MotionWrapper>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Ruler className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  The Architectural Blueprint
                </h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400">
                  A roadmap, not a rigid ladder
                </p>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 via-cyan-500/30 to-transparent" />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <ArchitecturalBlueprint />
          </MotionWrapper>
        </div>

        {/* ===== Creative Engineering ===== */}
        <div>
          <MotionWrapper>
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Creative Engineering
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-amber-500/50 via-rose-500/30 to-transparent" />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.1}>
            <p className="text-base text-gray-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-2xl">
              This is where the &quot;artist&quot; part comes in. I hate waste - wasted data, 
              wasted time, wasted cloud budget. I build systems that are as{" "}
              <span className="text-amber-600 dark:text-amber-400 font-medium">elegant</span> as they are{" "}
              <span className="text-rose-600 dark:text-rose-400 font-medium">efficient</span>.
            </p>
          </MotionWrapper>

          <MotionWrapper delay={0.15}>
            <PaintingGallery />
          </MotionWrapper>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;
