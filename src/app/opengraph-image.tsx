import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 18% 18%, rgba(255,73,37,0.24), transparent 22%), linear-gradient(135deg, #050505 0%, #0c0c0c 100%)",
          color: "#f5f0eb",
          padding: "72px 78px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "32px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "68px",
            top: "58px",
            height: "160px",
            width: "160px",
            background: "rgba(255,73,37,0.18)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div style={{ fontSize: 24, letterSpacing: "0.4em", textTransform: "uppercase", color: "#ff8b72" }}>
              Codeique
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 120,
                lineHeight: 0.86,
                letterSpacing: "-0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
                maxWidth: "760px",
              }}
            >
              <span>Beyond Code.</span>
              <span>Built With</span>
              <span>Craft.</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "18px", fontSize: 28, color: "rgba(245,240,235,0.72)" }}>
            <span
              style={{
                display: "flex",
                height: "12px",
                width: "12px",
                borderRadius: "999px",
                background: "#ff4925",
              }}
            />
            <span>{siteConfig.description}</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
