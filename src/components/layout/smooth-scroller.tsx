"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export function SmoothScroller() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    try {
      lenis = new Lenis({
        lerp: 0.08, // Increased for faster response
        duration: 1.2, // Smoother transitions
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      });

      // Make lenis globally accessible
      window.lenis = lenis;

      function raf(time: number) {
        if (lenis) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
      }

      rafId = requestAnimationFrame(raf);
    } catch (error) {
      console.warn("Lenis initialization failed:", error);
    }

    return () => {
      try {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        if (lenis) {
          lenis.destroy();
        }
        window.lenis = undefined;
      } catch (error) {
        console.warn("Lenis cleanup failed:", error);
      }
    };
  }, []);

  return null;
}
