"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function SiteBackdrop() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const gridY = useTransform(scrollY, [0, 1400], [0, shouldReduceMotion ? 0 : 80]);
  const panelsY = useTransform(scrollY, [0, 1400], [0, shouldReduceMotion ? 0 : 40]);
  const glowY = useTransform(scrollY, [0, 1400], [0, shouldReduceMotion ? 0 : 120]);
  const glowOpacity = useTransform(scrollY, [0, 900], [1, 0.75]);

  return (
    <div aria-hidden="true" className="site-backdrop">
      <div className="site-backdrop__base" />

      <motion.div className="site-backdrop__glow site-backdrop__glow--a" style={{ y: glowY, opacity: glowOpacity }} />
      <motion.div className="site-backdrop__glow site-backdrop__glow--b" style={{ y: glowY, opacity: glowOpacity }} />

      <motion.div className="site-backdrop__grid" style={{ y: gridY }} />
      <motion.div className="site-backdrop__panels" style={{ y: panelsY }} />
      <div className="site-backdrop__noise" />

      <div className="site-backdrop__fade" />
    </div>
  );
}

