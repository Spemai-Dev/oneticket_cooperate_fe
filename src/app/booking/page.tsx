"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stepper } from "@/components/ui/stepper";
import { BasicDetailsForm } from "@/components/booking/basic-details-form";
import { AdditionalDetailsForm } from "@/components/booking/additional-details-form";
import { ConfirmationView } from "@/components/booking/confirmation-view";

export interface BookingData {
  // Basic Details
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  idNumber: string;

  // Additional Details
  companyName: string;
  designation: string;
  branchName: string;
}

const initialBookingData: BookingData = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  idNumber: "",
  companyName: "",
  designation: "",
  branchName: "",
};

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] =
    useState<BookingData>(initialBookingData);

  const steps = ["Personal Details", "Additional Info", "Confirmation"];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicDetailsForm
            data={bookingData}
            onUpdate={updateBookingData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <AdditionalDetailsForm
            data={bookingData}
            onUpdate={updateBookingData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <ConfirmationView
            data={bookingData}
            onBack={handleBack}
            onConfirm={() => {
              // Redirect to payment gateway (no implementation needed)
              console.log("Redirecting to payment gateway...");
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-20 sm:pt-24 pb-8">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden"
        >
          <div className="p-6 sm:p-8 lg:p-10">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl font-bold text-center mb-2 text-[#0E5344]"
            >
              Book Your Tickets
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-center mb-8"
            >
              Complete the form below to secure your tickets
            </motion.p>

            <Stepper currentStep={currentStep} steps={steps} />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
