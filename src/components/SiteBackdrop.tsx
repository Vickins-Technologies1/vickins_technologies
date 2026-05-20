"use client";

import { useReducedMotion } from "framer-motion";

export default function SiteBackdrop() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="site-backdrop" data-reduce-motion={shouldReduceMotion ? "true" : "false"}>
      <div className="site-backdrop__base" />

      <div className="site-backdrop__glow site-backdrop__glow--a" />
      <div className="site-backdrop__glow site-backdrop__glow--b" />

      <div className="site-backdrop__grid" />
      <div className="site-backdrop__panels" />
      <div className="site-backdrop__noise" />

      <div className="site-backdrop__fade" />
    </div>
  );
}
