"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLink {
  href: string;
  label: string;
  icon: typeof Linkedin;
  variant: "primary" | "secondary" | "dark";
}

const socialLinks: SocialLink[] = [
  {
    href: "https://linkedin.com/in/dhwanisuthar",
    label: "Connect",
    icon: Linkedin,
    variant: "primary",
  },
  {
    href: "mailto:dhwani.suthar@example.com",
    label: "Email Me",
    icon: Mail,
    variant: "secondary",
  },
  {
    href: "https://medium.com/@dhwanisuthar",
    label: "Read Blogs",
    icon: BookOpen,
    variant: "dark",
  },
];

const variantStyles = {
  primary: cn(
    "bg-[#0A66C2] hover:bg-[#004182] text-white",
    "shadow-lg shadow-[#0A66C2]/25 hover:shadow-[#0A66C2]/40"
  ),
  secondary: cn(
    "bg-secondary hover:bg-secondary/80 text-foreground",
    "border border-border hover:border-border/80"
  ),
  dark: cn(
    "bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700",
    "shadow-lg shadow-zinc-900/25 hover:shadow-zinc-900/40"
  ),
};

interface SocialDockProps {
  className?: string;
}

export function SocialDock({ className }: SocialDockProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center gap-3 sm:gap-4",
        className
      )}
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("mailto") ? undefined : "_blank"}
          rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2.5 rounded-full",
            "font-medium text-sm",
            "transition-all duration-200",
            "w-full sm:w-auto justify-center",
            variantStyles[link.variant]
          )}
        >
          <link.icon className="w-4 h-4" />
          {link.label}
        </motion.a>
      ))}
    </div>
  );
}

export default SocialDock;
