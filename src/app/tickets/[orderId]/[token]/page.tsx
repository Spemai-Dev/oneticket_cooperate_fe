"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  User,
  Phone,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

interface TicketAssignment {
  id: number;
  name?: string;
  email?: string;
  contactNumber?: string;
  isAssigned: boolean;
}

export default function TicketAssignmentPage({
  params,
}: {
  params: Promise<{ orderId: string; token: string }>;
}) {
  // Unwrap params using React.use()
  const { orderId } = use(params) as { orderId: string; token: string };

  // Dummy order data - this would come from API
  const orderData = {
    orderId,
    eventName: "TMA 2025 APAC REGIONAL CONFERENCE",
    date: "Friday, 6 July",
    time: "6:00pm - 12:00am",
    totalTickets: 5, // 2 Standard + 2 Premium + 1 VIP
    tickets: [
      { type: "Standard Access", quantity: 2, price: 6000 },
      { type: "Premium Delegate", quantity: 2, price: 8500 },
      { type: "VIP Executive Pass", quantity: 1, price: 12000 },
    ],
    customerEmail: "john@example.com",
  };

  // Initialize ticket assignments
  const [ticketAssignments, setTicketAssignments] = useState<
    TicketAssignment[]
  >(() => {
    const assignments: TicketAssignment[] = [];
    let ticketId = 1;

    orderData.tickets.forEach((ticket) => {
      for (let i = 0; i < ticket.quantity; i++) {
        assignments.push({
          id: ticketId++,
          isAssigned: false,
        });
      }
    });

    return assignments;
  });

  const [editingTicket, setEditingTicket] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    contactNumber: "",
  });

  const assignedCount = ticketAssignments.filter((t) => t.isAssigned).length;
  const remainingCount = orderData.totalTickets - assignedCount;

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      contactNumber: "",
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
      isValid = false;
    }

    // Contact number validation
    if (!formData.contactNumber.trim()) {
      errors.contactNumber = "Contact number is required";
      isValid = false;
    } else if (
      !/^\d{10}$/.test(formData.contactNumber.replace(/[^0-9]/g, ""))
    ) {
      errors.contactNumber = "Please enter a valid 10-digit number";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleAssignTicket = (ticketId: number) => {
    if (!validateForm()) {
      return;
    }

    setTicketAssignments((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, ...formData, isAssigned: true }
          : ticket
      )
    );

    setEditingTicket(null);
    setFormData({ name: "", email: "", contactNumber: "" });
    setFormErrors({ name: "", email: "", contactNumber: "" });
    toast.success("Ticket assigned successfully!", {
      style: {
        backgroundColor: "#0E5344",
        color: "white",
        border: "none",
      },
      className: "rounded-xl",
    });
  };

  const handleResendEmail = (ticketId: number) => {
    const ticket = ticketAssignments.find((t) => t.id === ticketId);
    if (ticket && ticket.email) {
      toast.success(`Email resent to ${ticket.email}`, {
        style: {
          backgroundColor: "#0E5344",
          color: "white",
          border: "none",
        },
        className: "rounded-xl",
      });
    }
  };

  const getTicketDetails = (ticketId: number) => {
    let currentId = 1;
    for (const ticket of orderData.tickets) {
      if (ticketId <= currentId + ticket.quantity - 1) {
        return ticket;
      }
      currentId += ticket.quantity;
    }
    return null;
  };

  const getTicketTypeForId = (ticketId: number) => {
    return getTicketDetails(ticketId)?.type || "Unknown";
  };

  const getTicketPriceForId = (ticketId: number) => {
    return getTicketDetails(ticketId)?.price || 0;
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] pt-20 sm:pt-24 pb-8">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0E5344] mb-2">
              Ticket Assignment Dashboard
            </h1>
            <p className="text-gray-600">
              Assign your tickets to specific persons for the event
            </p>
          </div>

          {/* Order Summary */}
          <Card className="mb-6 rounded-2xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#0E5344]">
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-900">
                    {orderData.eventName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {orderData.date} • {orderData.time}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Order ID: #{orderData.orderId}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 justify-center items-center text-center">
                    <p className="text-sm text-gray-500">Assigned Tickets</p>
                    <p className="text-2xl font-bold text-green-600">
                      {assignedCount}
                    </p>
                  </div>
                  <div className="flex-1 justify-center items-center text-center">
                    <p className="text-sm text-gray-500">Remaining Tickets</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {remainingCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>
                    {assignedCount}/{orderData.totalTickets} tickets assigned
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#0E5344] h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (assignedCount / orderData.totalTickets) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ticket List */}
          <div className="grid gap-4">
            {ticketAssignments.map((ticket) => (
              <Card
                key={ticket.id}
                className="rounded-2xl border border-gray-200"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              ticket.isAssigned ? "default" : "secondary"
                            }
                            className="bg-[#0E5344] text-white hover:bg-[#0E5344]"
                          >
                            Ticket #{ticket.id}
                          </Badge>
                          {ticket.isAssigned ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-orange-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-0 sm:ml-1">
                          <span className="text-sm text-gray-600">
                            {getTicketTypeForId(ticket.id)}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            LKR{" "}
                            {getTicketPriceForId(ticket.id).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {ticket.isAssigned ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">{ticket.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>{ticket.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-500" />
                            <span>{ticket.contactNumber}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-5">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                            <p className="text-xs text-gray-500">
                              This ticket cannot be reverted or reassigned.
                            </p>
                          </div>
                        </div>
                      ) : editingTicket === ticket.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                            <div>
                              <Input
                                id={`name-${ticket.id}`}
                                value={formData.name}
                                onChange={(e) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                  }));
                                  if (formErrors.name) {
                                    setFormErrors((prev) => ({
                                      ...prev,
                                      name: "",
                                    }));
                                  }
                                }}
                                placeholder="Enter name"
                                className={`mt-1 ${
                                  formErrors.name
                                    ? "border-red-500 focus:ring-red-500"
                                    : ""
                                }`}
                              />
                              {formErrors.name && (
                                <p className="text-xs text-red-500 mt-1">
                                  {formErrors.name}
                                </p>
                              )}
                            </div>
                            <div>
                              <Input
                                id={`email-${ticket.id}`}
                                type="email"
                                value={formData.email}
                                onChange={(e) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                  }));
                                  if (formErrors.email) {
                                    setFormErrors((prev) => ({
                                      ...prev,
                                      email: "",
                                    }));
                                  }
                                }}
                                placeholder="Enter email"
                                className={`mt-1 ${
                                  formErrors.email
                                    ? "border-red-500 focus:ring-red-500"
                                    : ""
                                }`}
                              />
                              {formErrors.email && (
                                <p className="text-xs text-red-500 mt-1">
                                  {formErrors.email}
                                </p>
                              )}
                            </div>
                            <div>
                              <Input
                                id={`contact-${ticket.id}`}
                                value={formData.contactNumber}
                                onChange={(e) => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    contactNumber: e.target.value,
                                  }));
                                  if (formErrors.contactNumber) {
                                    setFormErrors((prev) => ({
                                      ...prev,
                                      contactNumber: "",
                                    }));
                                  }
                                }}
                                placeholder="Enter contact number"
                                className={`mt-1 ${
                                  formErrors.contactNumber
                                    ? "border-red-500 focus:ring-red-500"
                                    : ""
                                }`}
                              />
                              {formErrors.contactNumber && (
                                <p className="text-xs text-red-500 mt-1">
                                  {formErrors.contactNumber}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          Click "Assign Ticket" to assign this ticket to a
                          person
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      {ticket.isAssigned ? (
                        <Button
                          onClick={() => handleResendEmail(ticket.id)}
                          variant="outline"
                          size="sm"
                          className="rounded-full px-4"
                        >
                          Resend Email
                        </Button>
                      ) : editingTicket === ticket.id ? (
                        <>
                          <Button
                            onClick={() => {
                              setEditingTicket(null);
                              setFormData({
                                name: "",
                                email: "",
                                contactNumber: "",
                              });
                            }}
                            variant="outline"
                            size="sm"
                            className="rounded-full px-4"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleAssignTicket(ticket.id)}
                            size="sm"
                            className="rounded-full bg-[#0E5344] hover:bg-[#0E5344]/90 px-4"
                          >
                            Save Assignment
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => setEditingTicket(ticket.id)}
                          size="sm"
                          className="rounded-full bg-[#0E5344] hover:bg-[#0E5344]/90 px-4"
                        >
                          Assign Ticket
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          {assignedCount === orderData.totalTickets && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Card className="rounded-2xl border border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    All Tickets Assigned!
                  </h3>
                  <p className="text-green-600">
                    All {orderData.totalTickets} tickets have been successfully
                    assigned. Each person will receive their ticket via email.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
