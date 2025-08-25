"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";

export function Navigation() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0.95, 1]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.98]);
  const backdropBlur = useTransform(scrollY, [0, 100], [8, 12]);

  return (
    <motion.div
      className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] lg:w-full max-w-screen-2xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.header
        className="rounded-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2 sm:px-3 border border-white/20 shadow-lg"
        style={{
          opacity,
          scale,
          backdropFilter: `blur(${backdropBlur}px)`,
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className="container flex h-12 sm:h-14 max-w-screen-2xl items-center">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/">
                <img
                  src="/images/logo.png"
                  alt="OneTicket"
                  className="h-5 sm:h-6 px-1 sm:px-2"
                />
              </Link>
            </motion.div>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="default"
                  className="rounded-full bg-[#0E5344] hover:bg-[#0E5344]/90 text-white shadow-lg hover:shadow-xl transition-shadow duration-200 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
                >
                  User Login
                </Button>
              </motion.div>
            </nav>
          </div>
        </div>
      </motion.header>
    </motion.div>
  );
}
