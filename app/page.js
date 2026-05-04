"use client"
import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function analyzeIdea() {
    if (!idea) return

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idea })
      })

      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div style={root}>

      {/* BACKGROUND */}
      <div style={bg} />
      <div style={grid} />

      <div style={content}>

        {/* HEADER */}
        <div style={header}>
          <div style={logo}>
            <span style={logoMain}>NEXUS</span>
            <span style={logoSub}>CORE</span>
          </div>

          <input
            placeholder="Search ideas..."
            style={search}
          />

          <div style={icon}>⚡</div>
          <div style={icon}>👤</div>
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

          <button onClick={analyzeIdea} style={cta}>
            ⚡ ANALYZE
          </button>

          {loading && <div style={scan} />}
        </div>

        {/* RESULTS */}
        {result && (
          <div style={dashboard}>

            <Panel title="CORE SCORE">
              <Holo value={result.score || 0} />
            </Panel>

            <Panel title="MARKET">
              <div style={text}>
                {result.market_size}
              </div>
            </Panel>

            <Panel title="USER">
              <div style={text}>
                {result.target_user}
              </div>
            </Panel>

            <Panel title="MONETIZATION">
              <div style={text}>
                {result.monetization}
              </div>
            </Panel>

            <Panel title="RISKS">
              <ul>
                {result.risks?.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </Panel>

            <Panel title="SUMMARY">
              <div style={text}>
                {result.summary}
              </div>
            </Panel>

          </div>
        )}

      </div>

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

        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
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

function Holo({ value }) {
  return (
    <div style={holo}>
      <div style={ring} />
      <div style={center}>{value}</div>
    </div>
  )
}

/* ================= STYLES ================= */

const root = {
  minHeight: "100vh",
  color: "white",
  fontFamily: "system-ui"
}

const bg = {
  position: "fixed",
  inset: 0,
  background: `
    radial-gradient(circle at 20% 20%, rgba(168,85,247,0.3), transparent),
    radial-gradient(circle at 80% 40%, rgba(34,211,238,0.3), transparent),
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

const content = {
  position: "relative",
  padding: 16
}

const header = {
  display: "flex",
  gap: 10,
  marginBottom: 20,
  alignItems: "center"
}

const logo = { display: "flex", gap: 6 }
const logoMain = { color: "#22d3ee", fontWeight: 900 }
const logoSub = { color: "#a855f7" }

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

const title = {
  fontSize: 26,
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
  border: "none",
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  color: "white",
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
  padding: 16,
  borderRadius: 16,
  background: "rgba(0,0,0,0.6)"
}

const panelTitle = {
  marginBottom: 10,
  color: "#22d3ee"
}

const text = {
  opacity: 0.8
}

/* HOLO */

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
  fontSize: 24
}
