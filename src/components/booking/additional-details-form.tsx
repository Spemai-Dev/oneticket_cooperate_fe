"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { BookingData } from "@/app/booking/page";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

export interface Field {
  id: number;
  field_name: string;
  field_regex?: string; // optional now
  is_required?: boolean;
}

interface AdditionalDetailsFormProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
  fields: Field[];
}

export function AdditionalDetailsForm({
  data,
  onUpdate,
  onNext,
  onBack,
  fields,
}: AdditionalDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
const { setAdditionalDetails } = useBooking();
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = data[field.field_name]?.trim() || "";

      if (field.is_required && !value) {
        newErrors[field.field_name] = `${field.field_name} is required`;
        return;
      }

      if (field.field_regex) {
        const regex = new RegExp(field.field_regex);
        if (value && !regex.test(value)) {
          newErrors[field.field_name] = `Invalid ${field.field_name}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate validation delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      onNext();
    }
  };

const handleInputChange = (fieldName: string, value: string) => {
  onUpdate({ [fieldName]: value });  // keeps local form state
  setAdditionalDetails(prev => ({ ...prev, [fieldName]: value })); // update context
  if (errors[fieldName]) {
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  }
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  className="space-y-2"
                >
                  <Label className="text-sm font-medium text-gray-700">
                    {field.field_name} {field.is_required && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    type="text"
                    placeholder={`Enter ${field.field_name}`}
                    value={data[field.field_name] || ""}
                    onChange={(e) => handleInputChange(field.field_name, e.target.value)}
                    className={cn(
                      "h-10 rounded-lg border-gray-200 focus:border-[#0E5344] focus:ring-[#0E5344]/20",
                      errors[field.field_name] && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    )}
                  />
                  {errors[field.field_name] && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-red-500"
                    >
                      {errors[field.field_name]}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>

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
                type="submit"
                disabled={isLoading}
                className="bg-[#0E5344] hover:bg-[#0E5344]/90 text-white rounded-full px-8 py-3 text-base font-medium order-1 sm:order-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validating...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
