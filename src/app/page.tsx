import { Hero } from "@/components/page/hero";
import { EventContent } from "@/components/page/event-content";
import { EventDetails } from "@/components/page/event-details";
import { EventSidebar } from "@/components/page/event-sidebar";

export default function Home() {
  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8 pt-20 sm:pt-24 pb-20 lg:pb-4">
      <Hero />
      <EventContent>
        <EventDetails />
        <EventSidebar />
      </EventContent>
    </div>
  );
}
