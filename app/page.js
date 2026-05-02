"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const isMobile = width < 640

  return (
    <div style={root}>

      {/* BACKGROUND */}
      <div style={bg}></div>
      <div style={grid}></div>

      <div style={content}>

        {/* HEADER */}
        <div style={header}>
          <div style={logo}>
            <span style={logoMain}>NEXUS</span>
            <span style={logoSub}>CORE</span>
          </div>

          {!isMobile && <input placeholder="Search ideas..." style={search} />}

          <div style={icon}>⚡</div>
          <div style={icon}>👤</div>
        </div>

        {/* HERO */}
        <div style={hero}>
          <h1 style={title}>
            <span style={gradientText}>AI VALIDATION</span><br/>
            <span style={gradientText}>SYSTEM</span>
          </h1>

          <p style={subtitle}>
            Predict success before you build.
          </p>

          <input placeholder="Describe your idea..." style={input} />

          <button
            style={cta}
            onClick={() => {
              setLoading(true)
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

        {/* DASHBOARD */}
        {result && (
          <div style={dashboard}>

            <Panel title="CORE SCORE">
              <HolographicChart value={result.score} />
            </Panel>

            <Panel title="GROWTH TRAJECTORY">
              <LineChart />
            </Panel>

            <Panel title="MARKET EXPANSION">
              <BarChart />
            </Panel>

            <Panel title="SYSTEM SIGNALS">
              <Status />
            </Panel>

          </div>
        )}

      </div>

      <style>{`
        @keyframes glow {
          0% { box-shadow: 0 0 10px #22d3ee }
          50% { box-shadow: 0 0 40px #a855f7 }
          100% { box-shadow: 0 0 10px #22d3ee }
        }

        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.7 }
          50% { transform: scale(1.15); opacity: 1 }
          100% { transform: scale(1); opacity: 0.7 }
        }

        @keyframes scan {
          0% { transform: translateX(-100%) }
          100% { transform: translateX(100%) }
        }
      `}</style>

    </div>
  )
}

/* ================= COMPONENTS ================= */

function Panel({ title, children }) {
  return (
    <div style={panel}>
      <div style={panelTitle}>{title}</div>
      {children}
    </div>
  )
}

/* 🔵 HOLOGRAPHIC RING */
function HolographicChart({ value }) {
  return (
    <div style={holoWrap}>
      <div style={ringOuter}></div>
      <div style={ringMid}></div>
      <div style={ringInner}></div>
      <div style={center}>{value}</div>
    </div>
  )
}

/* 📈 LINE */
function LineChart() {
  return (
    <svg viewBox="0 0 300 120" style={{ width: "100%" }}>
      <polyline
        fill="none"
        stroke="url(#grad)"
        strokeWidth="3"
        points="0,100 50,85 100,60 150,50 200,35 250,20 300,10"
        style={{ filter: "drop-shadow(0 0 15px #22d3ee)" }}
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

/* 📊 BARS */
function BarChart() {
  const data = [40, 80, 110, 140]

  return (
    <div style={bars}>
      {data.map((d, i) => (
        <div key={i} style={{
          height: d,
          flex: 1,
          borderRadius: 8,
          background: "linear-gradient(180deg,#22d3ee,#a855f7)",
          boxShadow: "0 0 25px #22d3ee"
        }} />
      ))}
    </div>
  )
}

/* STATUS */
function Status() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <Stat label="AI Engine" value="ACTIVE" />
      <Stat label="Market Signal" value="STRONG" />
      <Stat label="Competition" value="MEDIUM" />
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div style={statBox}>
      <span>{label}</span>
      <span style={{ color: "#22d3ee" }}>{value}</span>
    </div>
  )
}

/* ================= STYLES ================= */

const root = {
  minHeight: "100vh",
  fontFamily: "Orbitron, system-ui",
  color: "white"
}

const bg = {
  position: "fixed",
  inset: 0,
  background: `
    radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25), transparent),
    radial-gradient(circle at 80% 40%, rgba(34,211,238,0.25), transparent),
    #020617`
}

const grid = {
  position: "fixed",
  inset: 0,
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
  `,
  backgroundSize: "40px 40px",
  opacity: 0.2
}

const content = { position: "relative", padding: 16 }

const header = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  marginBottom: 20
}

const logoMain = { color: "#22d3ee", fontWeight: 900 }
const logoSub = { color: "#a855f7" }
const logo = { display: "flex", gap: 6, fontSize: 18 }

const search = {
  flex: 1,
  padding: 10,
  borderRadius: 12,
  background: "rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white"
}

const icon = {
  width: 42,
  height: 42,
  borderRadius: "50%",
  background: "linear-gradient(#22d3ee,#a855f7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 20px #22d3ee"
}

const hero = {
  padding: 24,
  borderRadius: 24,
  background: "rgba(0,0,0,0.6)",
  marginBottom: 20,
  border: "1px solid rgba(168,85,247,0.3)"
}

const gradientText = {
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}

const title = { fontSize: 32, marginBottom: 10 }
const subtitle = { opacity: 0.7, marginBottom: 10 }

const input = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  marginBottom: 10,
  background: "rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white"
}

const cta = {
  width: "100%",
  padding: 16,
  borderRadius: 16,
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  border: "none",
  fontWeight: "bold",
  animation: "glow 2s infinite"
}

const scan = {
  height: 4,
  marginTop: 10,
  background: "linear-gradient(90deg,#22d3ee,#a855f7)",
  animation: "scan 1s infinite"
}

const dashboard = {
  display: "grid",
  gap: 14,
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))"
}

const panel = {
  padding: 18,
  borderRadius: 18,
  background: "rgba(0,0,0,0.65)",
  border: "1px solid rgba(168,85,247,0.3)"
}

const panelTitle = {
  marginBottom: 12,
  color: "#22d3ee",
  fontSize: 14
}

const statBox = {
  display: "flex",
  justifyContent: "space-between",
  padding: 8,
  background: "rgba(255,255,255,0.05)",
  borderRadius: 8
}

const holoWrap = {
  width: 130,
  height: 130,
  margin: "auto",
  position: "relative"
}

const ringOuter = {
  position: "absolute",
  inset: 0,
  borderRadius: "50%",
  border: "2px solid #22d3ee",
  animation: "spin 8s linear infinite"
}

const ringMid = {
  position: "absolute",
  inset: 18,
  borderRadius: "50%",
  border: "2px solid #a855f7",
  animation: "spin 5s linear infinite reverse"
}

const ringInner = {
  position: "absolute",
  inset: 35,
  borderRadius: "50%",
  border: "2px solid #ec4899",
  animation: "pulse 2s infinite"
}

const center = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 26
}

const bars = {
  display: "flex",
  gap: 8,
  height: 130,
  alignItems: "flex-end"
}
