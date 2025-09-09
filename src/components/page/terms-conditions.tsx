"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TermsAndConditions() {
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">
        Terms &amp; Conditions of National AI Expo &amp; Conference 2025
      </h3>

      {/* Full content always shown on desktop */}
      {!isMobile && <TermsTable />}

      {/* Mobile View */}
      {isMobile && (
        <>
          {/* Preview container with fixed height and relative for fade overlay */}
          <div
            ref={previewRef}
            className={`relative p-4 text-sm text-gray-700 ${
              showFullTerms ? "" : "max-h-[300px] overflow-hidden"
            }`}
          >
            <TermsTable />
            {/* Fade overlay only when collapsed */}
            {!showFullTerms && (
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-25 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>

          {/* Button below preview */}
          <div className="text-center mt-3">
            {showFullTerms ? (
              <motion.button
                onClick={() => setShowFullTerms(false)}
                className="px-6 py-2 bg-gray-100 text-xs text-gray-500 cursor-pointer rounded-full border border-gray-200 font-semibold hover:bg-gray-200 transition-all duration-200"
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                See Less
              </motion.button>
            ) : (
              <motion.button
                onClick={() => setShowFullTerms(true)}
                className="px-6 py-2 bg-[#0E5344] hover:bg-[#0E5344]/90 cursor-pointer text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-xs sm:text-sm"
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                See Full Terms &amp; Conditions
              </motion.button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function TermsTable() {
  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Modern Feature Comparison Table */}
      <div className="bg-white rounded-2xl border border-gray-200  overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0E5344] to-[#0E5344]/90 px-8 py-6">
          <h4 className="text-xl font-bold text-white mb-2">
            Terms & Conditions Comparison
          </h4>
          <p className="text-white/80 text-sm">
            Compare In-Person vs Virtual Access Pass terms
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-8 py-6 text-left font-semibold text-gray-800 text-base w-2/5">
                  Terms & Conditions
                </th>
                <th className="px-8 py-6 text-center font-semibold text-gray-800 text-base w-3/10">
                  In-Person Full Access Pass
                </th>
                <th className="px-8 py-6 text-center font-semibold text-gray-800 text-base w-3/10">
                  Virtual Access Pass
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50/50 transition-colors duration-200">
                <td className="px-8 py-6">
                  <div className="font-semibold text-gray-800 text-base mb-2">
                    Event Registration
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Registration process and ticket validation requirements for
                    event access
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    The In-Person Full Access Pass is issued against the
                    registration details provided at the point of ticket
                    purchase.
                    <br />
                    <br />
                    Attendees should present the digital ticket purchased via
                    the official ticketing partner (OneTicket.lk) at the
                    entrance.
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    The Virtual Access Pass is issued against the registration
                    details provided at the point of ticket purchase.
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-50/50 transition-colors duration-200">
                <td className="px-8 py-6">
                  <div className="font-semibold text-gray-800 text-base mb-2">
                    Access Rights
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    What you can access with your pass during the event
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    This pass grants full in-person access to all conference
                    sessions, track sessions, exhibitions, and networking
                    activities scheduled on 29 - 30 September 2025 at Monarch
                    Imperial, Colombo.
                    <br />
                    <br />
                    The organizer reserves the right to restrict or revoke
                    access if the pass is misused.
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    This pass provides access to the virtual platform for the AI
                    Expo &amp; Conference 2025 on 29-30 September 2025.
                    <br />
                    <br />
                    Login credentials and access instructions will be sent to
                    the registered email address on 25th September 2025.
                    <br />
                    <br />
                    The organizer reserves the right to restrict or revoke
                    access if the pass is misused.
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-50/50 transition-colors duration-200">
                <td className="px-8 py-6">
                  <div className="font-semibold text-gray-800 text-base mb-2">
                    Access Pass Usage
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    How to use your pass during the event
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    The pass must be always worn and displayed visibly within
                    the venue.
                    <br />
                    <br />
                    The same pass must be available with the attendee on both
                    days to ensure uninterrupted access to the venues.
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm text-gray-700 leading-relaxed">
                    Attendees are responsible for ensuring a stable internet
                    connection, compatible devices, and required software to
                    access the virtual sessions.
                    <br />
                    <br />
                    The organizers are not liable for technical issues on the
                    attendee's side, including connectivity, hardware, or
                    software limitations.
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-50/50 transition-colors duration-200">
                <td className="px-8 py-6">
                  <div className="font-semibold text-gray-800 text-base mb-2">
                    Health & Safety
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Health protocols and safety requirements for all attendees
                  </div>
                </td>
                <td className="px-8 py-6" colSpan={2}>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    Attendees must comply with all venue regulations, health and
                    safety protocols, and security instructions.
                    <br />
                    <br />
                    The organizers are not responsible for personal injury,
                    loss, or damage to personal belongings during the event.
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-50/50 transition-colors duration-200">
                <td className="px-8 py-6">
                  <div className="font-semibold text-gray-800 text-base mb-2">
                    Content & Intellectual Property
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Rights and restrictions on event content and materials
                  </div>
                </td>
                <td className="px-8 py-6" colSpan={2}>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    All presentations, discussions, recordings, and materials
                    shared during the conference are the intellectual property
                    of the organizers, speakers, or partners.
                    <br />
                    <br />
                    Unauthorized recording, photography, or distribution of
                    sessions or content is strictly prohibited.
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-50/50 transition-colors duration-200">
                <td className="px-8 py-6">
                  <div className="font-semibold text-gray-800 text-base mb-2">
                    Amendments & Cancellations
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Organizer rights to modify or cancel the event
                  </div>
                </td>
                <td className="px-8 py-6" colSpan={2}>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    The organizers reserve the right to modify the program
                    schedule, speakers, venue, or virtual access platforms as
                    necessary.
                    <br />
                    <br />
                    In the event of unforeseen circumstances, the organizers may
                    reschedule or cancel the event.
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-50/50 transition-colors duration-200">
                <td className="px-8 py-6">
                  <div className="font-semibold text-gray-800 text-base mb-2">
                    Refund Policy
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Terms regarding ticket refunds and cancellations
                  </div>
                </td>
                <td className="px-8 py-6" colSpan={2}>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    Confirmed purchases are non-refundable.
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-gray-50/50 transition-colors duration-200">
                <td className="px-8 py-6">
                  <div className="font-semibold text-gray-800 text-base mb-2">
                    Disclaimer
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    General terms and liability disclaimers
                  </div>
                </td>
                <td className="px-8 py-6" colSpan={2}>
                  <div className="text-sm text-gray-700 leading-relaxed">
                    Views expressed by speakers and panelists are their own and
                    do not necessarily reflect those of the organizers,
                    partners, or sponsors.
                    <br />
                    <br />
                    By attending the event, the attendee agrees to comply with
                    the Terms &amp; Conditions set out by event organizers along
                    with its partners.
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
