"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingData } from "@/app/booking/page";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AdditionalDetailsFormProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AdditionalDetailsForm({
  data,
  onUpdate,
  onNext,
  onBack,
}: AdditionalDetailsFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!data.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!data.branchName.trim()) {
      newErrors.branchName = "Branch name is required";
    }

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

  const handleInputChange = (field: keyof BookingData, value: string) => {
    onUpdate({ [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
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
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="companyName"
                  className="text-sm font-medium text-gray-700"
                >
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Enter your company name"
                  value={data.companyName}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  className={cn(
                    "h-10 rounded-lg border-gray-200 focus:border-[#0E5344] focus:ring-[#0E5344]/20",
                    errors.companyName &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                {errors.companyName && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500"
                  >
                    {errors.companyName}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Label
                  htmlFor="designation"
                  className="text-sm font-medium text-gray-700"
                >
                  Designation *
                </Label>
                <Select
                  value={data.designation}
                  onValueChange={(value) =>
                    handleInputChange("designation", value)
                  }
                >
                  <SelectTrigger
                    className={cn(
                      "h-10 rounded-lg border-gray-200 focus:border-[#0E5344] focus:ring-[#0E5344]/20",
                      errors.designation &&
                        "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    )}
                  >
                    <SelectValue placeholder="Select your designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ceo">CEO</SelectItem>
                    <SelectItem value="cto">CTO</SelectItem>
                    <SelectItem value="cfo">CFO</SelectItem>
                    <SelectItem value="director">Director</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="senior-manager">
                      Senior Manager
                    </SelectItem>
                    <SelectItem value="assistant-manager">
                      Assistant Manager
                    </SelectItem>
                    <SelectItem value="team-lead">Team Lead</SelectItem>
                    <SelectItem value="senior-developer">
                      Senior Developer
                    </SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="junior-developer">
                      Junior Developer
                    </SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="coordinator">Coordinator</SelectItem>
                    <SelectItem value="specialist">Specialist</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                    <SelectItem value="associate">Associate</SelectItem>
                    <SelectItem value="intern">Intern</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.designation && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500"
                  >
                    {errors.designation}
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
                  htmlFor="branchName"
                  className="text-sm font-medium text-gray-700"
                >
                  Branch Name *
                </Label>
                <Input
                  id="branchName"
                  type="text"
                  placeholder="Enter your branch name"
                  value={data.branchName}
                  onChange={(e) =>
                    handleInputChange("branchName", e.target.value)
                  }
                  className={cn(
                    "h-10 rounded-lg border-gray-200 focus:border-[#0E5344] focus:ring-[#0E5344]/20",
                    errors.branchName &&
                      "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  )}
                />
                {errors.branchName && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-red-500"
                  >
                    {errors.branchName}
                  </motion.p>
                )}
              </motion.div>
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
