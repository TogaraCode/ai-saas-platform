"use client"
import { useState, useEffect } from "react"

/* ================= MAIN ================= */

export default function Home() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div style={root}>

      {/* BACKGROUND */}
      <div style={bg}></div>
      <div style={grid}></div>

      <div style={content}>

        {/* HEADER */}
        <div style={header}>
          <div style={logo}>
            <span style={logoMain}>QUANTUM</span>
            <span style={logoSub}>CORE</span>
          </div>

          <input placeholder="Search ideas..." style={search} />

          <div style={icon}>⚡</div>
          <div style={icon}>👤</div>
        </div>

        {/* HERO */}
        <div style={hero}>
          <h1 style={title}>
            <span style={gradient}>BUILD LESS.</span><br/>
            <span style={gradient}>WIN MORE.</span>
          </h1>

          <p style={subtitle}>
            AI predicts startup success using real-world signals
          </p>

          <input placeholder="Describe your idea..." style={input} />

          <button
            style={cta}
            onClick={() => {
              setLoading(true)
              setTimeout(() => {
                setLoading(false)
                setResult({
                  score: 87,
                  mrr: 14890,
                  growth: 24.6,
                  conversion: 23.6,
                  ltv: 612,
                  cac: 70
                })
              }, 1200)
            }}
          >
            ⚡ ANALYZE
          </button>

          {loading && <div style={scan}></div>}
        </div>

        {/* KPI STRIP */}
        {result && (
          <div style={kpiRow}>
            <KPI label="MRR" value={`€${result.mrr}`} />
            <KPI label="Growth" value={`${result.growth}%`} />
            <KPI label="Conversion" value={`${result.conversion}%`} />
            <KPI label="LTV/CAC" value={(result.ltv / result.cac).toFixed(1) + "x"} />
          </div>
        )}

        {/* DASHBOARD */}
        {result && (
          <div style={dashboard}>

            <Panel title="AI SCORE">
              <Holo value={result.score} />
            </Panel>

            <Panel title="REVENUE TREND">
              <LineChart />
            </Panel>

            <Panel title="GROWTH FUNNEL">
              <Funnel />
            </Panel>

            <Panel title="UNIT ECONOMICS">
              <Economics ltv={result.ltv} cac={result.cac} />
            </Panel>

          </div>
        )}

      </div>

      {/* ANIMATIONS */}
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

        @keyframes scan {
          0% { transform: translateX(-100%) }
          100% { transform: translateX(100%) }
        }
      `}</style>

    </div>
  )
}

/* ================= COMPONENTS ================= */

function KPI({ label, value }) {
  return (
    <div style={kpi}>
      <div style={kpiValue}>{value}</div>
      <div style={kpiLabel}>{label}</div>
    </div>
  )
}

function Panel({ title, children }) {
  return (
    <div style={panel}>
      <div style={panelTitle}>{title}</div>
      {children}
    </div>
  )
}

function Holo({ value }) {
  return (
    <div style={holo}>
      <div style={ring}></div>
      <div style={center}>{value}</div>
    </div>
  )
}

function LineChart() {
  return (
    <svg viewBox="0 0 300 120" style={{ width: "100%" }}>
      <polyline
        fill="none"
        stroke="url(#g)"
        strokeWidth="3"
        points="0,100 50,80 100,60 150,45 200,30 250,20 300,10"
      />
      <defs>
        <linearGradient id="g">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Funnel() {
  const steps = [
    ["Awareness", "100%"],
    ["Signup", "23%"],
    ["Activated", "62%"],
    ["Paid", "4.9%"]
  ]

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {steps.map(([l, v], i) => (
        <div key={i} style={funnelRow}>
          <span>{l}</span>
          <span style={{ color: "#22d3ee" }}>{v}</span>
        </div>
      ))}
    </div>
  )
}

function Economics({ ltv, cac }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div>LTV: €{ltv}</div>
      <div>CAC: €{cac}</div>
      <div style={{ color: "#22d3ee" }}>
        Ratio: {(ltv / cac).toFixed(1)}x
      </div>
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

const content = { padding: 16 }

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
  padding: 24,
  borderRadius: 24,
  background: "rgba(255,255,255,0.05)",
  marginBottom: 20
}

const gradient = {
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}

const title = { fontSize: 34 }
const subtitle = { opacity: 0.7 }

const input = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  marginTop: 10,
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
  animation: "glow 2s infinite"
}

const scan = {
  height: 4,
  marginTop: 10,
  background: "linear-gradient(90deg,#22d3ee,#a855f7)",
  animation: "scan 1s infinite"
}

const kpiRow = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 10,
  marginBottom: 20
}

const kpi = {
  padding: 14,
  borderRadius: 12,
  background: "rgba(255,255,255,0.05)"
}

const kpiValue = { fontSize: 18, color: "#22d3ee" }
const kpiLabel = { fontSize: 12, opacity: 0.6 }

const dashboard = {
  display: "grid",
  gap: 14,
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))"
}

const panel = {
  padding: 18,
  borderRadius: 18,
  background: "rgba(255,255,255,0.05)"
}

const panelTitle = {
  marginBottom: 10,
  color: "#22d3ee"
}

const holo = {
  width: 120,
  height: 120,
  margin: "auto",
  position: "relative"
}

const ring = {
  position: "absolute",
  inset: 0,
  borderRadius: "50%",
  border: "2px solid #22d3ee",
  animation: "spin 6s linear infinite"
}

const center = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 26
}

const funnelRow = {
  display: "flex",
  justifyContent: "space-between",
  padding: 8,
  background: "rgba(255,255,255,0.05)",
  borderRadius: 8
}
