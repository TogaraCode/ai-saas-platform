"use client"
import { useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  return (
    <div style={root}>

      {/* BACKGROUND */}
      <div style={bg}></div>

      <div style={content}>

        {/* HEADER */}
        <div style={header}>
          <div style={logo}>TOGARA.AI</div>

          <input placeholder="Search ideas..." style={search} />

          <div style={icon}>⚡</div>
          <div style={icon}>👤</div>
        </div>

        {/* HERO */}
        <div style={card}>

          <h1 style={title}>TURN IDEAS INTO MONEY</h1>

          <p style={subtitle}>
            AI-powered SaaS validation engine
          </p>

          <input placeholder="Describe your startup idea..." style={input} />

          <button
            style={cta}
            onClick={() => {
              setLoading(true)
              setResult(null)

              setTimeout(() => {
                setLoading(false)
                setResult({
                  score: 82,
                  demand: 78,
                  monetization: 74
                })
              }, 1200)
            }}
          >
            ⚡ ANALYZE
          </button>

          {loading && <div style={scan}></div>}

        </div>

        {/* RESULTS */}
        {result && (
          <div style={results}>
            <Stat label="IDEA SCORE" value={result.score} />
            <Stat label="DEMAND" value={result.demand} />
            <Stat label="MONETIZATION" value={result.monetization} />
          </div>
        )}

        {/* FUTURISTIC CHART */}
        <div style={card}>
          <div style={sectionTitle}>GROWTH</div>
          <Chart />
        </div>

      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes glow {
          0% { box-shadow: 0 0 10px #22d3ee }
          50% { box-shadow: 0 0 30px #a855f7 }
          100% { box-shadow: 0 0 10px #22d3ee }
        }

        @keyframes scan {
          0% { transform: translateX(-100%) }
          100% { transform: translateX(100%) }
        }
      `}</style>

    </div>
  )
}

/* COMPONENTS */

function Stat({ label, value }) {
  return (
    <div style={stat}>
      <div style={{ opacity: 0.6 }}>{label}</div>
      <div style={statValue}>{value}</div>
    </div>
  )
}

function Chart() {
  return (
    <svg viewBox="0 0 300 120" style={{ width: "100%" }}>
      <polyline
        fill="none"
        stroke="url(#grad)"
        strokeWidth="3"
        points="0,100 50,80 100,70 150,50 200,40 250,20 300,30"
        style={{
          filter: "drop-shadow(0 0 8px #22d3ee)"
        }}
      />
      <defs>
        <linearGradient id="grad">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* STYLES */

const root = {
  minHeight: "100vh",
  color: "white",
  fontFamily: "system-ui"
}

const bg = {
  position: "fixed",
  inset: 0,
  background: `
    radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25), transparent),
    radial-gradient(circle at 80% 40%, rgba(34,211,238,0.25), transparent),
    #020617
  `,
  zIndex: 0
}

const content = {
  position: "relative",
  zIndex: 1,
  padding: 16
}

const header = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 20
}

const logo = {
  fontWeight: "bold",
  fontSize: 20,
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}

const search = {
  flex: 1,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.4)",
  color: "white"
}

const icon = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#22d3ee,#a855f7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 20px #22d3ee"
}

const card = {
  padding: 20,
  borderRadius: 20,
  background: "rgba(0,0,0,0.6)",
  border: "1px solid rgba(168,85,247,0.4)",
  marginBottom: 20
}

const title = {
  fontSize: 30,
  fontWeight: "bold",
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}

const subtitle = {
  opacity: 0.7,
  marginBottom: 10
}

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.4)",
  color: "white"
}

const cta = {
  marginTop: 12,
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "none",
  fontWeight: "bold",
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  color: "white",
  animation: "glow 2s infinite"
}

const scan = {
  marginTop: 10,
  height: 4,
  borderRadius: 10,
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  animation: "scan 1s infinite"
}

const results = {
  display: "flex",
  gap: 10,
  marginBottom: 20
}

const stat = {
  flex: 1,
  padding: 16,
  borderRadius: 16,
  background: "rgba(0,0,0,0.6)",
  border: "1px solid rgba(168,85,247,0.4)"
}

const statValue = {
  color: "#22d3ee",
  fontSize: 20,
  fontWeight: "bold"
}

const sectionTitle = {
  marginBottom: 10,
  color: "#22d3ee"
}
