"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Testimonials - Editorial Style Reviews
 * Real recommendations from managers and clients
 */

const testimonials = [
  {
    id: 1,
    quote: "Dhwani is the 'Optimizing Oracle' for our FinOps Team. She doesn't just fix problems; she breaks them down with precision. If a critical issue arises, I know I can hand it to her and it will be resolved.",
    highlightPhrase: "Optimizing Oracle",
    name: "Deepthi Kommineni",
    role: "Engineering Manager",
    company: "Motorola Solutions",
    badge: "Leadership",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
    avatarBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    initials: "DK",
  },
  {
    id: 2,
    quote: "Her technical expertise and meticulous documentation were invaluable to the Supply Chain Dashboard. Dhwani's diligence turned a high-profile challenge into a successful deployment.",
    highlightPhrase: null,
    name: "Anthony Miller",
    role: "Software & EDI Consultant",
    company: "Huhtamaki (Australia)",
    badge: "Client Partner",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    avatarBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    initials: "AM",
  },
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  // Function to render quote with highlighted phrase
  const renderQuote = () => {
    if (!testimonial.highlightPhrase) {
      return testimonial.quote;
    }
    
    const parts = testimonial.quote.split(testimonial.highlightPhrase);
    return (
      <>
        {parts[0]}
        <span className="font-semibold not-italic text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-1 rounded">
          {testimonial.highlightPhrase}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className={cn(
        "relative p-6 rounded-2xl",
        "bg-white border border-zinc-200 shadow-sm",
        "dark:bg-white/5 dark:border-white/10",
        "hover:shadow-lg transition-shadow duration-300"
      )}
    >
      {/* Badge */}
      <span className={cn(
        "absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
        testimonial.badgeColor
      )}>
        {testimonial.badge}
      </span>

      {/* Large Watermark Quote */}
      <span 
        className="absolute top-2 right-4 text-5xl text-zinc-100 dark:text-zinc-800 font-bold select-none pointer-events-none"
      >
        "
      </span>
      
      {/* Quote Text - Clean Sans-Serif with Italics */}
      <p 
        className="font-medium italic text-zinc-700 dark:text-zinc-300 text-base leading-relaxed mb-6 relative z-10 mt-4"
      >
        {renderQuote()}
      </p>

      {/* Divider */}
      <div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-4" />

      {/* Author Info */}
      <div className="flex items-center gap-3">
        {/* Initials Avatar */}
        <div className={cn(
          "w-11 h-11 rounded-full flex items-center justify-center",
          "text-white font-bold text-sm shadow-md",
          testimonial.avatarBg
        )}>
          {testimonial.initials}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-zinc-900 dark:text-white text-sm truncate">
            {testimonial.name}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {testimonial.role}
          </p>
          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono truncate">
            {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          index={index}
        />
      ))}
    </div>
  );
}

export default Testimonials;
