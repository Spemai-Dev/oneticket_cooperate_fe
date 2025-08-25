"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SpeakerProps {
  name: string;
  title: string;
  image: string;
  bio: string;
}

function Speaker({ name, title, image, bio }: SpeakerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling when dialog is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore background scrolling when dialog is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling if component unmounts while dialog is open
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={{
            rest: {
              scale: 1,
              y: 0,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            },
            hover: {
              scale: 1.02,
              y: -2,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            },
            tap: {
              scale: 0.98,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          className="flex py-3 sm:py-4 px-3 sm:px-4 items-center rounded-3xl border border-gray-200 bg-white cursor-pointer group"
        >
          <motion.div
            className="relative overflow-hidden rounded-full mr-3 sm:mr-4 flex-shrink-0"
            variants={{
              rest: {
                scale: 1,
                rotate: 0,
              },
              hover: {
                scale: 1.1,
                rotate: 5,
              },
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={image}
              alt={name}
              width={50}
              height={50}
              className="rounded-full transition-transform duration-300 group-hover:brightness-110 sm:w-[60px] sm:h-[60px]"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
            />
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold group-hover:text-[#0E5344] transition-colors duration-200 text-sm sm:text-base truncate">
              {name}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-gray-600 transition-colors duration-200 line-clamp-2">
              {title}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-[#0E5344] flex-shrink-0"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="sm:w-4 sm:h-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </motion.div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="p-0 w-[95vw] max-w-[95vw] sm:max-w-md md:max-w-lg max-h-[90vh] bg-white border-none rounded-lg overflow-hidden flex flex-col">
        <DialogTitle className="sr-only">{name}</DialogTitle>
        <DialogDescription className="sr-only">{bio}</DialogDescription>

        {/* Image Section with Skeleton */}
        <div className="relative flex-shrink-0 aspect-square">
          {!imageLoaded && <Skeleton className="w-full h-full rounded-none" />}
          <Image
            src={image}
            alt={name}
            width={800}
            height={800}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            priority
          />
          {imageLoaded && (
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/80 to-transparent" />
          )}
        </div>

        {/* Content Section with Skeleton */}
        <div className="p-4 sm:p-6 -mt-24 sm:-mt-32 relative z-10 overflow-y-auto flex-1">
          {!imageLoaded ? (
            // Skeleton Content
            <div className="bg-white rounded-t-lg p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ) : (
            // Actual Content
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                    {name}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {title}
                  </p>
                </div>
                <Button
                  className="flex items-center rounded-full px-3 sm:px-4 py-1 gap-2 text-xs sm:text-sm w-fit"
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {bio}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const speakers = [
  {
    name: "Ms. Anjali Perera",
    title: "CEO, Innovexa Global",
    image: "/images/corporateEvent/line1.jpg",
    bio: "Anjali Perera is a visionary business leader with over 15 years of experience in driving digital transformation across Asia's most competitive markets. As the CEO of Innovexa Global, she has led the company to become a regional powerhouse in enterprise software solutions and AI-driven business strategy. Known for her dynamic leadership style and forward-thinking mindset, Anjali is passionate about empowering businesses to embrace innovation, sustainability, and inclusive growth. She frequently speaks at international summits on leadership, future tech, and women in business. Under her leadership, Innovexa has expanded to 9 countries and was recently recognized among the 'Top 100 Future-Ready Companies in APAC.'",
  },
  {
    name: "Mr. Dinesh Rodrigo",
    title: "Business Editor, Daily Finance",
    image: "/images/corporateEvent/line2.jpg",
    bio: "Dinesh Rodrigo is a seasoned financial journalist and the Business Editor for Daily Finance, one of the region's most respected financial publications. With a sharp eye for market trends and economic shifts, he has been at the forefront of financial reporting for over a decade. His incisive analysis and in-depth articles have earned him numerous accolades. Dinesh is dedicated to demystifying complex financial topics for the public and providing actionable insights for investors and business leaders.",
  },
  {
    name: "Dr. Nuwan Abeysinghe",
    title: "CIO, NovaTech",
    image: "/images/corporateEvent/line3.jpg",
    bio: "Dr. Nuwan Abeysinghe is the Chief Information Officer at NovaTech, where he spearheads the company's technology strategy and digital innovation initiatives. With a Ph.D. in Computer Science and extensive experience in AI and machine learning, Dr. Abeysinghe has been instrumental in developing cutting-edge solutions that have propelled NovaTech to the forefront of the tech industry. He is a strong advocate for ethical AI and is passionate about leveraging technology to solve real-world problems.",
  },
  {
    name: "Ms. Melissa Jayawardena",
    title: "Head of HR, Emerge360",
    image: "/images/corporateEvent/line4.jpg",
    bio: "Melissa Jayawardena is the Head of HR at Emerge360, a rapidly growing tech startup. She has over 12 years of experience in human resources, specializing in talent acquisition, employee engagement, and organizational development. Melissa is known for her people-centric approach and her ability to build high-performing, inclusive teams. She is committed to creating a positive and supportive work environment where employees can thrive and reach their full potential.",
  },
  {
    name: "Mr. Sajith Silva",
    title: "Strategy Lead, ThinkCore",
    image: "/images/corporateEvent/line5.jpg",
    bio: "Sajith Silva is the Strategy Lead at ThinkCore, a leading management consulting firm. He works with executives from Fortune 500 companies to develop and implement innovative business strategies that drive growth and create a competitive advantage. With a background in economics and finance, Sajith brings a data-driven approach to his work. He is a sought-after speaker on topics such as corporate strategy, market entry, and competitive analysis.",
  },
];

export function EventLineup() {
  return (
    <div className="">
      <motion.h3
        className="text-xl font-bold mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Event Lineup
      </motion.h3>
      <div className="space-y-2">
        {speakers.map((speaker, index) => (
          <motion.div
            key={speaker.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <Speaker {...speaker} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
