"use client";

import { motion } from "framer-motion";
import { Code, BookOpen, MapPin, Sparkles } from "lucide-react";

/**
 * Retention Ticker - Shows current activity/interests
 * Creates human connection by showing what you're currently doing
 */

const activities = [
  {
    icon: Code,
    label: "Currently hacking on",
    value: "Real-time Kafka Streams",
    color: "text-blue-500",
  },
  {
    icon: BookOpen,
    label: "Latest read",
    value: "Designing Data-Intensive Apps",
    color: "text-amber-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangalore, India",
    color: "text-emerald-500",
  },
  {
    icon: Sparkles,
    label: "Side project",
    value: "Oil painting landscapes",
    color: "text-violet-500",
  },
];

export function RetentionTicker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="w-full py-4 border-t border-zinc-100 bg-zinc-50/50"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          {activities.map((activity, index) => (
            <div key={activity.label} className="flex items-center gap-2">
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
              <span className="text-zinc-400">{activity.label}:</span>
              <span className="text-zinc-600 font-medium">{activity.value}</span>
              {index < activities.length - 1 && (
                <span className="hidden md:inline text-zinc-200 ml-6">•</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default RetentionTicker;
