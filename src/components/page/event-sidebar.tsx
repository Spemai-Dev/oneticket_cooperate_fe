"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { TicketTier } from "./ticket-tier";
import { Clock, MapPin } from "lucide-react";
import { EventLineup } from "./event-lineup";
import { AboutEvent } from "./about-event";
import { motion, AnimatePresence } from "framer-motion";
import { MobileBookingBar } from "@/components/mobile/mobile-booking-bar";
import { toast } from "sonner";

export function EventSidebar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [quantities, setQuantities] = useState({
    standard: 0,
    premium: 0,
    vip: 0,
    group: 0,
  });

  const ticketPrices = {
    standard: 6000,
    premium: 8500,
    vip: 12000,
    group: 25000,
  };

  const updateQuantity = (
    tier: keyof typeof quantities,
    newQuantity: number
  ) => {
    setQuantities((prev) => ({
      ...prev,
      [tier]: Math.max(0, newQuantity),
    }));
  };

  const grandTotal = Object.entries(quantities).reduce(
    (total, [tier, quantity]) => {
      return total + quantity * ticketPrices[tier as keyof typeof ticketPrices];
    },
    0
  );

  return (
    <>
      <div className="w-full lg:col-span-1 space-y-4">
        <div className="hidden lg:block p-4 sm:p-6 rounded-3xl border border-gray-200 bg-white">
          <TicketTier
            name="Standard Access"
            price="LKR 6,000"
            quantity={quantities.standard}
            onQuantityChange={(newQuantity) =>
              updateQuantity("standard", newQuantity)
            }
          />
          <TicketTier
            name="Premium Delegate"
            price="LKR 8,500"
            quantity={quantities.premium}
            onQuantityChange={(newQuantity) =>
              updateQuantity("premium", newQuantity)
            }
          />
          <TicketTier
            name="VIP Executive Pass"
            price="LKR 12,000"
            quantity={quantities.vip}
            onQuantityChange={(newQuantity) =>
              updateQuantity("vip", newQuantity)
            }
          />
          <TicketTier
            name="Group Package (5 Pax)"
            price="LKR 25,000"
            quantity={quantities.group}
            onQuantityChange={(newQuantity) =>
              updateQuantity("group", newQuantity)
            }
          />

          <motion.div
            layout
            initial={false}
            animate={{
              height: grandTotal > 0 ? 60 : 0,
              marginTop: grandTotal > 0 ? 4 : 0,
              paddingTop: grandTotal > 0 ? 16 : 0,
              opacity: grandTotal > 0 ? 1 : 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0.0, 0.2, 1],
              layout: { duration: 0.4 },
            }}
          >
            <div className="flex justify-between items-center h-10">
              <span className="text-lg font-semibold">Total:</span>
              <motion.span
                key={grandTotal}
                initial={{ scale: 1.1, color: "#22c55e" }}
                animate={{ scale: 1, color: "#0E5344" }}
                transition={{ duration: 0.3 }}
                className="text-xl font-bold"
              >
                LKR {grandTotal.toLocaleString()}
              </motion.span>
            </div>
          </motion.div>

          <Button
            onClick={async () => {
              const totalTickets = Object.values(quantities).reduce(
                (sum, qty) => sum + qty,
                0
              );
              if (totalTickets === 0) {
                toast.error("Please select at least one ticket", {
                  style: {
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "0.75rem",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  },
                  duration: 3000,
                });
                return;
              }
              setIsLoading(true);
              await new Promise((resolve) => setTimeout(resolve, 800));
              router.push("/booking");
            }}
            disabled={isLoading}
            className="w-full mt-4 sm:mt-6 text-white rounded-full text-sm sm:text-base py-2 sm:py-3 transition-all duration-200 bg-[#0E5344] hover:bg-[#0E5344]/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Get Tickets"
            )}
          </Button>
        </div>
        <div className="hidden lg:block p-4 sm:p-6 rounded-3xl border border-gray-200 bg-white">
          <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">
            Friday, 6 July
          </h3>
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 sm:items-end">
            <div className="sm:col-span-2 space-y-2">
              <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                <span>6:00pm - 12:00am (6 hours)</span>
              </div>
              <div className="flex items-start text-xs sm:text-sm text-muted-foreground">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">
                  Cottage Medicare Hospital, 18 Iwaya Rd, Yaba 101245, Lagos
                </span>
              </div>
            </div>
            <Button className="w-full sm:w-auto mt-2 sm:mt-6 bg-[#fff] hover:bg-[#344054]/10 text-[#344054] border border-gray-200 rounded-full text-xs sm:text-sm py-2">
              View on map
            </Button>
          </div>
        </div>
        <div className="pt-4 hidden lg:block">
          <EventLineup />
        </div>
        <div className="pt-4 hidden lg:block">
          <AboutEvent />
        </div>
      </div>

      {/* Mobile Booking Bar */}
      <MobileBookingBar
        quantities={quantities}
        updateQuantity={(tier, newQuantity) =>
          updateQuantity(tier as keyof typeof quantities, newQuantity)
        }
        grandTotal={grandTotal}
      />
    </>
  );
}
