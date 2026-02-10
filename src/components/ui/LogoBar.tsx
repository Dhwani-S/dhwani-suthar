"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Logo Bar - Grayscale company logos with hover effect
 */
const companies = [
  {
    name: "Motorola Solutions",
    // Using simple icons CDN for Motorola
    logo: "https://cdn.simpleicons.org/motorola/000000",
    width: 140,
  },
  {
    name: "Mastek",
    logo: "/logos/mastek.png",
    width: 100,
  },
  {
    name: "Jio",
    logo: "/logos/jio.png",
    width: 60,
  },
];

export function LogoBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="flex flex-wrap items-center justify-center gap-12 md:gap-16"
    >
      {companies.map((company) => (
        <div
          key={company.name}
          className="group transition-all duration-300 grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
        >
          {company.logo ? (
            <Image
              src={company.logo}
              alt={company.name}
              width={company.width}
              height={40}
              className="h-8 w-auto object-contain"
              unoptimized
            />
          ) : (
            // Text fallback for companies without icons
            <span className="text-2xl font-bold text-zinc-900 tracking-tight">
              {company.name}
            </span>
          )}
        </div>
      ))}
    </motion.div>
  );
}

export default LogoBar;
