"use client";

import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TicketTierProps {
  name: string;
  price: string;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

export function TicketTier({
  name,
  price,
  quantity,
  onQuantityChange,
}: TicketTierProps) {
  // Parse price to number for calculations (assuming format like "LKR 6,000")
  const priceNumber = parseFloat(price.replace(/[^0-9.]/g, ""));
  const totalCost = quantity * priceNumber;

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 sm:items-center py-4 border-b gap-3 sm:gap-0">
      <div className="flex-1 sm:flex-none">
        <p className="font-semibold text-sm sm:text-base">{name}</p>
      </div>

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
                onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
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

          <motion.p
            animate={{
              scale: [1, 1.05, 1],
              color: quantity > 0 ? "#0E5344" : "#000000",
            }}
            transition={{
              scale: { duration: 0.2, ease: "easeOut" },
              color: { duration: 0.3 },
            }}
            className="font-semibold text-sm"
          >
            {quantity > 0 ? `LKR ${totalCost.toLocaleString()}` : price}
          </motion.p>
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden sm:flex items-center gap-2 md:gap-4 justify-end">
        <div className="flex items-center gap-1 md:gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
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

        <motion.p
          animate={{
            scale: [1, 1.05, 1],
            color: quantity > 0 ? "#0E5344" : "#000000",
          }}
          transition={{
            scale: { duration: 0.2, ease: "easeOut" },
            color: { duration: 0.3 },
          }}
          className="font-semibold min-w-[4rem] md:min-w-[6rem] text-right text-sm md:text-base"
        >
          {quantity > 0 ? `LKR ${totalCost.toLocaleString()}` : price}
        </motion.p>
      </div>
    </div>
  );
}
