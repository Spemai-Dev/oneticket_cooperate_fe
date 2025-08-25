"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TicketTier } from "@/components/page/ticket-tier";

interface MobileBookingBarProps {
  quantities: {
    standard: number;
    premium: number;
    vip: number;
    group: number;
  };
  updateQuantity: (tier: string, newQuantity: number) => void;
  grandTotal: number;
}

export function MobileBookingBar({
  quantities,
  updateQuantity,
  grandTotal,
}: MobileBookingBarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const ticketData = [
    { key: "standard", name: "Standard Access", price: "LKR 6,000" },
    { key: "premium", name: "Premium Delegate", price: "LKR 8,500" },
    { key: "vip", name: "VIP Executive Pass", price: "LKR 12,000" },
    { key: "group", name: "Group Package (5 Pax)", price: "LKR 25,000" },
  ];

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
                <h2 className="text-lg font-bold">Select Tickets</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Ticket Selection */}
              <div className="flex-1 overflow-y-auto px-4">
                <div className="space-y-1 py-4">
                  {ticketData.map((ticket) => (
                    <TicketTier
                      key={ticket.key}
                      name={ticket.name}
                      price={ticket.price}
                      quantity={
                        quantities[ticket.key as keyof typeof quantities] || 0
                      }
                      onQuantityChange={(newQuantity) =>
                        updateQuantity(ticket.key, newQuantity)
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
