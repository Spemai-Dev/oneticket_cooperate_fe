"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin, MapPin, Phone } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const [isLoading, setIsLoading] = useState(true);
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://web.facebook.com/OneTicket.Onepay.lk?_rdc=1&_rdr#",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/oneticket.lk?igsh=MTFjYWUxeTA4cWdxZg%3D%3D",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/oneticket-lk/",
      icon: Linkedin,
    },
  ];

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
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
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
          {/* Company Info */}
          <motion.div
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
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.p
              className="text-gray-300 mb-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              OneTicket is an intellectual property of Spemai(PVT) Ltd.
              Providing cutting-edge ticketing solution for public, private and
              corporate events with seamless checkout experience.
            </motion.p>
            <motion.p
              className="text-gray-300 mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Connect with us online for the latest product and company updates
            </motion.p>
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {[
                {
                  src: "/images/social/social1.png",
                  alt: "Facebook",
                  href: "https://web.facebook.com/OneTicket.Onepay.lk?_rdc=1&_rdr#",
                },
                {
                  src: "/images/social/social2.png",
                  alt: "Instagram",
                  href: "https://www.instagram.com/oneticket.lk?igsh=MTFjYWUxeTA4cWdxZg%3D%3D",
                },
                {
                  src: "/images/social/social4.png",
                  alt: "Linkedin",
                  href: "https://www.linkedin.com/company/oneticket-lk/",
                },
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
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img src={social.src} alt={social.alt} className="h-10" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h3
              className="text-lg font-semibold tracking-wider uppercase mb-6"
              whileHover={{ color: "#18C67D" }}
              transition={{ duration: 0.2 }}
            >
              Contact Us
            </motion.h3>
            <div className="space-y-4">
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <MapPin className="w-5 h-5 text-gray-300  mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm leading-relaxed">
                  3rd Floor, 292, Richmond House,
                  <br />
                  Gamsabha Junction, High Level Road,
                  <br />
                  Nugegoda, Sri Lanka.
                </div>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                <Phone className="w-5 h-5 text-gray-300  flex-shrink-0" />
                <div className="text-gray-300 text-sm space-y-1">
                  <div>+94 72 274 5745</div>
                  <div>+94 76 052 3025</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.h3
              className="text-lg font-semibold tracking-wider uppercase mb-6"
              whileHover={{ color: "#18C67D" }}
              transition={{ duration: 0.2 }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-3">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: 1.0, duration: 0.4 }}
              >
                <motion.div
                  whileHover={{ x: 5, color: "#18C67D" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link target="_blank"
                    href="https://oneticket.lk/about_us"
                    className="text-gray-300 hover:text-[#18C67D] transition-colors duration-200 text-sm"
                  >
                    About Us
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: 1.0, duration: 0.4 }}
              >
                <motion.div
                  whileHover={{ x: 5, color: "#18C67D" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link target="_blank"
                    href="https://oneticket.lk/contact_us"
                    className="text-gray-300 hover:text-[#18C67D] transition-colors duration-200 text-sm"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: 1.1, duration: 0.4 }}
              >
                <motion.div
                  whileHover={{ x: 5, color: "#18C67D" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link target="_blank"
                    href="https://www.onepay.lk/spemai_privacy_policy.html"
                    className="text-gray-300 hover:text-[#18C67D] transition-colors duration-200 text-sm"
                  >
                    Privacy Policy
                  </Link>
                </motion.div>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 border-t border-gray-400 pt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className="text-center">
            <motion.p
              className="text-sm text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 1.6, duration: 0.4 }}
            >
              Providing cutting-edge online ticketing solution for public,
              private and corporate events with seamless checkout experience.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
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
