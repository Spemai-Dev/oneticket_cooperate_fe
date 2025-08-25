"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    ...options,
  });

  return { ref, isInView };
}

export function useScrollAnimationWithDelay(delay = 0, options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
    ...options,
  });
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return { ref, isInView, shouldAnimate };
}

export function useStaggeredScrollAnimation(
  itemCount: number,
  staggerDelay = 100
) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px",
  });
  const [animatedItems, setAnimatedItems] = useState(new Set<number>());

  useEffect(() => {
    if (isInView) {
      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          setAnimatedItems((prev) => new Set([...prev, i]));
        }, i * staggerDelay);
      }
    }
  }, [isInView, itemCount, staggerDelay]);

  return { ref, isInView, animatedItems };
}
