import { Check, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Agenda } from "./agenda";
import { RefundPolicy } from "./refund-policy";
import { Sponsors } from "./sponsors";
import { EventLineup } from "./event-lineup";
import { AboutEvent } from "./about-event";

export function EventDetails() {
  return (
    <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 leading-tight">
        National AI Exhibition & Conference 2025
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
              Pioneered by the Ministry of Digital Economy and SLT-MOBITEL
            </p>
            <p className="text-sm text-muted-foreground">Sri Lanka</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Sri Lanka’s first ever National AI Exhibition and Conference. Witness
          the power of AI in Technology, Education, Healthcare, Manufacturing
          and many more. Meet industry experts, engage in panel discussions, and
          hear from experts talking on AI, Digital Economy.
        </p>
      </div>

      {/* Event Info Section - Mobile Only */}
      <div className="lg:hidden p-4 sm:p-6 rounded-3xl border border-gray-200 bg-white">
        <h3 className="font-bold mb-3 sm:mb-4 text-base sm:text-lg">
          Friday, 29, September
        </h3>
        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 sm:items-end">
          <div className="sm:col-span-2 space-y-2">
            <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
              <span>08:00 AM – 07:00 PM (11 hours)</span>
            </div>
            <div className="flex items-start text-xs sm:text-sm text-muted-foreground">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">
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

      {/* Event Lineup - Mobile Only */}
      {/* <div className="lg:hidden">
        <EventLineup />
      </div> */}

      {/* Agenda Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Agenda</h2>
        <Agenda />
      </div>

      {/* Mobile-specific sections after agenda */}
      <div className="lg:hidden space-y-4 sm:space-y-6">
        <AboutEvent />
        {/* <Sponsors /> */}
        <RefundPolicy />
      </div>

      {/* Desktop-only sections (original order) */}
      <div className="hidden lg:block space-y-4 sm:space-y-6 lg:space-y-8 mb-8">
        <RefundPolicy />
        {/* <Sponsors /> */}
      </div>
    </div>
  );
}
