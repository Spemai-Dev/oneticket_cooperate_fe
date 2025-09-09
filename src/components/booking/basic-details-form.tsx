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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicDetailsFormProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

export function BasicDetailsForm({
  data,
  onUpdate,
  onNext,
}: BasicDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { setPersonalDetails } = useBooking();
  const dialCode = "+94";
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!data.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!data.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d+$/.test(data.contactNumber)) {
      newErrors.contactNumber = "Contact number must contain only numbers";
    }

    if (!data.idNumber.trim()) {
      newErrors.idNumber = "NIC/Driving License/Passport number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const fullContactNumber = `${dialCode}${data.contactNumber}`;
      setPersonalDetails({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contactNumber: fullContactNumber,
        idNumber: data.idNumber,
      });
      setIsLoading(true);
      // Simulate validation delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      onNext();
    }
  };

  const handleInputChange = (field: keyof BookingData, value: string) => {
    onUpdate({ [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Country code selector removed; using static dialCode

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-none bg-transparent overflow-visible">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    value={data.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className={cn(
                      "h-10 rounded-lg border-gray-200 focus:border-[#0E5344] focus:ring-[#0E5344]/20 text-base ",
                      errors.firstName &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-base"
                    )}
                  />
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-red-500"
                    >
                      {errors.firstName}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    value={data.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className={cn(
                      "h-10 rounded-lg border-gray-200 focus:border-[#0E5344] focus:ring-[#0E5344]/20 text-base",
                      errors.lastName &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-base"
                    )}
                  />
                  {errors.lastName && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-sm text-red-500"
                    >
                      {errors.lastName}
                    </motion.p>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={data.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={cn(
                    "h-10 rounded-lg border-gray-200 focus:border-[#0E5344] focus:ring-[#0E5344]/20 text-base",
                    errors.email &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-base"
                  )}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="contactNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Contact Number <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center border-r pr-3 pl-3 text-base text-gray-700">
                    {dialCode}
                  </div>
                  <Input
                    id="contactNumber"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter your contact number"
                    value={data.contactNumber}
                    onChange={(e) => {
                      const trimmed = e.target.value.replace(/\s+/g, "");
                      const digitsOnly = trimmed.replace(/\D/g, "");
                      const noLeadingZero = digitsOnly.startsWith("0")
                        ? digitsOnly.slice(1)
                        : digitsOnly;
                      const limited = noLeadingZero.slice(0, 9);
                      handleInputChange("contactNumber", limited);
                    }}
                    className={cn(
                      "h-10 rounded-lg pl-16 border-gray-200 focus:border-[#0E5344] focus:ring-[#0E5344]/20 text-base",
                      errors.contactNumber &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-base"
                    )}
                  />
                </div>
                {errors.contactNumber && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500"
                  >
                    {errors.contactNumber}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="idNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Identification <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center border-r">
                    <Select
                      value={(data.idType as string) || "NIC"}
                      onValueChange={(val) =>
                        handleInputChange("idType" as any, val)
                      }
                    >
                      <SelectTrigger className="h-10 rounded-l-lg rounded-r-none border-r-0 w-36 pl-3 pr-6 text-left text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem className="text-left" value="NIC">
                          NIC
                        </SelectItem>
                        <SelectItem
                          className="text-left"
                          value="Driving License"
                        >
                          Driving License
                        </SelectItem>
                        <SelectItem
                          className="text-left"
                          value="Passport Number"
                        >
                          Passport Number
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    id="idNumber"
                    type="text"
                    placeholder={`Enter your ${(
                      (data.idType as string) || "NIC"
                    ).toLowerCase()}`}
                    value={data.idNumber}
                    onChange={(e) =>
                      handleInputChange("idNumber", e.target.value)
                    }
                    className={cn(
                      "h-10 rounded-lg pl-40 border-gray-200 focus:border-[#0E5344] focus:ring-[#0E5344]/20 text-base",
                      errors.idNumber &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500/20 text-base"
                    )}
                  />
                </div>
                {errors.idNumber && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500"
                  >
                    {errors.idNumber}
                  </motion.p>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-end pt-6"
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#0E5344] hover:bg-[#0E5344]/90 text-white rounded-full px-8 py-3 text-base font-medium"
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
