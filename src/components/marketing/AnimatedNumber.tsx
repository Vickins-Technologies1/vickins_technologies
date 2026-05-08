"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimatedNumber({
  to,
  duration = 1.15,
}: {
  to: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!isInView) return;
    const controls = animate(motionValue, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [duration, isInView, motionValue, prefersReducedMotion, to]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {prefersReducedMotion ? to : rounded}
    </motion.span>
  );
}
