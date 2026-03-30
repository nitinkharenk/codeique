import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff4925",
          color: "#111111",
          fontSize: 92,
          fontWeight: 700,
          letterSpacing: "-0.08em",
        }}
      >
        C
      </div>
    ),
    size,
  );
}
