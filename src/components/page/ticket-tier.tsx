"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TicketTierProps {
  ticket: any;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  passLabel?: string;
  specialTag?: string;
}

export function TicketTier({
  ticket,
  quantity,
  onQuantityChange,
  passLabel,
  specialTag,
}: TicketTierProps) {
  const remaining = parseInt(ticket.remaining_tickets);
  const isDisabled = !ticket.is_active || ticket.is_sold_out || remaining === 0;

  const priceNumber = parseFloat(ticket.ticket_amount || "0");
  const priceLabel = ticket.is_free_ticket
    ? "Free"
    : `LKR ${priceNumber.toLocaleString()}`;
  const totalCost = ticket.is_free_ticket ? 0 : quantity * priceNumber;

  // Only strike through the price inside the pass label (e.g., "LKR 25,000")
  const fullPassLabel = passLabel || "";
  const passPriceMatch = fullPassLabel.match(/LKR\s*[0-9,.]+/i);
  const passOnlyPrice = passPriceMatch ? passPriceMatch[0] : "";
  const passTextWithoutPrice = passPriceMatch
    ? fullPassLabel.replace(passPriceMatch[0], "").trim()
    : fullPassLabel;

  const specialTagText = specialTag || "";

  const disableMinus = quantity <= 0 || isDisabled;
  const disablePlus = quantity >= remaining || isDisabled;
  return (
    <div className="w-full flex flex-col gap-3 border-b pb-4 pt-4">
      {/* Level 1: Individual Pass - TOP LEVEL */}
      {specialTagText && (
        <div className="flex items-center gap-2">
          <span className="text-md font-semibold text-slate-900 uppercase tracking-wide">
            {specialTagText}
          </span>
        </div>
      )}

      {/* Card wrapping Level 2 & 3 */}
      <Card className="shadow-none">
        <CardHeader className="pb-3 border-b pt-3">
          <CardTitle className="flex items-center justify-between gap-2 text-[#0E5344]">
            <div className="text-sm font-medium">
              {passTextWithoutPrice}
            </div>
            <div className="text-sm font-medium text-[#0E5344]">
              {passOnlyPrice && (
                <span className="line-through text-[#0E5344]">
                  {passOnlyPrice}
                </span>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          {/* Level 3: Ticket Details */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-sm sm:text-base ${
                  ticket.is_sold_out || remaining === 0
                    ? "text-red-500"
                    : "text-gray-900"
                }`}
              >
                {ticket.ticket_name}
                {ticket.is_compulsory && (
                  <span className="ml-2 text-xs text-red-500">*</span>
                )}
                {(ticket.is_sold_out || remaining === 0) && (
                  <span className="ml-2 text-xs text-red-500">(Sold Out)</span>
                )}
              </h3>
              {ticket.ticket_description && (
                <p className="text-xs text-gray-600 mt-1">
                  {ticket.ticket_description}
                </p>
              )}
            </div>
          </div>

          {/* Price and Quantity Controls */}
          <div className="flex flex-col sm:grid sm:[grid-template-columns:1fr] sm:items-center gap-3 sm:gap-2">
            {/* Mobile Layout */}
            <div className="flex flex-col gap-3 sm:hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onQuantityChange(Math.max(0, quantity - 1))
                      }
                      disabled={disableMinus}
                      className="transition-colors duration-150 h-8 w-8"
                    >
                      <motion.div
                        animate={{ rotate: quantity > 0 ? 0 : -180 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Minus className="h-3 w-3" />
                      </motion.div>
                    </Button>
                  </motion.div>

                  <motion.span
                    animate={{
                      scale: [1, 1.2, 1],
                      color: quantity > 0 ? "#0E5344" : "#000000",
                    }}
                    transition={{
                      scale: { duration: 0.2, ease: "easeOut" },
                      color: { duration: 0.3 },
                    }}
                    className="w-8 text-center font-medium min-w-[2rem] flex items-center justify-center"
                  >
                    {quantity}
                  </motion.span>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onQuantityChange(quantity + 1)}
                      disabled={disablePlus}
                      className="transition-colors duration-150 h-8 w-8"
                    >
                      <motion.div
                        animate={{ rotate: 0 }}
                        whileTap={{ rotate: 90 }}
                        transition={{ duration: 0.1 }}
                      >
                        <Plus className="h-3 w-3" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    color: quantity > 0 ? "#0E5344" : "#000000",
                  }}
                  transition={{
                    scale: { duration: 0.2, ease: "easeOut" },
                    color: { duration: 0.3 },
                  }}
                  className="text-right"
                >
                  <div className="font-semibold text-sm text-gray-900">
                    {quantity > 0 && !ticket.is_free_ticket
                      ? `LKR ${totalCost.toLocaleString()}`
                      : priceLabel}
                  </div>
                  {quantity > 0 && !ticket.is_free_ticket && (
                    <div className="text-xs text-gray-500">
                      {quantity} × LKR {priceNumber.toLocaleString()}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Desktop/Tablet Layout */}
            <div className="hidden sm:flex items-center justify-between gap-2 md:gap-4 w-full">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  color: quantity > 0 ? "#0E5344" : "#000000",
                }}
                transition={{
                  scale: { duration: 0.2, ease: "easeOut" },
                  color: { duration: 0.3 },
                }}
                className="text-right"
              >
                <div className="font-semibold text-base md:text-lg text-gray-900">
                  {quantity > 0 && !ticket.is_free_ticket
                    ? `LKR ${totalCost.toLocaleString()}`
                    : priceLabel}
                </div>
                {quantity > 0 && !ticket.is_free_ticket && (
                  <div className="text-sm text-gray-500">
                    {quantity} × LKR {priceNumber.toLocaleString()}
                  </div>
                )}
              </motion.div>

              <div className="flex items-center gap-1 md:gap-2 whitespace-nowrap shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
                    disabled={disableMinus}
                    className="transition-colors duration-150 h-8 w-8 md:h-10 md:w-10"
                  >
                    <motion.div
                      animate={{ rotate: quantity > 0 ? 0 : -180 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Minus className="h-3 w-3 md:h-4 md:w-4" />
                    </motion.div>
                  </Button>
                </motion.div>

                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    color: quantity > 0 ? "#0E5344" : "#000000",
                  }}
                  transition={{
                    scale: { duration: 0.2, ease: "easeOut" },
                    color: { duration: 0.3 },
                  }}
                  className="w-6 md:w-8 text-center font-medium min-w-[1.5rem] md:min-w-[2rem] flex items-center justify-center text-sm md:text-base"
                >
                  {quantity}
                </motion.span>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onQuantityChange(quantity + 1)}
                    disabled={disablePlus}
                    className="transition-colors duration-150 h-8 w-8 md:h-10 md:w-10"
                  >
                    <motion.div
                      animate={{ rotate: 0 }}
                      whileTap={{ rotate: 90 }}
                      transition={{ duration: 0.1 }}
                    >
                      <Plus className="h-3 w-3 md:h-4 md:w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Remaining Tickets Info */}
          {ticket.show_remaining_tickets &&
            remaining > 0 &&
            !ticket.is_sold_out && (
              <p className="text-xs text-gray-500 mt-2">
                {remaining} tickets left
              </p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
