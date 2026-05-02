"use client"

export default function Home() {
  return (
    <div style={{
      background: "#020617",
      color: "white",
      minHeight: "100vh",
      padding: 20,
      fontFamily: "system-ui"
    }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 20
      }}>
        <h1 style={{
          background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          TOGARA TECH
        </h1>

        <div style={{ color: "#94a3b8" }}>
          AI SaaS Idea Generator
        </div>
      </div>

      {/* GRID */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 20
      }}>

        {/* PANEL 1 */}
        <Panel title="WHAT THIS DOES">
          <img
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485"
            style={{ width: "100%", borderRadius: 12 }}
          />
          <p style={{ marginTop: 10 }}>
            AI evaluates your idea using market signals and data patterns
          </p>
        </Panel>

        {/* PANEL 2 */}
        <Panel title="KEY METRICS">
          <Metrics />
        </Panel>

        {/* PANEL 3 */}
        <Panel title="MARKET DATA">
          <img
            src="https://images.unsplash.com/photo-1535223289827-42f1e9919769"
            style={{ width: "100%", borderRadius: 12 }}
          />
        </Panel>

        {/* PANEL 4 */}
        <Panel title="PRICING">
          <Pricing />
        </Panel>

      </div>

    </div>
  )
}

function Panel({ title, children }) {
  return (
    <div style={{
      borderRadius: 20,
      padding: 20,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(168,85,247,0.3)",
      boxShadow: "0 0 30px rgba(168,85,247,0.2)"
    }}>
      <h3 style={{
        marginBottom: 10,
        color: "#22d3ee"
      }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

function Metrics() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10
    }}>
      {[
        ["Idea Score", "82"],
        ["Demand", "78"],
        ["Monetization", "74"],
        ["Market Size", "€2.4B"]
      ].map(([label, value]) => (
        <div key={label} style={{
          padding: 10,
          borderRadius: 12,
          background: "rgba(255,255,255,0.05)"
        }}>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>{label}</div>
          <div style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#22d3ee"
          }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  )
}

function Pricing() {
  return (
    <div style={{
      display: "grid",
      gap: 10
    }}>
      <Card title="Free" desc="Idea scoring + basic insights" />
      <Card title="Pro" desc="€50 + €10/mo\nAdvanced analysis + suggestions" />
      <Card title="Elite" desc="€2000 + €100/mo\nFull business + deployment" highlight />
    </div>
  )
}

function Card({ title, desc, highlight }) {
  return (
    <div style={{
      padding: 15,
      borderRadius: 15,
      background: highlight
        ? "linear-gradient(120deg,#22d3ee,#a855f7)"
        : "rgba(255,255,255,0.05)",
      color: highlight ? "black" : "white"
    }}>
      <strong>{title}</strong>
      <p style={{ whiteSpace: "pre-line" }}>{desc}</p>
    </div>
  )
}
