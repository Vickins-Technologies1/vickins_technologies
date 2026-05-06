"use client";

import { motion, type MotionProps } from "framer-motion";
import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
} & Omit<MotionProps, "children">;

export default function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  once = true,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-120px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.61, 0.35, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

