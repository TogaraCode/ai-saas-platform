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
            <span style={logoSub}>//CORE</span>
          </div>

          {!isMobile && <input placeholder="Search..." style={search} />}

          <div style={icon}>⚡</div>
          <div style={icon}>👤</div>
        </div>

        {/* HERO */}
        <div style={hero}>
          <h1 style={title}>AI VALIDATION ENGINE</h1>

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

        {/* RESULTS */}
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

            <Panel title="SYSTEM STATUS">
              <Status />
            </Panel>
          </div>
        )}

      </div>

      <style>{`
        @keyframes glow {
          0% { box-shadow: 0 0 10px #22d3ee }
          50% { box-shadow: 0 0 25px #a855f7 }
          100% { box-shadow: 0 0 10px #22d3ee }
        }

        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8 }
          50% { transform: scale(1.1); opacity: 1 }
          100% { transform: scale(1); opacity: 0.8 }
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

/* 🔵 HOLOGRAPHIC CHART */
function HolographicChart({ value }) {
  return (
    <div style={holoWrap}>
      <div style={ringOuter}></div>
      <div style={ringMid}></div>
      <div style={ringInner}></div>

      <div style={center}>
        {value}
      </div>
    </div>
  )
}

/* 📈 LINE GRAPH */
function LineChart() {
  return (
    <svg viewBox="0 0 300 120" style={{ width: "100%" }}>
      <polyline
        fill="none"
        stroke="url(#grad)"
        strokeWidth="3"
        points="0,100 50,80 100,60 150,50 200,30 250,20 300,10"
        style={{ filter: "drop-shadow(0 0 10px #22d3ee)" }}
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

/* 📊 BAR GRAPH */
function BarChart() {
  const data = [40, 80, 100, 120]

  return (
    <div style={bars}>
      {data.map((d, i) => (
        <div key={i} style={{
          height: d,
          flex: 1,
          borderRadius: 6,
          background: "linear-gradient(#22d3ee,#a855f7)",
          boxShadow: "0 0 15px #22d3ee"
        }} />
      ))}
    </div>
  )
}

/* STATUS */
function Status() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ color: "#22d3ee" }}>AI: ACTIVE</div>
      <div style={{ color: "#22d3ee" }}>SCAN: RUNNING</div>
      <div style={{ color: "#facc15" }}>COMP: MEDIUM</div>
    </div>
  )
}

/* ================= STYLES ================= */

const root = {
  minHeight: "100vh",
  fontFamily: "'Orbitron','Space Grotesk',system-ui",
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
  marginBottom: 20
}

const logoMain = { color: "#22d3ee", fontWeight: 900 }
const logoSub = { color: "#a855f7" }
const logo = { display: "flex", gap: 6 }

const search = {
  flex: 1,
  padding: 10,
  borderRadius: 12,
  background: "rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white"
}

const icon = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: "linear-gradient(#22d3ee,#a855f7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

const hero = {
  padding: 20,
  borderRadius: 20,
  background: "rgba(0,0,0,0.6)",
  marginBottom: 20
}

const title = { fontSize: 26, marginBottom: 10 }

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  marginBottom: 10,
  background: "rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white"
}

const cta = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  background: "linear-gradient(90deg,#22d3ee,#a855f7)",
  border: "none",
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
  padding: 16,
  borderRadius: 16,
  background: "rgba(0,0,0,0.6)"
}

const panelTitle = {
  marginBottom: 10,
  color: "#22d3ee"
}

/* HOLO CHART */
const holoWrap = {
  width: 120,
  height: 120,
  margin: "auto",
  position: "relative"
}

const ringOuter = {
  position: "absolute",
  inset: 0,
  borderRadius: "50%",
  border: "2px solid #22d3ee",
  animation: "spin 6s linear infinite"
}

const ringMid = {
  position: "absolute",
  inset: 15,
  borderRadius: "50%",
  border: "2px solid #a855f7",
  animation: "spin 4s linear infinite reverse"
}

const ringInner = {
  position: "absolute",
  inset: 30,
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
  fontSize: 24
}

const bars = {
  display: "flex",
  gap: 6,
  height: 120,
  alignItems: "flex-end"
}
