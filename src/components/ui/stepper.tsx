"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
  steps: string[];
  className?: string;
}

export function Stepper({ currentStep, steps, className }: StepperProps) {
  return (
    <div className={cn("w-full py-6", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <motion.div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300",
                    {
                      "bg-[#0E5344] border-[#0E5344] text-white":
                        isCompleted || isActive,
                      "border-gray-300 text-gray-400":
                        !isCompleted && !isActive,
                    }
                  )}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  ) : (
                    <span className="text-sm sm:text-base font-medium">
                      {stepNumber}
                    </span>
                  )}
                </motion.div>
                <motion.span
                  className={cn(
                    "mt-2 text-xs sm:text-sm font-medium text-center max-w-20 sm:max-w-24",
                    {
                      "text-[#0E5344]": isActive || isCompleted,
                      "text-gray-400": !isActive && !isCompleted,
                    }
                  )}
                  initial={false}
                  animate={{
                    color: isActive || isCompleted ? "#0E5344" : "#9CA3AF",
                  }}
                >
                  {step}
                </motion.span>
              </div>
              {!isLast && (
                <motion.div
                  className={cn(
                    "flex-1 h-0.5 mx-2 sm:mx-4 transition-all duration-300",
                    {
                      "bg-[#0E5344]": isCompleted,
                      "bg-gray-300": !isCompleted,
                    }
                  )}
                  initial={false}
                  animate={{
                    backgroundColor: isCompleted ? "#0E5344" : "#D1D5DB",
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
