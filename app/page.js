"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const update = () => setWidth(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const isMobile = width < 600
  const isTablet = width >= 600 && width < 1000

  return (
    <div style={root}>

      <div style={bg}></div>
      <div style={gridOverlay}></div>

      <div style={content}>

        {/* HEADER */}
        <div style={header}>
          <div style={logo}>
            <span style={logoMain}>NEXUS</span>
            <span style={logoSub}>//CORE</span>
          </div>

          {!isMobile && (
            <input placeholder="Search ideas..." style={search} />
          )}

          <div style={icon}>⚡</div>
          <div style={icon}>👤</div>
        </div>

        {/* HERO */}
        <div style={hero}>
          <h1 style={title}>
            BUILD • VALIDATE • SCALE
          </h1>

          <input placeholder="Describe your idea..." style={input} />

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
                  monetization: 74,
                  growth: 91
                })
              }, 1200)
            }}
          >
            ⚡ ANALYZE
          </button>

          {loading && <div style={scan}></div>}
        </div>

        {/* METRICS */}
        {result && (
          <div style={{
            ...metricsGrid,
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
              ? "repeat(2,1fr)"
              : "repeat(4,1fr)"
          }}>
            <MetricCard label="IDEA" value={result.score} />
            <MetricCard label="DEMAND" value={result.demand} />
            <MetricCard label="MONEY" value={result.monetization} />
            <MetricCard label="GROWTH" value={result.growth} />
          </div>
        )}

        {/* DASHBOARD */}
        <div style={{
          ...dashboardGrid,
          gridTemplateColumns: isMobile
            ? "1fr"
            : isTablet
            ? "repeat(2,1fr)"
            : "repeat(2,1fr)"
        }}>

          <Panel title="TRAJECTORY">
            <LineChart />
          </Panel>

          <Panel title="MARKET">
            <BarChart />
          </Panel>

          <Panel title="FUNNEL">
            <Funnel />
          </Panel>

          <Panel title="STATUS">
            <Status />
          </Panel>

        </div>

      </div>

      <style>{`
        @keyframes glow {
          0% { box-shadow: 0 0 10px #22d3ee }
          50% { box-shadow: 0 0 25px #a855f7 }
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

function Panel({ title, children }) {
  return (
    <div style={panel}>
      <div style={panelTitle}>{title}</div>
      {children}
    </div>
  )
}

function MetricCard({ label, value }) {
  return (
    <div style={metricCard}>
      <div style={metricLabel}>{label}</div>
      <div style={metricValue}>{value}</div>
    </div>
  )
}

function LineChart() {
  return (
    <svg viewBox="0 0 300 120" style={{ width: "100%" }}>
      <polyline
        fill="none"
        stroke="url(#grad)"
        strokeWidth="3"
        points="0,100 50,80 100,70 150,50 200,40 250,20 300,30"
        style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }}
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

function BarChart() {
  const data = [40, 70, 90, 120]

  return (
    <div style={bars}>
      {data.map((d, i) => (
        <div key={i} style={{
          height: d,
          flex: 1,
          borderRadius: 6,
          background: "linear-gradient(#22d3ee,#a855f7)",
          boxShadow: "0 0 10px #22d3ee"
        }} />
      ))}
    </div>
  )
}

function Funnel() {
  const data = [
    ["Awareness", "100%"],
    ["Signup", "12%"],
    ["Activated", "62%"],
    ["Paid", "4.9%"]
  ]

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {data.map(([l, v]) => (
        <div key={l} style={funnelRow}>
          {l}
          <span style={{ color: "#22d3ee" }}>{v}</span>
        </div>
      ))}
    </div>
  )
}

function Status() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={statusGood}>AI: ONLINE</div>
      <div style={statusGood}>SCAN: ACTIVE</div>
      <div style={statusWarn}>COMP: MEDIUM</div>
      <div style={statusGood}>REV: HIGH</div>
    </div>
  )
}

/* STYLES */

const root = { minHeight: "100vh", color: "white", fontFamily: "system-ui" }

const bg = {
  position: "fixed",
  inset: 0,
  background: `
    radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25), transparent),
    radial-gradient(circle at 80% 40%, rgba(34,211,238,0.25), transparent),
    #020617
  `
}

const gridOverlay = {
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
  alignItems: "center",
  gap: 10,
  marginBottom: 20
}

const logo = { display: "flex", gap: 6, alignItems: "center" }

const logoMain = {
  fontWeight: "bold",
  fontSize: 18,
  color: "#22d3ee"
}

const logoSub = {
  fontSize: 14,
  color: "#a855f7"
}

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

const title = { fontSize: 24, marginBottom: 10 }

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
  color: "white",
  animation: "glow 2s infinite"
}

const scan = {
  height: 4,
  marginTop: 10,
  background: "linear-gradient(90deg,#22d3ee,#a855f7)",
  animation: "scan 1s infinite"
}

const metricsGrid = { display: "grid", gap: 10, marginBottom: 20 }

const metricCard = {
  padding: 16,
  borderRadius: 16,
  background: "rgba(0,0,0,0.6)"
}

const metricLabel = { fontSize: 12, opacity: 0.7 }

const metricValue = { fontSize: 20, color: "#22d3ee" }

const dashboardGrid = { display: "grid", gap: 14 }

const panel = {
  padding: 16,
  borderRadius: 16,
  background: "rgba(0,0,0,0.6)"
}

const panelTitle = { marginBottom: 10, color: "#22d3ee" }

const bars = { display: "flex", alignItems: "flex-end", gap: 6, height: 120 }

const funnelRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: 8,
  borderRadius: 8,
  background: "rgba(255,255,255,0.05)"
}

const statusGood = { color: "#22d3ee" }
const statusWarn = { color: "#facc15" }
