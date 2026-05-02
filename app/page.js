"use client"
import { useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  return (
    <div style={root}>

      {/* BACKGROUND */}
      <div style={bg}></div>
      <div style={gridOverlay}></div>

      <div style={content}>

        {/* HEADER */}
        <div style={header}>
          <div style={logo}>TOGARA.AI</div>

          <input placeholder="Search ideas..." style={search} />

          <div style={icon}>⚡</div>
          <div style={icon}>👤</div>
        </div>

        {/* HERO / INPUT */}
        <div style={hero}>
          <h1 style={title}>AI SAAS ENGINE</h1>

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
          <div style={metricsGrid}>
            <MetricCard label="IDEA SCORE" value={result.score} />
            <MetricCard label="DEMAND" value={result.demand} />
            <MetricCard label="MONETIZATION" value={result.monetization} />
            <MetricCard label="GROWTH" value={result.growth} />
          </div>
        )}

        {/* DASHBOARD GRID */}
        <div style={dashboardGrid}>

          <Panel title="REVENUE TRAJECTORY">
            <LineChart />
          </Panel>

          <Panel title="MARKET BREAKDOWN">
            <BarChart />
          </Panel>

          <Panel title="CONVERSION FUNNEL">
            <Funnel />
          </Panel>

          <Panel title="SYSTEM STATUS">
            <Status />
          </Panel>

        </div>

      </div>

      {/* ANIMATIONS */}
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
      <div style={statusGood}>AI Engine: ONLINE</div>
      <div style={statusGood}>Market Scan: ACTIVE</div>
      <div style={statusWarn}>Competition: MEDIUM</div>
      <div style={statusGood}>Revenue Potential: HIGH</div>
    </div>
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

const content = {
  position: "relative",
  zIndex: 1,
  padding: 16
}

const header = {
  display: "flex",
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
  border: "1px solid rgba(168,85,247,0.4)",
  marginBottom: 20
}

const title = {
  fontSize: 28,
  marginBottom: 10
}

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
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  color: "white",
  border: "none",
  animation: "glow 2s infinite"
}

const scan = {
  height: 4,
  marginTop: 10,
  background: "linear-gradient(90deg,#22d3ee,#a855f7)",
  animation: "scan 1s infinite"
}

const metricsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  gap: 10,
  marginBottom: 20
}

const metricCard = {
  padding: 16,
  borderRadius: 16,
  background: "rgba(0,0,0,0.6)",
  border: "1px solid rgba(168,85,247,0.4)"
}

const metricLabel = {
  fontSize: 12,
  opacity: 0.7
}

const metricValue = {
  fontSize: 20,
  color: "#22d3ee"
}

const dashboardGrid = {
  display: "grid",
  gap: 14
}

const panel = {
  padding: 16,
  borderRadius: 16,
  background: "rgba(0,0,0,0.6)",
  border: "1px solid rgba(168,85,247,0.4)"
}

const panelTitle = {
  marginBottom: 10,
  color: "#22d3ee"
}

const bars = {
  display: "flex",
  alignItems: "flex-end",
  gap: 6,
  height: 120
}

const funnelRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: 8,
  borderRadius: 8,
  background: "rgba(255,255,255,0.05)"
}

const statusGood = {
  color: "#22d3ee"
}

const statusWarn = {
  color: "#facc15"
}
