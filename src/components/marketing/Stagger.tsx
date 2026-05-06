"use client";

import { motion, type MotionProps } from "framer-motion";
import { type ReactNode } from "react";

export function StaggerContainer({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.08,
  ...props
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
} & Omit<MotionProps, "children">) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      variants={{
        hidden: {},
        show: { transition: { delayChildren, staggerChildren } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 14,
  ...props
}: {
  children: ReactNode;
  className?: string;
  y?: number;
} & Omit<MotionProps, "children">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.61, 0.35, 1] } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

