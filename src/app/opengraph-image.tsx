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
      </div>
    ),
    {
      ...size,
    }
  );
}

