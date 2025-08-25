"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function Hero() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      className="mb-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={
          isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }
        }
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="overflow-hidden rounded-3xl"
      >
        <Image
          src="/images/corporateEvent/banner.jpg"
          alt="TMA 2025 APAC Regional Conference"
          width={1200}
          height={400}
          priority
          className="w-full h-auto"
        />
      </motion.div>
    </motion.section>
  );
}
