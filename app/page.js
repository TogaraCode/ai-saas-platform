"use client"
import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function analyze() {
    if (!idea) return

    setLoading(true)

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ idea })
    })

    const data = await res.json()

    setResult(data)
    setLoading(false)
  }

  return (
    <div style={root}>
      <div style={container}>

        {/* HEADER */}
        <div style={header}>
          <div style={logo}>NEXUS CORE</div>
          <input
            placeholder="Search ideas..."
            style={search}
          />
          <div style={icons}>
            <div style={icon}>⚡</div>
            <div style={icon}>👤</div>
          </div>
        </div>

        {/* HERO */}
        <div style={hero}>
          <h1 style={title}>AI VALIDATION ENGINE</h1>

          <input
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your startup idea..."
            style={input}
          />

          <button style={cta} onClick={analyze}>
            ⚡ ANALYZE
          </button>

          {loading && <div style={loadingBar}></div>}
        </div>

        {/* RESULTS */}
        {result && (
          <div style={grid}>

            {/* SCORE */}
            <Panel title="CORE SCORE">
              <ScoreRing value={result.score} />
            </Panel>

            {/* TREND */}
            <Panel title="MARKET TREND">
              <LineChart data={result.trend || []} />
            </Panel>

            {/* COMPETITORS */}
            <Panel title="COMPETITION">
              <div style={tags}>
                {result.competitors?.map((c) => (
                  <div key={c} style={tag}>{c}</div>
                ))}
              </div>
            </Panel>

            {/* MONETIZATION */}
            <Panel title="MONETIZATION">
              <div style={bigNumber}>{result.monetization}</div>
            </Panel>

            {/* RISKS */}
            <Panel title="RISKS">
              {result.risks?.map((r, i) => (
                <div key={i} style={risk}>⚠ {r}</div>
              ))}
            </Panel>

            {/* SUMMARY */}
            <Panel title="AI INSIGHT">
              <div style={summary}>{result.summary}</div>
            </Panel>

            {/* SIGNAL */}
            <Panel title="INVESTMENT SIGNAL">
              <div style={{
                ...signal,
                color:
                  result.score > 75 ? "#22c55e" :
                  result.score > 50 ? "#facc15" :
                  "#f87171"
              }}>
                {result.score > 75
                  ? "STRONG OPPORTUNITY"
                  : result.score > 50
                  ? "MODERATE"
                  : "HIGH RISK"}
              </div>
            </Panel>

          </div>
        )}

      </div>
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

/* SCORE RING */
function ScoreRing({ value }) {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <svg width="140" height="140">
      <circle cx="70" cy="70" r={radius}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="6"
        fill="none"
      />
      <circle cx="70" cy="70" r={radius}
        stroke="url(#grad)"
        strokeWidth="6"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%"
        }}
      />
      <defs>
        <linearGradient id="grad">
          <stop offset="0%" stopColor="#22d3ee"/>
          <stop offset="100%" stopColor="#a855f7"/>
        </linearGradient>
      </defs>
      <text x="50%" y="50%" textAnchor="middle" dy=".3em"
        style={{ fontSize: 28, fill: "white" }}>
        {value}
      </text>
    </svg>
  )
}

/* LINE CHART */
function LineChart({ data }) {
  if (!data.length) return null

  const width = 300
  const height = 120
  const max = Math.max(...data)

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - (d / max) * height
    return `${x},${y}`
  }).join(" ")

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%" }}>
      <polyline
        fill="none"
        stroke="#22d3ee"
        strokeWidth="3"
        points={points}
      />
    </svg>
  )
}

/* ================= STYLES ================= */

const root = {
  minHeight: "100vh",
  background: "#020617",
  color: "white",
  fontFamily: "system-ui"
}

const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: 16
}

const header = {
  display: "flex",
  alignItems: "center",
  marginBottom: 20,
  gap: 10
}

const logo = {
  fontWeight: "bold",
  color: "#22d3ee"
}

const search = {
  flex: 1,
  padding: 10,
  borderRadius: 12,
  background: "#111827",
  border: "1px solid #1f2937",
  color: "white"
}

const icons = {
  display: "flex",
  gap: 8
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
  background: "#111827",
  marginBottom: 20
}

const title = {
  fontSize: 24,
  marginBottom: 10
}

const input = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  marginBottom: 10,
  background: "#020617",
  border: "1px solid #1f2937",
  color: "white"
}

const cta = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  border: "none",
  color: "white",
  fontWeight: "bold"
}

const loadingBar = {
  height: 4,
  marginTop: 10,
  background: "#22d3ee",
  animation: "pulse 1s infinite"
}

const grid = {
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))"
}

const panel = {
  padding: 16,
  borderRadius: 16,
  background: "#111827"
}

const panelTitle = {
  marginBottom: 10,
  color: "#22d3ee"
}

const tags = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap"
}

const tag = {
  padding: "6px 10px",
  borderRadius: 10,
  background: "#020617"
}

const risk = {
  color: "#f87171",
  fontSize: 12
}

const summary = {
  opacity: 0.8,
  lineHeight: 1.5
}

const bigNumber = {
  fontSize: 28,
  fontWeight: "bold"
}

const signal = {
  fontSize: 20,
  fontWeight: "bold"
}
