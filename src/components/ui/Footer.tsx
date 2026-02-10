"use client";

import { Github, Linkedin, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Footer - Clean, minimal site footer
 */

const socialLinks = [
  { 
    name: "GitHub", 
    href: "https://github.com/dhwanisuthar", 
    icon: Github 
  },
  { 
    name: "LinkedIn", 
    href: "https://www.linkedin.com/in/dhwani-suthar/", 
    icon: Linkedin 
  },
  { 
    name: "Medium", 
    href: "https://medium.com/@dhwani.suthar26", 
    icon: BookOpen 
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Attribution */}
          <div className="text-center md:text-left">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Designed & Engineered by{" "}
              <span className="font-medium text-zinc-700 dark:text-zinc-300">Dhwani Suthar</span>
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300",
                  "bg-zinc-50 dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10",
                  "transition-all duration-200"
                )}
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
