"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TicketTier } from "@/components/page/ticket-tier";
import { ScheduleSelector } from "@/components/page/schedule-selector";

interface Ticket {
  id: number;
  ticket_name: string;
  ticket_amount?: string;
  ticket_visualize_amount?: string;
  remaining_tickets: string;
  is_delete: boolean;
  is_sold_out: boolean;
  is_active?: boolean;
  is_free_ticket?: boolean;
  is_compulsory?: boolean;
  show_remaining_tickets?: boolean;
}

interface MobileBookingBarProps {
  quantities: Record<number, number>;
  updateQuantity: (ticketId: number, newQuantity: number) => void;
  grandTotal: number;
  tickets: Ticket[];
}

export function MobileBookingBar({
  quantities,
  updateQuantity,
  grandTotal,
  tickets,
}: MobileBookingBarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<{
    location?: string;
    date?: string;
    time?: string;
  }>({});

  // Venue and time mapping based on location
  const locationData = {
    Colombo: {
      venue: "Monarch Imperial, Colombo, Sri Lanka",
      mapUrl: "https://maps.app.goo.gl/m4ta6Qu2Cxw3tjFp8",
      times: {
        "08:00 AM": "08:00 AM – 07:00 PM (GMT +5:30)",
        "10:00 AM": "10:00 AM – 09:00 PM (GMT +5:30)",
        "02:00 PM": "02:00 PM – 11:00 PM (GMT +5:30)",
        "04:00 PM": "04:00 PM – 01:00 AM (GMT +5:30)",
      },
    },
    Kandy: {
      venue: "Earl's Regency Hotel, Kandy, Sri Lanka",
      mapUrl: "https://maps.app.goo.gl/kandy-venue",
      times: {
        "08:00 AM": "08:00 AM – 07:00 PM (GMT +5:30)",
        "10:00 AM": "10:00 AM – 09:00 PM (GMT +5:30)",
        "02:00 PM": "02:00 PM – 11:00 PM (GMT +5:30)",
        "04:00 PM": "04:00 PM – 01:00 AM (GMT +5:30)",
      },
    },
    Galle: {
      venue: "Jetwing Lighthouse, Galle, Sri Lanka",
      mapUrl: "https://maps.app.goo.gl/galle-venue",
      times: {
        "08:00 AM": "08:00 AM – 07:00 PM (GMT +5:30)",
        "10:00 AM": "10:00 AM – 09:00 PM (GMT +5:30)",
        "02:00 PM": "02:00 PM – 11:00 PM (GMT +5:30)",
        "04:00 PM": "04:00 PM – 01:00 AM (GMT +5:30)",
      },
    },
  };

  // Helper function to get current venue and time
  const getCurrentVenue = () => {
    const location = selectedSchedule.location || "Colombo";
    return (
      locationData[location as keyof typeof locationData]?.venue ||
      "Monarch Imperial, Colombo, Sri Lanka"
    );
  };

  const getCurrentTime = () => {
    const location = selectedSchedule.location || "Colombo";
    const time = selectedSchedule.time || "08:00 AM";
    const locationInfo = locationData[location as keyof typeof locationData];
    if (locationInfo && time in locationInfo.times) {
      return locationInfo.times[time as keyof typeof locationInfo.times];
    }
    return "08:00 AM – 07:00 PM (GMT +5:30)";
  };

  const getCurrentMapUrl = () => {
    const location = selectedSchedule.location || "Colombo";
    return (
      locationData[location as keyof typeof locationData]?.mapUrl ||
      "https://maps.app.goo.gl/m4ta6Qu2Cxw3tjFp8"
    );
  };

  // Cleanup on unmount to prevent message port errors
  useEffect(() => {
    return () => {
      // Cleanup any pending animations or state
      setIsOpen(false);
    };
  }, []);

  // Touch event handlers for swipe to close
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartY(touch.clientY);
    setIsDragging(true);
    setDragY(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const currentY = touch.clientY;
    const deltaY = Math.max(0, currentY - startY); // Only allow downward drag

    setDragY(deltaY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Close if dragged down more than 100px or with sufficient velocity
    if (dragY > 100) {
      setIsOpen(false);
      // Add haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }

    setDragY(0);
  };

  // Handle drag only from the top area (header + handle)
  const handleHeaderTouchStart = (e: React.TouchEvent) => {
    handleTouchStart(e);
  };

  const totalItems = Object.values(quantities).reduce(
    (sum, qty) => sum + (qty || 0),
    0
  );

  return (
    <>
      {/* Mobile & Tablet Bottom Bar - Visible on mobile and tablet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 shadow-lg lg:hidden">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="w-full bg-[#0E5344] hover:bg-[#0E5344]/90 text-white rounded-full py-3 flex items-center justify-center gap-2 font-semibold shadow-lg"
          >
            <span>Get Tickets</span>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white text-[#0E5344] rounded-full px-2 py-0.5 text-xs font-bold ml-1"
              >
                {totalItems}
              </motion.span>
            )}
          </Button>
        </motion.div>
      </div>

      {/* Slide Up Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: isDragging ? Math.max(0.2, 1 - dragY / 300) : 1,
              }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: isDragging ? dragY : 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: isDragging ? "tween" : "spring",
                stiffness: 300,
                damping: 30,
                duration: isDragging ? 0 : 0.4,
              }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[85vh] flex flex-col lg:hidden"
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Handle Bar */}
              <div
                className="flex justify-center pt-3 pb-2"
                onTouchStart={handleHeaderTouchStart}
              >
                <motion.div
                  className="w-10 h-1 bg-gray-300 rounded-full cursor-grab active:cursor-grabbing"
                  animate={{
                    backgroundColor: isDragging ? "#9CA3AF" : "#D1D5DB",
                    scale: isDragging ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b border-gray-100"
                onTouchStart={handleHeaderTouchStart}
              >
                <h2 className="text-lg font-bold">Event Details & Tickets</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Schedule Selector */}
              {/* <div className="px-4 py-2">
                <ScheduleSelector
                  title="Select the location, date, and time you prefer"
                  locations={["Colombo", "Kandy", "Galle"]}
                  dates={["Fri, 29 Sep", "Sat, 30 Sep"]}
                  times={["08:00 AM", "10:00 AM", "02:00 PM", "04:00 PM"]}
                  onChange={(selection) => {
                    console.log("Schedule selection:", selection);
                    setSelectedSchedule(selection);
                  }}
                />
              </div> */}

              {/* Event Info Section */}
              <div className="px-4 py-2">
                <div className="p-4 rounded-3xl border border-gray-200 bg-white">
                  <h3 className="font-bold mb-3 text-base">
                    {"29th and 30th September 2025"}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-2 flex-shrink-0" />
                      <span>{getCurrentTime()}</span>
                    </div>
                    <div className="flex items-start text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">
                        {getCurrentVenue()}
                      </span>
                    </div>
                    <Button
                      asChild
                      className="w-full mt-3 bg-[#fff] hover:bg-[#344054]/10 text-[#344054] border border-gray-200 rounded-full text-xs py-2"
                    >
                      <a
                        href={getCurrentMapUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on map
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Ticket Selection */}
              <div className="flex-1 overflow-y-auto px-4">
                <div className="space-y-1 py-4">
                  {tickets
                    .filter((ticket) => !ticket.is_delete)
                    .map((ticket, index) => (
                      <TicketTier
                        key={ticket.id}
                        ticket={ticket}
                        quantity={quantities[ticket.id] || 0}
                        onQuantityChange={(newQuantity) =>
                          updateQuantity(ticket.id, newQuantity)
                        }
                        passLabel={
                          ["Full Access Pass LKR 25,000", "Virtual Pass LKR 10,000", "Full Access Pass LKR 25,000"][
                            index
                          ] || ""
                        }
                      />
                    ))}
                </div>
              </div>

              {/* Bottom Section with Total and Checkout */}
              <div className="border-t border-gray-100 p-4 bg-gray-50">
                <AnimatePresence>
                  {grandTotal > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="flex justify-between items-center mb-4 bg-white rounded-lg p-3 shadow-sm"
                    >
                      <span className="font-semibold text-gray-700">
                        Total:
                      </span>
                      <motion.span
                        key={grandTotal}
                        initial={{ scale: 1.1, color: "#22c55e" }}
                        animate={{ scale: 1, color: "#0E5344" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="text-lg font-bold"
                      >
                        LKR {(grandTotal || 0).toLocaleString()}
                      </motion.span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <Button
                    onClick={async () => {
                      const totalTickets = Object.values(quantities).reduce(
                        (sum, qty) => sum + qty,
                        0
                      );

                      // Check compulsory tickets
                      const compulsoryTickets = tickets.filter(
                        (ticket) => ticket.is_compulsory && !ticket.is_delete
                      );
                      const missingCompulsory = compulsoryTickets.some(
                        (ticket) => !(quantities[ticket.id] > 0)
                      );
                      if (totalTickets === 0 || missingCompulsory) {
                        toast.error(
                          missingCompulsory
                            ? "Please select at least one from all compulsory tickets"
                            : "Please select at least one ticket",
                          {
                            style: {
                              background: "#fff",
                              border: "1px solid #e2e8f0",
                              borderRadius: "0.75rem",
                              boxShadow:
                                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            },
                            duration: 3000,
                          }
                        );
                        return;
                      }
                      setIsLoading(true);
                      await new Promise((resolve) => setTimeout(resolve, 800));
                      setIsOpen(false);
                      router.push("/booking");
                    }}
                    className="w-full text-white rounded-full py-3 font-semibold transition-all duration-200 bg-[#0E5344] hover:bg-[#0E5344]/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin inline-block" />
                        Processing...
                      </>
                    ) : (
                      "Continue to Checkout"
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-full py-2 text-gray-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Browsing
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
