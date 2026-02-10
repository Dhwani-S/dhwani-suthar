"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function MotionWrapper({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
  direction = "up",
}: MotionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-50px" });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 30, x: 0 };
      case "down":
        return { y: -30, x: 0 };
      case "left":
        return { y: 0, x: 30 };
      case "right":
        return { y: 0, x: -30 };
      case "none":
        return { y: 0, x: 0 };
      default:
        return { y: 30, x: 0 };
    }
  };

  const initialPosition = getInitialPosition();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initialPosition }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : initialPosition.y,
        x: isInView ? 0 : initialPosition.x,
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
