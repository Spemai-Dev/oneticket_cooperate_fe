"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Clock, MapPin } from "lucide-react";
import { TicketTier } from "./ticket-tier";
import { EventLineup } from "./event-lineup";
import { AboutEvent } from "./about-event";
// import { ScheduleSelector } from "./schedule-selector";
import { motion } from "framer-motion";
import { MobileBookingBar } from "@/components/mobile/mobile-booking-bar";
import { toast } from "sonner";
import { useBooking } from "@/context/BookingContext";
import axios from "axios";
import { environment } from "@/config/data";

export function EventSidebar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [tickets, setTickets] = useState<any[]>([]);
  const [eventDetails, setEventDetails] = useState<any>(null);
  // const [selectedSchedule, setSelectedSchedule] = useState<{
  //   location?: string;
  //   date?: string;
  //   time?: string;
  // }>({});

  const { setEventMeta, setDynamicFields, setSelectedTicketsFromQuantities } =
    useBooking();

  const EVENT_ID = process.env.NEXT_PUBLIC_EVENT_ID || "OT4W11909A75BC2F388C5";

  // // Venue and time mapping based on location
  // const locationData = {
  //   Colombo: {
  //     venue: "Monarch Imperial, Colombo, Sri Lanka",
  //     mapUrl: "https://maps.app.goo.gl/m4ta6Qu2Cxw3tjFp8",
  //     times: {
  //       "08:00 AM": "08:00 AM – 07:00 PM (GMT +5:30)",
  //       "10:00 AM": "10:00 AM – 09:00 PM (GMT +5:30)",
  //       "02:00 PM": "02:00 PM – 11:00 PM (GMT +5:30)",
  //       "04:00 PM": "04:00 PM – 01:00 AM (GMT +5:30)",
  //     },
  //   },
  //   Kandy: {
  //     venue: "Earl's Regency Hotel, Kandy, Sri Lanka",
  //     mapUrl: "https://maps.app.goo.gl/kandy-venue",
  //     times: {
  //       "08:00 AM": "08:00 AM – 07:00 PM (GMT +5:30)",
  //       "10:00 AM": "10:00 AM – 09:00 PM (GMT +5:30)",
  //       "02:00 PM": "02:00 PM – 11:00 PM (GMT +5:30)",
  //       "04:00 PM": "04:00 PM – 01:00 AM (GMT +5:30)",
  //     },
  //   },
  //   Galle: {
  //     venue: "Jetwing Lighthouse, Galle, Sri Lanka",
  //     mapUrl: "https://maps.app.goo.gl/galle-venue",
  //     times: {
  //       "08:00 AM": "08:00 AM – 07:00 PM (GMT +5:30)",
  //       "10:00 AM": "10:00 AM – 09:00 PM (GMT +5:30)",
  //       "02:00 PM": "02:00 PM – 11:00 PM (GMT +5:30)",
  //       "04:00 PM": "04:00 PM – 01:00 AM (GMT +5:30)",
  //     },
  //   },
  // };

  // // Helper function to get current venue and time
  // const getCurrentVenue = () => {
  //   const location = selectedSchedule.location || "Colombo";
  //   return (
  //     locationData[location as keyof typeof locationData]?.venue ||
  //     "Monarch Imperial, Colombo, Sri Lanka"
  //   );
  // };

  // const getCurrentTime = () => {
  //   const location = selectedSchedule.location || "Colombo";
  //   const time = selectedSchedule.time || "08:00 AM";
  //   const locationInfo = locationData[location as keyof typeof locationData];
  //   if (locationInfo && time in locationInfo.times) {
  //     return locationInfo.times[time as keyof typeof locationInfo.times];
  //   }
  //   return "08:00 AM – 07:00 PM (GMT +5:30)";
  // };

  // const getCurrentMapUrl = () => {
  //   const location = selectedSchedule.location || "Colombo";
  //   return (
  //     locationData[location as keyof typeof locationData]?.mapUrl ||
  //     "https://maps.app.goo.gl/m4ta6Qu2Cxw3tjFp8"
  //   );
  // };

  useEffect(() => {
    if (!EVENT_ID) {
      toast.error("Event ID is not set!");
      return;
    }
    const fetchEventData = async () => {
      try {
        // Fetch event details
        const resEvent = await axios.get(
          `${environment.EVENT_URL}/get-details/?id=${EVENT_ID}`
        );
        const eventData = resEvent.data?.data;
        if (!eventData) throw new Error("Event details not found");
        setEventDetails(eventData);

        // Set event meta for context
        setEventMeta({
          id: eventData.id,
          name: eventData.event_name,
          dateTime: eventData.event_datetime,
          expireOn: eventData.event_expire_on,
          venue: eventData.venue,
          currency: eventData.tickets_currency,
        });

        // Set dynamic fields
        setDynamicFields(eventData.fields || []);

        // Fetch tickets
        const resTickets = await axios.get(
          `https://oneticket.onepay.lk/api/v3/oneticket/user/event/tickets-by-slot/`,
          {
            params: {
              event_id: EVENT_ID,
              venue: "Colombo",
              day: "2025-09-29",
              start_time: "08:00",
            },
          }
        );

        const ticketsData = resTickets.data?.data || [];
        const validTickets = ticketsData.filter((t: any) => !t.is_delete);
        setTickets(validTickets);

        // Initialize ticket quantities
        const initialQuantities: Record<number, number> = {};
        validTickets.forEach((t: any) => {
          initialQuantities[t.id] = t.is_compulsory ? 1 : 0;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load event or tickets");
      }
    };

    fetchEventData();
  }, [EVENT_ID]);

  // Update quantity — pure, no context updates here
  const updateQuantity = (ticketId: number, newQuantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [ticketId]: Math.max(0, newQuantity),
    }));
  };

  // Sync selected tickets whenever tickets or quantities change
  useEffect(() => {
    if (tickets.length === 0) return;

    setSelectedTicketsFromQuantities(tickets, quantities);
  }, [tickets, quantities]);

  const grandTotal = tickets.reduce((total, ticket) => {
    const qty = quantities[ticket.id] || 0;
    const price = ticket.is_free_ticket
      ? 0
      : parseFloat(ticket.ticket_amount || "0");
    return total + qty * price;
  }, 0);

  const handleGetTickets = async () => {
    const totalTickets = Object.values(quantities).reduce(
      (sum, qty) => sum + qty,
      0
    );

    // Check compulsory tickets
    const visibleTickets = tickets.filter((t) => !t.is_delete);
    const compulsoryTickets = visibleTickets.filter((t) => t.is_compulsory);
    const missingCompulsory = compulsoryTickets.some(
      (t) => !(quantities[t.id] > 0)
    );

    if (totalTickets === 0 || missingCompulsory) {
      toast.error(
        missingCompulsory
          ? "Please select at least one from all compulsory tickets"
          : "Please select at least one ticket"
      );
      return;
    }

    // 🔹 This updates context → which triggers localStorage update automatically
    setSelectedTicketsFromQuantities(tickets, quantities);

    // setEventMeta({
    //   id: eventDetails.id,
    //   name: eventDetails.event_name,
    //   dateTime: eventDetails.event_datetime,
    //   expireOn: eventDetails.event_expire_on,
    //   venue: eventDetails.venue,
    //   currency: eventDetails.tickets_currency,
    // });

    setDynamicFields(eventDetails.fields || []);

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/booking");
  };

  return (
    <>
      <div className="w-full lg:col-span-1 space-y-4">
        {/* Schedule Selector */}
        {/* <div className="hidden lg:block">
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

        {/* Event Info */}
        {eventDetails && (
          <div className="hidden lg:block p-4 sm:p-6 rounded-3xl border border-gray-200 bg-white">
            <h3 className="font-bold mb-1 sm:mb-2 text-base sm:text-lg">
              {/* {new Date(eventDetails.event_datetime).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )} */}
              {"29th and 30th September 2025"}
            </h3>
            <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 sm:items-end">
              <div className="sm:col-span-2 space-y-2">
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                  {/* <span>
                    {new Date(eventDetails.event_datetime).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}{" "}
                    -{" "}
                    {new Date(eventDetails.event_expire_on).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </span> */}
                  <span>{getCurrentTime()}</span>
                </div>
                <div className="flex items-start text-xs sm:text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    {/* {eventDetails.venue} */}
                    {getCurrentVenue()}
                  </span>
                </div>
              </div>
              <Button
                asChild
                className="w-full sm:w-auto mt-2 sm:mt-6 bg-[#fff] hover:bg-[#344054]/10 text-[#344054] border border-gray-200 rounded-full text-xs sm:text-sm py-2"
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
        )}

        <div className="hidden lg:block p-4 sm:p-6 rounded-3xl border border-gray-200 bg-white">
          {tickets.length === 0 ? (
            <p className="text-sm text-gray-500">Loading tickets...</p>
          ) : (
            tickets.map((ticket) => (
              <TicketTier
                key={ticket.id}
                ticket={ticket}
                quantity={quantities[ticket.id] || 0}
                onQuantityChange={(newQuantity) =>
                  updateQuantity(ticket.id, newQuantity)
                }
              />
            ))
          )}

          {/* Total Section */}
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
            onClick={handleGetTickets}
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

{/* Event Info */}
        {eventDetails && (
          <div className="hidden lg:block p-4 sm:p-6 rounded-3xl border border-gray-200 bg-white">
            <h3 className="font-bold mb-1 sm:mb-2 text-base sm:text-lg">
              {/* {new Date(eventDetails.event_datetime).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )} */}
              29th and 30th September 2025
            </h3>
            <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 sm:items-end">
              <div className="sm:col-span-2 space-y-2">
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                  {/* <span>
                    {new Date(eventDetails.event_datetime).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}{" "}
                    -{" "}
                    {new Date(eventDetails.event_expire_on).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </span> */}
                  <span>08:00 AM – 07:00 PM (11 hours)</span>
                </div>
                <div className="flex items-start text-xs sm:text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    {/* {eventDetails.venue} */}
                    Monarch Imperial, Colombo, Sri Lanka
                    </span>
                </div>
              </div>
              <Button
                asChild
                className="w-full sm:w-auto mt-2 sm:mt-6 bg-[#fff] hover:bg-[#344054]/10 text-[#344054] border border-gray-200 rounded-full text-xs sm:text-sm py-2"
              >
                <a
                  href="https://maps.app.goo.gl/m4ta6Qu2Cxw3tjFp8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on map
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* <div className="pt-4 hidden lg:block">
          <EventLineup />
        </div> */}
        <div className="pt-4 hidden lg:block">
          <AboutEvent />
        </div>
      </div>

      {/* Mobile Booking Bar */}
      <MobileBookingBar
        quantities={quantities}
        updateQuantity={updateQuantity}
        grandTotal={grandTotal}
        tickets={tickets}
      />
    </>
  );
}
