"use client";

import { Check, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Agenda } from "./agenda";
import { RefundPolicy } from "./refund-policy";
import { Sponsors } from "./sponsors";
import { EventLineup } from "./event-lineup";
import { AboutEvent } from "./about-event";
import { TermsAndConditions } from "./terms-conditions";

export function EventDetails() {
  return (
    <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 leading-tight">
        Retail Forum 2025 – Retail Reimagined: Where AI Meets the Human Edge
      </h1>

      {/* Date/Time Section */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center">
          {/* <div className="relative mr-4">
            <Image
              src="/images/corporateEvent/brandLogo.jpeg"
              alt="Bianca Simone"
              width={60}
              height={60}
              className="rounded-full border border-gray-200"
            />
            <Check
              className="absolute bottom-0 right-0 w-5 h-5 bg-[#1671D9] text-white rounded-full p-1"
              fill="#1671D9"
            />
          </div> */}
          <div className="mt-5">
            <p className="font-semibold">
              Organized by Sri Lanka Retailers’ Association (SLRA)
            </p>
            <p className="text-sm text-muted-foreground">Sri Lanka</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          The Sri Lanka Retailers’ Association (SLRA) is the apex body
          representing the organized retail sector in Sri Lanka. Since our
          establishment in 2015, we’ve brought together retailers from nine key
          industries to build a collaborative, future-ready retail ecosystem.
          From FMCG to fashion, digital retail to healthcare, SLRA reflects the
          full diversity and strength of Sri Lanka’s retail economy.
        </p>
      </div>

      {/* Event Lineup - Mobile Only */}
      {/* <div className="lg:hidden">
        <EventLineup />
      </div> */}

      {/* Agenda Section */}
      <div>
        {/* <h2 className="text-2xl font-bold mb-4">Agenda</h2>
        <Agenda /> */}
      </div>

      {/* Mobile-specific sections after agenda */}
      <div className="lg:hidden space-y-4 sm:space-y-6">
        <AboutEvent />
        {/* <Sponsors /> */}
        {/* <TermsAndConditions /> */}
        {/* <RefundPolicy /> */}
      </div>

      {/* Desktop-only sections (original order) */}
      <div className="hidden lg:block space-y-4 sm:space-y-6 lg:space-y-8 mb-8">
        {/* <TermsAndConditions /> */}
        {/* <RefundPolicy /> */}
        {/* <Sponsors /> */}
      </div>
    </div>
  );
}
