"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, Mail, Loader2, Sparkles, Home } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import axios from "axios";
import { environment } from "@/config/data";

interface ConfirmationViewProps {
  data: any;
  onBack: () => void;
  onConfirm: () => void;
}

export function ConfirmationView({
  data,
  onBack,
  onConfirm,
}: ConfirmationViewProps) {
  const router = useRouter();
  const {
    personalDetails,
    additionalDetails,
    selectedTickets,
    grandTotal,
    eventMeta,
  } = useBooking();
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYouDialog, setShowThankYouDialog] = useState(false);

  // If critical data is missing, show a placeholder
  if (!personalDetails || !eventMeta) {
    return (
      <p className="text-center text-gray-500 mt-10">No booking data found.</p>
    );
  }

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      const payload = {
        event_id: "4XTU119096405A4DE629A",
        customer_first_name: personalDetails.firstName,
        customer_last_name: personalDetails.lastName,
        customer_email: personalDetails.email,
        customer_phone_no: personalDetails.contactNumber,
        customer_address: "Address", // hardcoded
        gender: "M", // hardcoded
        dob: "12/12/2024", // hardcoded
        verification_method: "NIC", // hardcoded
        verification_id: personalDetails.idNumber,
        tickets: selectedTickets.map((t) => ({
          ticket_id: t.id,
          count: t.quantity,
        })),
        coupon_code: "",
        is_subscribe: false,
        additional_fields: "{}",
      };

      console.log("Payload being sent:", payload);
      const response = await axios.post(
        `${environment.EVENT_URL}/transaction-session/create/`,
        payload
      );

      if (response.data?.data?.payment_url) {
        // Redirect to payment page
        window.location.href = response.data.data.payment_url;
      } else {
        alert("Payment URL not found.");
      }
    } catch (error: any) {
      console.error(error);
      alert("Failed to create transaction.");
    } finally {
      setIsLoading(false);
    //   setShowThankYouDialog(true);

    // // Call the original onConfirm
    // onConfirm();
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Personal Details Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border border-gray-200 rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-[#0E5344] flex items-center gap-2">
              <Check className="w-5 h-5" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-base font-semibold text-gray-900">
                  {[personalDetails.firstName, personalDetails.lastName]
                    .filter(Boolean)
                    .join(" ")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base font-semibold text-gray-900">
                  {personalDetails.email}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Contact Number
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {personalDetails.contactNumber}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">ID Number</p>
                <p className="text-base font-semibold text-gray-900">
                  {personalDetails.idNumber}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Info Section */}
      {additionalDetails && Object.keys(additionalDetails).length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border border-gray-200 rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-[#0E5344] flex items-center gap-2">
                <Check className="w-5 h-5" />
                Additional Info
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(additionalDetails).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-sm font-medium text-gray-500">{key}</p>
                    <p className="text-base font-semibold text-gray-900">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Ticket Summary Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border border-gray-200 bg-gradient-to-br from-[#0E5344]/5 to-[#0E5344]/10 rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-[#0E5344] flex items-center gap-2">
              <Check className="w-5 h-5" />
              Ticket Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {eventMeta.name}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(eventMeta.dateTime).toLocaleDateString()} •{" "}
                  {new Date(eventMeta.dateTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-sm text-gray-600">{eventMeta.venue}</p>
              </div>

              <div className="border-t pt-4 space-y-3">
                {selectedTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <span className="text-base font-medium">
                        {ticket.name}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        × {ticket.quantity}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-semibold">
                        {eventMeta.currency} {ticket.subtotal.toLocaleString()}
                      </p>
                      {!ticket.isFree && (
                        <p className="text-xs text-gray-500">
                          {eventMeta.currency}{" "}
                          {ticket.unitPrice.toLocaleString()} each
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4 flex justify-between items-center">
                <span className="text-lg font-bold">Total Amount</span>
                <span className="text-xl font-bold text-[#0E5344]">
                  {eventMeta.currency} {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row justify-between gap-4 pt-6"
      >
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isLoading}
          className="rounded-full px-8 py-3 text-base font-medium order-2 sm:order-1"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={isLoading}
          className="bg-[#0E5344] hover:bg-[#0E5344]/90 text-white rounded-full px-8 py-3 text-base font-medium order-1 sm:order-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            "Confirm & Pay"
          )}
        </Button>
      </motion.div>

      {/* Thank You Dialog */}
      <Dialog open={showThankYouDialog} onOpenChange={setShowThankYouDialog}>
        <DialogContent className="sm:max-w-lg border-0 bg-white">
          <div className="relative overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0E5344]/20 to-green-400/20 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/20 to-[#0E5344]/20 rounded-full blur-2xl"
            />

            <DialogHeader className="relative z-10">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>

                <DialogTitle className="text-2xl font-bold text-[#0E5344] mb-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                  Booking Confirmed!
                  </motion.span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="inline-block ml-2"
                  ></motion.span>
                </DialogTitle>
              </motion.div>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 text-center space-y-6 pt-4"
            >
              <div className="space-y-3">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-lg font-semibold text-gray-900"
                >
                Your tickets are booking confirmed!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm text-gray-600 leading-relaxed px-4"
                >
                Check your email for ticket details and instructions on how to
                collect your tickets and allocate them to persons.
                </motion.p>
              </div>

              {/* Floating Sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [0, -20, -40],
                      x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.8 + i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    className="absolute"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="pt-4"
              >
              <Button
                onClick={() => router.push("/")}
                className="bg-[#0E5344] hover:bg-[#0E5344]/90 text-white rounded-full px-8 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Back to Event Page
              </Button>
              </motion.div>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
