"use client";

import Link from "next/link";
import { Download, ArrowUpRight, Linkedin, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "/", sectionId: "home" },
  { label: "Projects", href: "/#projects", sectionId: "projects" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Writing", href: "/#writing", sectionId: "writing" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

// Latest article data - hardcoded
const latestArticle = {
  label: "LATEST INSIGHT",
  title: "📉 How to burn a hole in your Cloud Budget (while running a fever)",
  subtitle: "Fixing a 4-hour SQL timeout in 2 minutes.",
  href: "https://medium.com/@dhwani.suthar26",
};

function WritingNavLink({ href, isActive }: { href: string; isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Writing Nav Link */}
      <Link
        href={href}
        className={cn(
          "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
          isActive
            ? "text-zinc-900 dark:text-white bg-white dark:bg-white/10 shadow-sm"
            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
        )}
      >
        {isActive && (
          <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />
        )}
        <span className={isActive ? "ml-2" : ""}>Writing</span>
      </Link>

      {/* Hover Preview Card - Desktop Only */}
      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72",
          "hidden md:block", // Hide on mobile
          "transition-all duration-300 ease-out",
          isHovered 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        {/* Arrow pointer */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white/80 dark:bg-zinc-800/90 backdrop-blur-xl border-l border-t border-white/50 dark:border-white/10" />
        
        {/* Card */}
        <a
          href={latestArticle.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative block p-4 rounded-2xl",
            // Glassmorphism
            "bg-white/80 dark:bg-zinc-800/90 backdrop-blur-xl",
            "border border-white/50 dark:border-white/10",
            "shadow-xl shadow-black/10 dark:shadow-black/30",
            // Hover effect
            "hover:bg-white/90 dark:hover:bg-zinc-800 hover:shadow-2xl hover:shadow-black/15",
            "transition-all duration-200",
            "group"
          )}
        >
          {/* Label */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold tracking-[0.15em] text-zinc-400 dark:text-zinc-500 uppercase">
              {latestArticle.label}
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-zinc-200 dark:from-zinc-700 to-transparent" />
            <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
          </div>

          {/* Title */}
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-white leading-snug mb-1.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
            {latestArticle.title}
          </h4>

          {/* Subtitle */}
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
            {latestArticle.subtitle}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
            <span>Read on Medium</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </a>
      </div>
    </div>
  );
}

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState<string>("home");

  // Intersection Observer to track which section is in view
  useEffect(() => {
    const sectionIds = ["projects", "about", "writing", "contact"];
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is in upper-middle of viewport
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    // Also check if we're at the top of the page (Home)
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-2",
          "rounded-full",
          "backdrop-blur-md bg-white/75 dark:bg-zinc-900/80 border border-black/[0.06] dark:border-white/10",
          "shadow-lg shadow-black/[0.03] dark:shadow-black/30"
        )}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.sectionId;
          
          // Special handling for Writing link - show hover preview
          if (item.sectionId === "writing") {
            return <WritingNavLink key={item.href} href={item.href} isActive={isActive} />;
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                isActive
                  ? "text-zinc-900 dark:text-white bg-white dark:bg-white/10 shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10"
              )}
            >
              {isActive && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />
              )}
              <span className={isActive ? "ml-2" : ""}>{item.label}</span>
            </Link>
          );
        })}

        {/* Location Pill - Desktop Only */}
        <div className={cn(
          "hidden md:flex items-center gap-2 px-3 py-1.5 ml-1",
          "rounded-full",
          "bg-zinc-100/80 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10",
          "text-xs font-medium text-zinc-500 dark:text-zinc-400",
          "hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-zinc-300/80 dark:hover:border-white/20 hover:bg-zinc-100 dark:hover:bg-white/10",
          "transition-all duration-200",
          "cursor-default group"
        )}>
          <Globe className="w-3.5 h-3.5 text-emerald-500 group-hover:animate-[spin_3s_linear_infinite]" />
          <span>Bangalore, IN</span>
        </div>
        
        {/* Resume Button */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-2 px-4 py-2 ml-1",
            "text-sm font-medium text-white",
            "bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-full",
            "hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors duration-200",
            "shadow-md shadow-zinc-900/20 dark:shadow-white/10"
          )}
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Resume</span>
        </a>
      </div>
    </nav>
  );
}
