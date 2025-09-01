"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface AgendaItemProps {
  time: string;
  date: string;
  title: string;
  description: string;
  location: string;
  tag: string;
  color: string;
  track?: string;
}

function AgendaItem({
  time,
  date,
  title,
  description,
  location,
  tag,
  color,
  track,
}: AgendaItemProps) {
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
      <div className="flex items-center justify-between mb-2">
        <motion.p
          className="text-base font-bold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {time}
        </motion.p>
        <motion.span
          className="text-xs px-4 py-1 rounded-full bg-emerald-100 border border-[#0E5344] text-[#0E5344] font-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          {tag}
        </motion.span>
      </div>

      {track && (
        <motion.div
          className="mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 border border-blue-300 text-blue-700 font-medium">
            {track}
          </span>
        </motion.div>
      )}

      <motion.div
        className="text-xs text-muted-foreground mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="mr-4">{date}</span>
        <span className="flex items-center">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 0 119.9 9.9L10 18.9l-4.95-4.95a7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {location}
        </span>
      </motion.div>

      <motion.h4
        className="font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
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

function groupByTime(agenda: AgendaItemProps[]) {
  const grouped: { time: string; items: AgendaItemProps[] }[] = [];
  agenda.forEach((item) => {
    const existing = grouped.find((g) => g.time === item.time);
    if (existing) {
      existing.items.push(item);
    } else {
      grouped.push({ time: item.time, items: [item] });
    }
  });
  return grouped;
}

const day1Agenda = [
  {
    time: "09:00 AM – 09:30 AM",
    date: "29 September 2025",
    title: "Opening Ceremony & Welcome Address",
    description:
      "Speech by the President on the AI Framework and establishment of Center for AI Excellence (AI Fund)",
    location: "Main Auditorium",
    tag: "Opening",
    color: "#F0F8FF",
  },
  {
    time: "09:30 AM – 10:15 AM",
    date: "29 September 2025",
    title:
      "Keynote 1: National AI Strategy – Contributing to Sri Lanka's Digital Economy",
    description:
      "National AI Strategy – Contributing to Sri Lanka's Digital Economy",
    location: "Main Auditorium",
    tag: "Keynote",
    color: "#F0FFF0",
  },
  {
    time: "10:15 AM – 11:00 AM",
    date: "29 September 2025",
    title: "Panel: AI Implementation Challenges – From Investment to Impact",
    description: "AI Implementation Challenges – From Investment to Impact",
    location: "Main Auditorium",
    tag: "Session",
    color: "#FFFFF0",
  },
  {
    time: "11:00 AM – 11:15 AM",
    date: "29 September 2025",
    title: "Tea Break",
    description: "Networking opportunity with refreshments.",
    location: "Exhibition Hall",
    tag: "Break",
    color: "#FFF5EE",
  },
  {
    time: "11:15 AM – 12:00 PM",
    date: "29 September 2025",
    title: "Keynote 2: Responsible AI – Ethics, Governance & Trust",
    description: "Responsible AI – Ethics, Governance & Trust",
    location: "Main Auditorium",
    tag: "Keynote",
    color: "#F5FFFA",
  },
  {
    time: "12:00 PM – 12:45 PM",
    date: "29 September 2025",
    title: "Fireside Chat: Global Lessons in AI Strategy Execution",
    description: "Global Lessons in AI Strategy Execution",
    location: "Main Auditorium",
    tag: "Session",
    color: "#FFF0F5",
  },
  {
    time: "12:45 PM – 02:00 PM",
    date: "29 September 2025",
    title: "Lunch Break",
    description: "Connect with speakers and attendees over lunch.",
    location: "Garden Terrace",
    tag: "Break",
    color: "#F0FFF0",
  },
  {
    time: "02:00 PM – 02:45 PM",
    date: "29 September 2025",
    title:
      "Speech: AI Strategy Enablement – Policy, Infrastructure & Data Governance",
    description:
      "AI Strategy Enablement – Policy, Infrastructure & Data Governance",
    location: "Room A",
    tag: "Session",
    color: "#F0F8FF",
    track: "Track A",
  },
  {
    time: "02:00 PM – 02:45 PM",
    date: "29 September 2025",
    title: "AI for Business Strategy – ROI, Efficiency & Innovation",
    description: "AI for Business Strategy – ROI, Efficiency & Innovation",
    location: "Room B",
    tag: "Session",
    color: "#F5FFFA",
    track: "Track B",
  },
  {
    time: "02:45 PM – 03:30 PM",
    date: "29 September 2025",
    title:
      "Panel: Citizen Services Powered by AI – Health, Education, Public Safety",
    description:
      "Citizen Services Powered by AI – Health, Education, Public Safety",
    location: "Room A",
    tag: "Session",
    color: "#FFFFF0",
    track: "Track A",
  },
  {
    time: "02:45 PM – 03:30 PM",
    date: "29 September 2025",
    title: "Panel: Sector-Specific AI Applications – Telco, Finance, Retail",
    description: "Sector-Specific AI Applications – Telco, Finance, Retail",
    location: "Room B",
    tag: "Session",
    color: "#FFF0F5",
    track: "Track B",
  },
  {
    time: "03:30 PM – 04:00 PM",
    date: "29 September 2025",
    title: "Speech: Bridging Generational Gaps in AI Literacy",
    description: "Bridging Generational Gaps in AI Literacy",
    location: "Room A",
    tag: "Session",
    color: "#F0FFF0",
    track: "Track A",
  },
  {
    time: "03:30 PM – 04:00 PM",
    date: "29 September 2025",
    title:
      "Speech: Talent & Skills & Building the Culture for AI-Driven Enterprises",
    description:
      "Talent & Skills & Building the Culture for AI-Driven Enterprises",
    location: "Room B ",
    tag: "Session",
    color: "#F5FFFA",
    track: "Track B",
  },
  {
    time: "04:00 PM – 04:30 PM",
    date: "29 September 2025",
    title: "Panel: Localizing AI for Sri Lanka – Language, Culture & Access",
    description: "Localizing AI for Sri Lanka – Language, Culture & Access",
    location: "Room A",
    tag: "Session",
    color: "#FFF5EE",
    track: "Track A",
  },
  {
    time: "04:00 PM – 04:30 PM",
    date: "29 September 2025",
    title: "Panel: Scaling AI in SMEs & Corporates",
    description: "Scaling AI in SMEs & Corporates",
    location: "Room B",
    tag: "Session",
    color: "#F0F8FF",
    track: "Track B",
  },
  {
    time: "04:30 PM – 05:30 PM",
    date: "29 September 2025",
    title: "Afternoon Tea Break",
    description: "Networking opportunity with refreshments.",
    location: "Exhibition Hall",
    tag: "Break",
    color: "#FFFFF0",
  },
];

const day2Agenda = [
  {
    time: "09:00 AM – 09:30 AM",
    date: "30 September 2025",
    title: "Day 2 Opening",
    description: "Start of Day 2 activities",
    location: "Main Auditorium",
    tag: "Opening",
    color: "#F0F8FF",
  },
  {
    time: "09:30 AM – 10:15 AM",
    date: "30 September 2025",
    title: "Keynote 1: AI Adoption Challenges – Skills, Localization & Inclusion",
    description:
      "AI Adoption Challenges – Skills, Localization & Inclusion. Case Study from Singapore.",
    location: "Main Auditorium",
    tag: "Keynote",
    color: "#F0FFF0",
  },
  {
    time: "10:15 AM – 11:00 AM",
    date: "30 September 2025",
    title: "Panel: Building AI Talent Pipelines for National Growth",
    description: "Building AI Talent Pipelines for National Growth",
    location: "Main Auditorium",
    tag: "Session",
    color: "#FFFFF0",
  },
  {
    time: "11:00 AM – 11:15 AM",
    date: "30 September 2025",
    title: "Tea Break",
    description: "Networking opportunity with refreshments.",
    location: "Exhibition Hall",
    tag: "Break",
    color: "#FFF5EE",
  },
  {
    time: "11:15 AM – 12:00 PM",
    date: "30 September 2025",
    title: "Keynote 2: National ambitions meets market reality",
    description:
      "Public-private cooperations in AI Use Case Implementation.",
    location: "Main Auditorium",
    tag: "Keynote",
    color: "#F5FFFA",
  },
  {
    time: "12:00 PM – 12:45 PM",
    date: "30 September 2025",
    title: "Fireside Chat: Sector Innovation",
    description: "AI in Telecom, Agriculture, Healthcare, BFSI",
    location: "Main Auditorium",
    tag: "Session",
    color: "#FFF0F5",
  },
  {
    time: "12:45 PM – 02:00 PM",
    date: "30 September 2025",
    title: "Lunch Break",
    description: "Explore the exhibition hall and connect with sponsors.",
    location: "Expo Hall",
    tag: "Break",
    color: "#F0FFF0",
  },
  {
    time: "02:00 PM – 02:45 PM",
    date: "30 September 2025",
    title: "Speech: AI for Inclusive Governance – Reaching Every Citizen",
    description: "AI for Inclusive Governance – Reaching Every Citizen",
    location: "Room A",
    tag: "Session",
    color: "#FFFFF0",
    track: "Track A",
  },
  {
    time: "02:00 PM – 02:45 PM",
    date: "30 September 2025",
    title: "Speech: AI in Work Augmentation, Automation & Autonomous Operations",
    description: "AI in Work Augmentation, Automation & Autonomous Operations",
    location: "Room B",
    tag: "Session",
    color: "#FFFFF0",
    track: "Track B",
  },
  {
    time: "02:45 PM – 03:30 PM",
    date: "30 September 2025",
    title: "Panel: AI for National Resilience – Climate, Disaster, Health",
    description: "AI for National Resilience – Climate, Disaster, Health",
    location: "Room A",
    tag: "Session",
    color: "#F0F8FF",
    track: "Track A",
  },
  {
    time: "02:45 PM – 03:30 PM",
    date: "30 September 2025",
    title: "Panel: AI in Customer Experience & Personalization",
    description: "AI in Customer Experience & Personalization",
    location: "Room B",
    tag: "Session",
    color: "#F0F8FF",
    track: "Track B",
  },
  {
    time: "03:30 PM – 04:00 PM",
    date: "30 September 2025",
    title: "Workshop: Designing Citizen-Centric AI Services",
    description: "Designing Citizen-Centric AI Services",
    location: "Room A",
    tag: "Session",
    color: "#FFF5EE",
    track: "Track A",
  },
  {
    time: "03:30 PM – 04:00 PM",
    date: "30 September 2025",
    title: "Workshop: Building AI-Ready Business Models",
    description: "Alternative Hyperscaler Hands-on session",
    location: "Room B",
    tag: "Session",
    color: "#FFF5EE",
    track: "Track B",
  },
  {
    time: "04:00 PM – 04:30 PM",
    date: "30 September 2025",
    title: "Tea Break",
    description: "Networking opportunity with refreshments.",
    location: "Exhibition Hall",
    tag: "Break",
    color: "#F0FFF0",
  },
  {
    time: "04:00 PM – 04:30 PM",
    date: "30 September 2025",
    title: "Awards & Recognitions",
    description: "Hackathon / Stalls / Open Innovation",
    location: "Main Auditorium",
    tag: "Ceremony",
    color: "#F5FFFA",
  },
  {
    time: "04:30 PM – 05:00 PM",
    date: "30 September 2025",
    title: "Closing Keynote and Future Roadmap",
    description: "Vision for the future of AI and its impact on society.",
    location: "Main Auditorium",
    tag: "Keynote",
    color: "#F0FFF0",
  },
  {
    time: "05:00 PM – 05:15 PM",
    date: "30 September 2025",
    title: "Vote of Thanks",
    description: "Closing remarks and acknowledgments.",
    location: "Main Auditorium",
    tag: "Ceremony",
    color: "#FFF0F5",
  },
  {
    time: "05:15 PM onwards",
    date: "30 September 2025",
    title: "Cocktails & Networking",
    description: "End the conference with cocktails and networking opportunities.",
    location: "Garden Terrace",
    tag: "Networking",
    color: "#F5FFFA",
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
            {groupByTime(
              day1Agenda.slice(0, showFullAgenda ? day1Agenda.length : 4)
            ).map((group, groupIndex) => (
              <motion.div
                key={group.time}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: groupIndex * 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className={`grid gap-4 ${
                  group.items.length > 1 ? "sm:grid-cols-2" : "sm:grid-cols-1"
                }`}
              >
                {group.items.map((item) => (
                  <AgendaItem key={item.title} {...item} />
                ))}
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
            className="relative"
          >
            {groupByTime(
              day2Agenda.slice(0, showFullAgenda ? day2Agenda.length : 4)
            ).map((group, groupIndex) => (
              <motion.div
                key={group.time}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: groupIndex * 0.1,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className={`grid gap-4 ${
                  group.items.length > 1 ? "sm:grid-cols-2" : "sm:grid-cols-1"
                }`}
              >
                {group.items.map((item) => (
                  <AgendaItem key={item.title} {...item} />
                ))}
              </motion.div>
            ))}

            <AnimatePresence mode="wait">
              {!showFullAgenda && (
                <motion.div
                  key="see-more-overlay-day2"
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
                  key="see-less-button-day2"
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
      </AnimatePresence>
    </div>
  );
}
