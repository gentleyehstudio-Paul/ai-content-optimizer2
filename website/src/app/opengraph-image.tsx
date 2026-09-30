import { ImageResponse } from "next/og";

export const alt = "Gentleyehstudio — Hire an agent. Keep your brand.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "72px 80px",
          background: "#050505",
          color: "#f4f4f1",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 14,
            letterSpacing: "0.16em",
            color: "#d6d6d0",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#a63328",
            }}
          />
          GENTLEYEHSTUDIO
        </div>

        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 0.96,
            letterSpacing: "-0.025em",
            color: "#ffffff",
          }}
        >
          Hire an agent
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 200,
            lineHeight: 0.96,
            letterSpacing: "-0.025em",
            color: "#ffffff",
            opacity: 0.6,
            marginTop: 8,
          }}
        >
          Keep your brand.
        </div>

        <div
          style={{
            marginTop: 48,
            width: 120,
            height: 1,
            background: "#77776f",
          }}
        />

        <div
          style={{
            marginTop: 24,
            fontSize: 18,
            color: "#999990",
            lineHeight: 1.5,
          }}
        >
          AI 品牌安全視覺代理 · Logo 修正 · 去 AI 味 · 放大印刷
        </div>
      </div>
    ),
    { ...size }
  );
}
