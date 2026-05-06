"use client";

import { type ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function getScrollOffset() {
  if (typeof window === "undefined") return -80;
  const cssValue = getComputedStyle(document.documentElement).getPropertyValue("--nav-offset").trim();
  const parsed = Number.parseFloat(cssValue);
  return Number.isFinite(parsed) ? -parsed : -80;
}

export default function LenisRoot({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      const element = document.getElementById(id);
      if (!element) return;

      event.preventDefault();
      lenis.scrollTo(element, {
        offset: getScrollOffset(),
        duration: 1.05,
      });

      history.pushState(null, "", href);
    };

    document.addEventListener("click", handleAnchorClick);

    // If the page loads with a hash, scroll to it after hydration.
    const hash = window.location.hash?.slice(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        lenis.scrollTo(element, { offset: getScrollOffset(), immediate: true });
      }
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

