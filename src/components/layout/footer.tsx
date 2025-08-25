"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const [activeTab, setActiveTab] = useState("Sri Lanka");
  const [isLoading, setIsLoading] = useState(true);
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const footerLinks = {
    products: [
      { name: "Online Payment", href: "#" },
      { name: "Cross Border Payments", href: "#" },
      { name: "Payment Links", href: "#" },
      { name: "Payment Page", href: "#" },
      { name: "SMS Pay", href: "#" },
      { name: "Recurring Billing", href: "#" },
      { name: "Invoicing", href: "#" },
      { name: "Fraud Management", href: "#" },
      { name: "Integrations", href: "#" },
    ],
    quickLinks: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Help Guide", href: "#" },
      { name: "Status", href: "#" },
      { name: "Developer Doc", href: "#" },
    ],
    solutions: [
      { name: "Travel & Hospitality", href: "#" },
      { name: "Education", href: "#" },
      { name: "Transport", href: "#" },
      { name: "Healthcare", href: "#" },
    ],
    resources: [
      { name: "API", href: "#" },
      { name: "Blogs", href: "/blog" },
    ],
  };

  const tabContent = {
    "Sri Lanka":
      "OneTicket Sri Lanka is your premier platform for discovering and hosting events across the island. From bustling Colombo concerts to serene Kandy festivals, we provide seamless ticketing solutions for organizers and attendees alike.",
    Japan:
      "OneTicket Japan offers a gateway to the vibrant world of Japanese events. Whether it's a traditional cultural festival, a pop-culture convention in Tokyo, or a sports event, our platform ensures a smooth and reliable ticketing experience.",
    "All Other Countries":
      "OneTicket operates globally, providing comprehensive event management and ticketing services in numerous countries. Our platform is licensed to handle Domestic and Cross-Border transactions, ensuring secure and efficient service for our partners and customers worldwide.",
  };

  return (
    <motion.footer
      ref={footerRef}
      style={{
        backgroundImage: "linear-gradient(45deg, #051B13, #0D6340, #004126)",
      }}
      className="text-white relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            className="md:col-span-2"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <motion.img
              src="/images/logo.png"
              alt="OneTicket"
              className="h-10 mb-6 filter brightness-0 invert"
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.p
              className="text text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              OneTicket is an intellectual property of Spemai(PVT) Ltd.
            </motion.p>
            <motion.p
              className="text text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Connect with us online for the latest product and company updates
            </motion.p>
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {[
                { src: "/images/social/social1.png", alt: "Facebook" },
                { src: "/images/social/social2.png", alt: "Instagram" },
                { src: "/images/social/social3.png", alt: "Twitter" },
                { src: "/images/social/social4.png", alt: "Linkedin" },
              ].map((social, index) => (
                <motion.div
                  key={social.alt}
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                    filter: "brightness(1.2)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1, rotate: 0 }
                      : { opacity: 0, scale: 0, rotate: 0 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.3,
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                >
                  <Link href="#" className="block">
                    <img src={social.src} alt={social.alt} className="h-10" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          {[
            { title: "Products", links: footerLinks.products },
            { title: "Quick Links", links: footerLinks.quickLinks },
          ].map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              <motion.h3
                className="text-sm font-semibold tracking-wider uppercase mb-4"
                whileHover={{ color: "#18C67D" }}
                transition={{ duration: 0.2 }}
              >
                {section.title}
              </motion.h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{
                      delay: 0.8 + sectionIndex * 0.1 + linkIndex * 0.05,
                      duration: 0.4,
                    }}
                  >
                    <motion.div
                      whileHover={{ x: 5, color: "#18C67D" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-gray-300 hover:text-[#18C67D] transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h3
              className="text-sm font-semibold tracking-wider uppercase mb-4"
              whileHover={{ color: "#18C67D" }}
              transition={{ duration: 0.2 }}
            >
              Solutions
            </motion.h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 1.0 + index * 0.05, duration: 0.4 }}
                >
                  <motion.div
                    whileHover={{ x: 5, color: "#18C67D" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-[#18C67D] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>

            <motion.h3
              className="text-sm font-semibold tracking-wider uppercase my-4"
              whileHover={{ color: "#18C67D" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.4, type: "tween" }}
            >
              Resources
            </motion.h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 1.3 + index * 0.05, duration: 0.4 }}
                >
                  <motion.div
                    whileHover={{ x: 5, color: "#18C67D" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-[#18C67D] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 border-t border-gray-400 pt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className="relative flex space-x-8 text-sm">
            {Object.keys(tabContent).map((tab, index) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 pb-2 transition-colors duration-300 cursor-pointer ${
                  activeTab === tab
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#18C67D]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                {tab}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 min-h-[60px]"
              >
                <div className="animate-pulse space-y-2">
                  <div className="h-3 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-600 rounded w-full"></div>
                  <div className="h-3 bg-gray-600 rounded w-5/6"></div>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-4 text-xs text-gray-200 min-h-[60px] leading-relaxed"
              >
                {tabContent[activeTab as keyof typeof tabContent]}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <motion.div
        className="bg-[#F6F7F9] py-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            className="text-center text-xs text-gray-600"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 2.2, duration: 0.4 }}
            whileHover={{
              scale: 1.02,
              color: "#0D6340",
            }}
          >
            Copyright © {new Date().getFullYear()} OneTicket. All rights
            Reserved.
          </motion.p>
        </div>
      </motion.div>
    </motion.footer>
  );
}
