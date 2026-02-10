"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, BarChart3, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SystemStatus } from "@/components/ui/SystemStatus";

const socialLinks = [
  {
    href: "https://github.com/dhwanisuthar",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://linkedin.com/in/dhwanisuthar",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "mailto:dhwani.suthar@example.com",
    label: "Email",
    icon: Mail,
  },
];

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Latest Posts" },
      { href: "/projects", label: "Case Studies" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border bg-card/30">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-foreground/80 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="text-foreground">Dhwani Suthar</span>
            </Link>

            <p className="mt-4 text-sm text-muted-foreground">
              FinOps Tooling Engineer & Data Specialist. Building cloud cost 
              optimization engines with PySpark, Airflow & GenAI.
            </p>

            {/* Social links */}
            <div className="mt-4 flex items-center gap-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                    "bg-secondary hover:bg-cyan-500/10",
                    "text-muted-foreground hover:text-cyan-500",
                    "transition-colors duration-200"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer link columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-cyan-500 transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* System Status Widget */}
          <div className="lg:col-span-1">
            <SystemStatus />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Dhwani Suthar. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 hover:underline underline-offset-4"
            >
              Next.js
            </a>
            {" & "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 hover:underline underline-offset-4"
            >
              Tailwind
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
