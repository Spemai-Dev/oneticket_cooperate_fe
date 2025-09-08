import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export const alt =
  "OneTicket | Sri Lanka's Most Convenient Event Hosting & Ticketing Platform";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/jpeg";

// Image generation
export default async function Image() {
  // Load the banner image
  const bannerData = await readFile(
    join(process.cwd(), "public/images/corporateEvent/banner.jpg")
  );
  const bannerSrc = `data:image/jpeg;base64,${bannerData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        {/* Background Image */}
        <img
          src={bannerSrc}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Overlay for better text readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            padding: "60px",
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: "bold",
              margin: 0,
              marginBottom: 20,
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            OneTicket
          </h1>
          <p
            style={{
              fontSize: 32,
              margin: 0,
              textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
              maxWidth: "800px",
            }}
          >
            Sri Lanka's Most Convenient Event Hosting & Ticketing Platform
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

