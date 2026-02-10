"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function ScrollHint() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={scrollToProjects}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer group"
    >
      <span className="text-[10px] font-mono uppercase tracking-[0.15em] group-hover:tracking-[0.2em] transition-all">
        Explore Architecture
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </button>
  );
}
