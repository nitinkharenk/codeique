import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: "-0.08em",
        }}
      >
        Cq
      </div>
    ),
    size,
  );
}
