"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AnimatedNumber({
  to,
  duration = 1.15,
}: {
  to: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [duration, isInView, motionValue, to]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {rounded}
    </motion.span>
  );
}

