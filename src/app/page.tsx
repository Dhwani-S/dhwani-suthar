"use client";

import Link from "next/link";
import { ArrowRight, Linkedin, Code2, BookOpen, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Testimonials } from "@/components/ui/Testimonials";
import { Footer } from "@/components/ui/Footer";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { TypewriterText } from "@/components/ui/TypewriterText";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { AboutSection } from "@/components/ui/AboutSection";
import { LiveContext } from "@/components/ui/LiveContext";
import { ScrollHint } from "@/components/ui/ScrollHint";
import { InteractivePhoto } from "@/components/ui/InteractivePhoto";
import { SecretTooltip } from "@/components/ui/SecretTooltip";
import { BlogSection } from "@/components/ui/BlogSection";
import { ContactModal } from "@/components/ui/ContactModal";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { useConsoleGreeting } from "@/hooks/useConsoleGreeting";

// Dynamic import with SSR disabled to avoid hydration issues
const FinOpsToggle = dynamic(
  () => import("@/components/ui/FinOpsToggle").then((mod) => mod.FinOpsToggle),
  { ssr: false }
);

// Typewriter words
const typewriterWords = ["high-performance", "cost-efficient", "self-healing"];

// Hero Spotlight Background Component
function HeroSpotlight({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setIsHovering(true));
      container.addEventListener("mouseleave", () => setIsHovering(false));
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", () => setIsHovering(true));
        container.removeEventListener("mouseleave", () => setIsHovering(false));
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Engineering Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none dark:opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(128,128,128,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128,128,128,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
        }}
      />
      
      {/* Mouse Spotlight Effect - Soft Blue */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(
            600px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(59, 130, 246, 0.06),
            transparent 40%
          )`,
        }}
      />
      
      {/* Grid Reveal Effect - Soft Blue */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0,
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
          maskImage: `radial-gradient(
            400px circle at ${mousePosition.x}px ${mousePosition.y}px,
            black,
            transparent
          )`,
          WebkitMaskImage: `radial-gradient(
            400px circle at ${mousePosition.x}px ${mousePosition.y}px,
            black,
            transparent
          )`,
        }}
      />
      
      {/* Vignette - Theme aware */}
      <div 
        className="absolute inset-0 pointer-events-none dark:hidden"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(255,255,255,0.9) 85%, white 100%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(9,9,11,0.9) 85%, rgb(9,9,11) 100%)',
        }}
      />
      
      {/* Bottom Fade Transition - Dissolves grid lines into dot background below */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-50 dark:to-zinc-900 pointer-events-none z-10" />
      
      {children}
    </div>
  );
}

export default function Home() {
  // Console Easter egg for developers
  useConsoleGreeting();
  
  // Contact modal state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Live Context Widget */}
      <LiveContext />
      
      {/* FinOps Toggle - Bottom Left */}
      <FinOpsToggle />

      {/* Content */}
      <div className="relative z-10">
        {/* === HERO SECTION === */}
        <HeroSpotlight>
          <section className="min-h-screen flex items-start relative pt-28">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 w-full">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                
                {/* Left: Text Content */}
                <div className="order-2 lg:order-1 relative z-10">
                  <MotionWrapper>
                    {/* Eyebrow */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 backdrop-blur-sm text-blue-700 dark:text-blue-400 text-[11px] font-medium mb-4 border border-blue-200 dark:border-blue-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      Available for opportunities
                    </div>
                  </MotionWrapper>

                  <MotionWrapper delay={0.1}>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-4">
                      Building{" "}
                      <TypewriterText words={typewriterWords} />
                      <br />
                      data pipelines that
                      <br />
                      <span className="text-blue-600 dark:text-blue-400">don&apos;t break the bank.</span>
                    </h1>
                  </MotionWrapper>

                  <MotionWrapper delay={0.15}>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-6 leading-relaxed">
                      <span className="text-zinc-700 dark:text-zinc-200 font-medium">Software Engineer</span> & <span className="text-emerald-600 dark:text-emerald-400 font-medium">FinOps Specialist</span>. I combine the precision of{" "}
                      <span className="text-blue-600 dark:text-blue-400 font-medium">Data Engineering</span> with the efficiency of Cloud FinOps. I turn messy, 
                      expensive data streams into lean, profitable assets.
                    </p>
                  </MotionWrapper>

                  <MotionWrapper delay={0.2}>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Link
                        href="/#projects"
                        className={cn(
                          "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs",
                          "bg-blue-600 text-white font-medium",
                          "hover:bg-blue-700 transition-all duration-300",
                          "shadow-sm shadow-blue-200 dark:shadow-blue-500/20",
                          "hover:shadow-md hover:shadow-blue-300 dark:hover:shadow-blue-500/30",
                          "hover:-translate-y-0.5 active:translate-y-0"
                        )}
                      >
                        View My Work
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => setIsContactModalOpen(true)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs",
                          "bg-emerald-600 text-white font-medium",
                          "hover:bg-emerald-700 transition-all duration-300",
                          "shadow-sm shadow-emerald-200 dark:shadow-emerald-500/20",
                          "hover:shadow-md hover:shadow-emerald-300 dark:hover:shadow-emerald-500/30",
                          "hover:-translate-y-0.5 active:translate-y-0"
                        )}
                      >
                        <MessageSquare className="w-3 h-3" />
                        Get in Touch
                      </button>
                    </div>
                    {/* Secondary link */}
                    <Link
                      href="/#about"
                      className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Learn more about me →
                    </Link>
                  </MotionWrapper>

                  {/* Social Proof Dock */}
                  <MotionWrapper delay={0.22}>
                    <div className="mb-4">
                      <p className="text-[8px] font-mono uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mb-1.5">
                        Find me on
                      </p>
                      <div className="flex gap-2 items-center flex-wrap">
                        <a
                          href="https://www.linkedin.com/in/dhwani-suthar/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-2 px-3 py-2 rounded-lg",
                            "text-zinc-500 dark:text-zinc-400 text-xs font-mono",
                            "hover:bg-blue-50/80 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400",
                            "transition-all duration-200 group"
                          )}
                        >
                          <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span>LinkedIn</span>
                        </a>
                        <span className="text-zinc-200 dark:text-zinc-700">|</span>
                        <a
                          href="https://leetcode.com/Dhwani-Suthar"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-2 px-3 py-2 rounded-lg",
                            "text-zinc-500 dark:text-zinc-400 text-xs font-mono",
                            "hover:bg-amber-50/80 dark:hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400",
                            "transition-all duration-200 group"
                          )}
                        >
                          <Code2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span>LeetCode</span>
                        </a>
                        <span className="text-zinc-200 dark:text-zinc-700">|</span>
                        <a
                          href="https://medium.com/@dhwani.suthar26"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-2 px-3 py-2 rounded-lg",
                            "text-zinc-500 dark:text-zinc-400 text-xs font-mono",
                            "hover:bg-emerald-50/80 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400",
                            "transition-all duration-200 group"
                          )}
                        >
                          <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span>Medium</span>
                        </a>
                      </div>
                    </div>
                  </MotionWrapper>

                  <MotionWrapper delay={0.25}>
                    <div className="flex gap-6 pt-4 border-t border-zinc-200/60 dark:border-zinc-700/60">
                      <div>
                        <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">$1.5M+</span>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Costs Saved</p>
                      </div>
                      <div>
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">99%+</span>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Tag Accuracy</p>
                      </div>
                      <div>
                        <span className="text-xl font-bold text-amber-600 dark:text-amber-400">9.79</span>
                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500">CGPA</p>
                      </div>
                    </div>
                  </MotionWrapper>

                </div>

                {/* Right: Profile Photo with Glass Code Overlay */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative z-10">
                  <MotionWrapper delay={0.2}>
                    <div className="relative">
                      {/* Large Ambient Glow - Soft Azure */}
                      <div className="absolute -inset-8 bg-blue-100/40 dark:bg-blue-500/20 rounded-full blur-2xl" />
                      
                      {/* Secondary Glow - Subtle Blue */}
                      <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-tr from-blue-100/30 dark:from-blue-500/20 to-sky-100/20 dark:to-cyan-500/10 rounded-full blur-2xl" />

                      {/* Photo Container - Squircle Shape with Easter Eggs */}
                      <SecretTooltip>
                        <div 
                          className="relative w-[200px] md:w-[260px] aspect-[3/4] overflow-hidden shadow-lg shadow-zinc-400/25"
                          style={{
                            borderRadius: '24% 76% 35% 65% / 27% 36% 64% 73%',
                          }}
                        >
                          <InteractivePhoto
                            src="/images/hero-profile.jpg"
                            alt="Dhwani Suthar"
                          />
                        </div>
                      </SecretTooltip>

                      {/* Mantra Quote Card - Overlapping Bottom Left */}
                      <div 
                        className={cn(
                          "absolute -bottom-4 -left-4 z-20",
                          "backdrop-blur-md bg-white/90 dark:bg-zinc-900/90",
                          "border-l-2 border-blue-600 dark:border-blue-400",
                          "shadow-md shadow-zinc-200/50 dark:shadow-black/30",
                          "p-2.5 rounded-r-lg rounded-l-sm",
                          "max-w-[180px]",
                          "animate-float"
                        )}
                      >
                        {/* Quote Icon */}
                        <span className="text-lg text-zinc-200 dark:text-zinc-700 font-serif leading-none absolute -top-0.5 left-1">"</span>
                        
                        {/* Quote Text */}
                        <p className="font-serif italic text-zinc-700 dark:text-zinc-300 text-[10px] leading-relaxed pt-1.5">
                          The discomfort you feel before doing something big is just the sensation of growth.
                        </p>
                        
                        {/* Attribution */}
                        <p className="text-[8px] text-zinc-400 dark:text-zinc-500 font-sans mt-1.5 uppercase tracking-wider">
                          - Note to self
                        </p>
                      </div>

                      {/* Signature Badge - Top Right */}
                      <div className="absolute -top-3 -right-3 z-20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 shadow-md shadow-zinc-200/50 dark:shadow-black/30 px-3 py-1.5 rounded-lg">
                        <p className="text-base text-zinc-700 dark:text-zinc-300 font-[family-name:var(--font-dancing)]">
                          Dhwani Suthar
                        </p>
                      </div>
                    </div>
                  </MotionWrapper>
                </div>
              </div>
            </div>
            
            {/* Scroll Hint */}
            <ScrollHint />
          </section>
        </HeroSpotlight>

        {/* === PROJECTS BENTO GRID === */}
        <section id="projects" className="relative py-12 scroll-mt-12 bg-gray-50 dark:bg-zinc-900">
          {/* Dot Grid Background */}
          <div 
            className="absolute inset-0 pointer-events-none dark:opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(148, 163, 184, 0.25) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <MotionWrapper>
              <div className="mb-6">
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-1.5">
                  Selected Work
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  Engineering Projects & Case Studies
                </h2>
              </div>
            </MotionWrapper>

            <ProjectGrid />

            <MotionWrapper delay={0.4}>
              <div className="mt-6 text-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors group"
                >
                  View All Projects
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </MotionWrapper>
          </div>
        </section>

        {/* === ABOUT SECTION === */}
        <AboutSection />

        {/* === LATEST WRITING === */}
        <BlogSection />

        {/* === TESTIMONIALS === */}
        <section className="relative py-10 bg-white dark:bg-zinc-950">
          {/* Dot Grid Background */}
          <div 
            className="absolute inset-0 pointer-events-none dark:opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(148, 163, 184, 0.25) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <MotionWrapper>
              <div className="mb-6">
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-1.5">
                  Feedback
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  Collaborations & Reviews
                </h2>
              </div>
            </MotionWrapper>
            <Testimonials />
          </div>
        </section>

        {/* === CTA FOOTER === */}
        <section id="contact" className="relative py-12 overflow-hidden scroll-mt-12 bg-gray-50 dark:bg-zinc-900">
          {/* Dot Grid Background */}
          <div 
            className="absolute inset-0 pointer-events-none dark:opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(148, 163, 184, 0.25) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          {/* Ambient Glow - Soft Blue */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-blue-500/5 via-sky-500/8 to-blue-500/5 dark:from-blue-500/10 dark:via-cyan-500/15 dark:to-blue-500/10 rounded-full blur-[80px]" />
          </div>

          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <MotionWrapper>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-3">
                Ready to build
                <br />
                <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-zinc-700 dark:from-blue-400 dark:via-cyan-400 dark:to-zinc-300 text-transparent bg-clip-text">
                  scalable data systems?
                </span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-6 max-w-md mx-auto text-xs">
                Let&apos;s discuss how I can help architect high-performance
                pipelines and cost-optimized infrastructure for your team.
              </p>
              <button
                onClick={() => setIsContactModalOpen(true)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full",
                  "bg-blue-600 text-white font-medium text-xs",
                  "hover:bg-blue-700 transition-all duration-300",
                  "shadow-md shadow-blue-200 dark:shadow-blue-500/20",
                  "hover:shadow-lg hover:shadow-blue-300 dark:hover:shadow-blue-500/30",
                  "hover:-translate-y-0.5 active:translate-y-0"
                )}
              >
                Get in Touch
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </MotionWrapper>
          </div>
        </section>

        {/* === FOOTER === */}
        <Footer />
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
