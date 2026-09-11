import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "NeuroIntegrative Care of Los Gatos — Root-Cause Functional Neurology";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#12181f",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(232,160,32,0.28), rgba(18,24,31,0) 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "999px",
              backgroundColor: "#e8a020",
            }}
          />
          <span
            style={{
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#e8a020",
            }}
          >
            NeuroIntegrative Care of Los Gatos
          </span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "36px",
            fontSize: "68px",
            fontWeight: 600,
            lineHeight: 1.15,
            color: "#ffffff",
            maxWidth: "980px",
          }}
        >
          Root-Cause Functional Neurology &amp; Neurometabolic Care
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "32px",
            fontSize: "28px",
            color: "#9aa6b6",
          }}
        >
          Los Gatos, CA — Serving the South Bay &amp; Santa Cruz County
        </div>
      </div>
    ),
    { ...size }
  );
}
