"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExperienceData {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  highlight: string;
  /**
   * Path to company logo image.
   * Place your logo files in /public/logos/ folder
   * Example: "/logos/motorola.png"
   * 
   * For now using placeholders - replace with real logos later:
   * - Motorola: /public/logos/motorola.png
   * - Mastek: /public/logos/mastek.png  
   * - Jio: /public/logos/jio.png
   */
  logo: string;
  /** Optional company tagline/mission statement */
  companyQuote?: string;
}

interface ExperienceCardProps {
  experience: ExperienceData;
  index: number;
}

export function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={cn(
        "p-6 rounded-xl border border-border",
        "bg-card/70 backdrop-blur-sm",
        "hover:border-cyan-500/30 transition-all duration-300",
        "group"
      )}
    >
      <div className="flex gap-5">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          <div
            className={cn(
              "w-[60px] h-[60px] rounded-xl overflow-hidden",
              "bg-secondary/50 border border-border",
              "flex items-center justify-center",
              "group-hover:border-cyan-500/30 transition-colors"
            )}
          >
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              width={60}
              height={60}
              className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-300"
              unoptimized
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-cyan-500 transition-colors">
                {experience.title}
              </h3>
              <p className="text-base font-medium text-foreground/80">
                {experience.company}
              </p>
            </div>
            {/* Highlight Badge */}
            <span className="inline-flex items-center self-start px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold whitespace-nowrap">
              {experience.highlight}
            </span>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {experience.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {experience.period}
            </span>
          </div>

          {/* Description */}
          <ul className="space-y-2 mb-4">
            {experience.description.map((item, i) => (
              <li
                key={i}
                className="text-sm text-muted-foreground flex items-start gap-2"
              >
                <span className="text-cyan-500 mt-1 flex-shrink-0">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-secondary text-secondary-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Company Quote (Special touch for Motorola) */}
          {experience.companyQuote && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-5 pt-4 border-t border-border/50"
            >
              <div className="flex items-start gap-2">
                <Quote className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                <p className="text-sm italic text-muted-foreground">
                  {experience.companyQuote}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ExperienceCard;
