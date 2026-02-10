"use client";

import { motion } from "framer-motion";
import { TrendingUp, Database, Target } from "lucide-react";

/**
 * Trust Ticker - Social proof metrics ribbon
 */

const metrics = [
  {
    value: "$1.5M+",
    label: "Cloud Costs Saved",
    icon: TrendingUp,
    color: "text-emerald-500",
  },
  {
    value: "50TB+",
    label: "Data Processed/Day",
    icon: Database,
    color: "text-blue-500",
  },
  {
    value: "99.9%",
    label: "Chargeback Accuracy",
    icon: Target,
    color: "text-purple-500",
  },
];

export function TrustTicker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="w-full"
    >
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-0 md:divide-x divide-gray-200 dark:divide-gray-700">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
            className="flex items-center gap-3 px-6 md:px-8 py-2"
          >
            <metric.icon className={`w-5 h-5 ${metric.color} opacity-70`} />
            <div>
              <p className={`text-2xl md:text-3xl font-bold ${metric.color}`}>
                {metric.value}
              </p>
              <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-medium">
                {metric.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default TrustTicker;
