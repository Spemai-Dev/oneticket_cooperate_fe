import type { Metadata } from "next";
import Head from "next/head";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { SmoothScroller } from "@/components/layout/smooth-scroller";
import { Toaster } from "@/components/ui/sonner";
import "@/lib/suppress-warnings";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "OneTicket | Sri Lanka's Most Convenient Event Hosting & Ticketing Platform",
    description:
      "Discover and host the best events in Sri Lanka with OneTicket. From concerts and festivals to sports and conferences — buy, sell, and manage tickets effortlessly.",
    openGraph: {
      title: "OneTicket | Host & Discover Events in Sri Lanka",
      description:
        "Your go-to platform for event hosting and ticketing. Explore top events, sell tickets, and grow your audience with ease.",
      url: "https://oneticket.lk",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "OneTicket | Sri Lanka's Most Convenient Event Hosting & Ticketing Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/twitter-image"],
    },
  };
}

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
        <Head>
          <meta
            key="viewport"
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          />
        </Head>
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
