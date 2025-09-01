import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { SmoothScroller } from "@/components/layout/smooth-scroller";
import { Toaster } from "@/components/ui/sonner";
import "@/lib/suppress-warnings";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";

export const metadata: Metadata = {
  title:
    "OneTicket | Sri Lanka’s Most Convenient Event Hosting & Ticketing Platform",
  description:
    "Discover and host the best events in Sri Lanka with OneTicket. From concerts and festivals to sports and conferences — buy, sell, and manage tickets effortlessly.",
  openGraph: {
    title: "OneTicket | Host & Discover Events in Sri Lanka",
    description:
      "Your go-to platform for event hosting and ticketing. Explore top events, sell tickets, and grow your audience with ease.",
    url: "https://oneticket.lk",
    // images: [
    //   {
    //     url: "/images/og-banner.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "OneTicket - Events in Sri Lanka",
    //   },
    // ],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/inter" rel="stylesheet" />
      </head>
      <body className={`bg-[#F6F7F9] antialiased`} suppressHydrationWarning>
        <SmoothScroller />
        <Navigation />
        <BookingProvider>
          <main>{children}</main>
        </BookingProvider>
        <Footer />
        <Toaster
          position="bottom-right"
          richColors
          toastOptions={{
            style: {
              borderLeft: "4px solid #dc2626", // Tailwind red-600
              backgroundColor: "#fef2f2", // red-50
              color: "#b91c1c", // red-700
            },
          }}
        />
      </body>
    </html>
  );
}
