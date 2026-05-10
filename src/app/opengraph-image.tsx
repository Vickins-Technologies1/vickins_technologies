import { ImageResponse } from "next/og";

export const runtime = "edge";

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

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(18,24,38,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(18,24,38,0.06) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            opacity: 0.35,
          }}
        />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18 }}>
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
            Nairobi • Kenya
            <span style={{ width: 42, height: 6, borderRadius: 999, background: "#1d4ed8" }} />
          </div>

          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: -1.2, lineHeight: 1.05 }}>
            Vickins Technologies
          </div>

          <div style={{ fontSize: 30, lineHeight: 1.3, color: "rgba(18,24,38,0.78)" }}>
            Enterprise-ready web platforms, mobile apps, and automation — engineered in Nairobi.
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
            {["Web + Mobile", "Cloud + DevOps", "Security", "UI Systems"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(18,24,38,0.14)",
                  background: "rgba(255,255,255,0.72)",
                  fontSize: 18,
                  letterSpacing: 3.5,
                  textTransform: "uppercase",
                  color: "rgba(18,24,38,0.78)",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", right: 72, bottom: 62 }}>
          <div
            style={{
              width: 240,
              height: 8,
              borderRadius: 999,
              background: "linear-gradient(90deg, rgba(0,144,224,0.9), rgba(10,22,51,0.9))",
              opacity: 0.85,
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
