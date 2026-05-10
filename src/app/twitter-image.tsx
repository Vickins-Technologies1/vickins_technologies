import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "#f7f9ff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          position: "relative",
          color: "#0a1633",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(900px 520px at 18% 10%, rgba(0,144,224,0.18), transparent 58%), radial-gradient(900px 520px at 88% 15%, rgba(10,22,51,0.14), transparent 58%), linear-gradient(180deg, #f7f9ff 0%, #f2f6ff 100%)",
          }}
        />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontSize: 18,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(18,24,38,0.72)",
            }}
          >
            Nairobi-based technology partner
            <span style={{ width: 42, height: 6, borderRadius: 999, background: "#1d4ed8" }} />
          </div>

          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -1.2, lineHeight: 1.05 }}>
            Vickins Technologies
          </div>

          <div style={{ fontSize: 28, lineHeight: 1.3, color: "rgba(18,24,38,0.78)" }}>
            Enterprise-ready web platforms, mobile apps, and automation.
          </div>
        </div>
      </div>
    ),
    size
  );
}
