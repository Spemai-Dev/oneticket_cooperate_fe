"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface AgendaItemProps {
  time: string;
  title: string;
  description: string;
  color: string;
}

function AgendaItem({ time, title, description, color }: AgendaItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
      }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="py-4 px-6 rounded-3xl mb-2 border border-gray-200"
      style={{
        background: `linear-gradient(90deg, ${color} -10.98%, #FFFFFF 124.49%)`,
      }}
    >
      <motion.p
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {time}
      </motion.p>
      <motion.h4
        className="font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h4>
      {description && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <hr className="my-3" />
          <p className="text-sm text-muted-foreground">{description}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

const day1Agenda = [
  {
    time: "06:00 PM - 06:30 PM",
    title: "Guest Arrival & Welcome Drinks",
    description: "",
    color: "#F0F8FF",
  },
  {
    time: "06:30 PM - 06:45 PM",
    title: "Opening Ceremony",
    description: "Host's welcome speech and event introduction.",
    color: "#F0FFF0",
  },
  {
    time: "06:45 PM - 07:30 PM",
    title: "Keynote Address: Shaping Tomorrow's Business World",
    description:
      "An inspiring session on innovation and leadership in the corporate sector.",
    color: "#FFFFF0",
  },
  {
    time: "07:30 PM - 08:15 PM",
    title: "Panel Discussion: The Future of Corporate Collaboration",
    description:
      "Industry leaders share insights on trends, challenges, and opportunities.",
    color: "#FFF5EE",
  },
  {
    time: "08:15 PM - 08:30 PM",
    title: "Tea & Networking Break",
    description: "",
    color: "#F5FFFA",
  },
  {
    time: "08:30 PM - 09:15 PM",
    title: "Award Ceremony: Recognizing Excellence",
    description: "Celebrating outstanding performers and contributors.",
    color: "#FFF0F5",
  },
  {
    time: "09:15 PM - 10:45 PM",
    title: "Dinner & Networking",
    description:
      "A buffet dinner accompanied by live music and open networking.",
    color: "#F0FFF0",
  },
  {
    time: "10:45 PM - 11:15 PM",
    title: "Entertainment Segment",
    description: "Live band, dance act, or stand-up comedy performance.",
    color: "#F0F8FF",
  },
  {
    time: "11:15 PM - 11:45 PM",
    title: "Fireside Chat: Building Stronger Business Communities",
    description: "A casual yet insightful conversation with business leaders.",
    color: "#F5FFFA",
  },
  {
    time: "11:45 PM - 12:00 AM",
    title: "Closing Remarks & After-Party Launch",
    description:
      "Final words from the host followed by music and dancing until midnight.",
    color: "#FFF0F5",
  },
];

export function Agenda() {
  const [activeTab, setActiveTab] = useState("Day 1");
  const [showFullAgenda, setShowFullAgenda] = useState(false);

  return (
    <div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4 relative">
        <motion.div
          className="absolute inset-0 bg-gray-100 rounded-full hidden sm:block"
          initial={false}
          animate={{
            x: activeTab === "Day 1" ? 0 : "50%",
            width: activeTab === "Day 1" ? "50%" : "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="relative z-10 flex-1 sm:flex-none"
        >
          <Button
            onClick={() => setActiveTab("Day 1")}
            className={`w-full sm:w-auto rounded-full transition-all duration-300 text-sm sm:text-base px-4 sm:px-6 py-2 ${
              activeTab === "Day 1"
                ? "bg-[#0E5344] text-white hover:bg-[#0E5344]/90 border border-[#0E5344] shadow-lg"
                : "bg-white sm:bg-transparent text-[#344054] border border-gray-200 sm:border-0 hover:bg-gray-50 sm:hover:bg-transparent"
            }`}
          >
            Day 1 Agenda
          </Button>
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="relative z-10 flex-1 sm:flex-none"
        >
          <Button
            onClick={() => setActiveTab("Day 2")}
            className={`w-full sm:w-auto rounded-full transition-all duration-300 text-sm sm:text-base px-4 sm:px-6 py-2 ${
              activeTab === "Day 2"
                ? "bg-[#0E5344] text-white hover:bg-[#0E5344]/90 border border-[#0E5344] shadow-lg"
                : "bg-white sm:bg-transparent text-[#344054] border border-gray-200 sm:border-0 hover:bg-gray-50 sm:hover:bg-transparent"
            }`}
          >
            Day 2 Agenda
          </Button>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "Day 1" && (
          <motion.div
            key="day1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative"
          >
            {day1Agenda
              .slice(0, showFullAgenda ? day1Agenda.length : 4)
              .map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  <AgendaItem {...item} />
                </motion.div>
              ))}

            <AnimatePresence mode="wait">
              {!showFullAgenda && (
                <motion.div
                  key="see-more-overlay"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 right-0 z-10 pt-16 pb-4"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f6f7f9]/80 to-[#f6f7f9] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="relative z-10 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <motion.button
                      onClick={() => setShowFullAgenda(true)}
                      className="px-6 py-2 bg-[#0E5344] hover:bg-[#0E5344]/90 cursor-pointer text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-xs sm:text-sm"
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      See Full Agenda
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {showFullAgenda && (
                <motion.div
                  key="see-less-button"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                  className="text-center mt-4"
                >
                  <motion.button
                    onClick={() => setShowFullAgenda(false)}
                    className="px-6 py-2 bg-gray-100 text-xs  text-gray-500 cursor-pointer rounded-full border border-gray-200 font-semibold hover:bg-gray-200 transition-all duration-200"
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    See Less
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        {activeTab === "Day 2" && (
          <motion.div
            key="day2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative overflow-hidden"
          >
            <motion.div className="p-8 rounded-3xl bg-gradient-to-br from-[#0E5344] to-[#1a7a5c] text-white text-center relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative z-10"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                </motion.div>
                <motion.h3
                  className="text-xl font-bold mb-2"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Day 2 Agenda
                </motion.h3>
                <motion.p
                  className="text-white/80 text-sm"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Something amazing is coming soon...
                </motion.p>
                <motion.div
                  className="mt-4 flex justify-center space-x-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-white/60 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
