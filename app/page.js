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
            <span style={logoSub}>AI</span>
          </div>

          <input placeholder="Search startup ideas..." style={search} />

          <div style={icon}>⚡</div>
          <div style={icon}>👤</div>
        </div>

        {/* HERO */}
        <TiltCard>
          <div style={hero}>
            <h1 style={title}>
              <span style={gradientText}>PREDICT</span><br />
              <span style={gradientText}>SUCCESS</span>
            </h1>

            <p style={subtitle}>
              AI-powered SaaS validation engine
            </p>

            <input placeholder="Describe your idea..." style={input} />

            <button
              style={cta}
              onClick={() => {
                setLoading(true)
                setTimeout(() => {
                  setLoading(false)
                  setResult({
                    score: 86,
                    demand: 81,
                    monetization: 76,
                    revenue: 14890,
                    growth: 24.6
                  })
                }, 1200)
              }}
            >
              ⚡ ANALYZE
            </button>

            {loading && <div style={scan}></div>}
          </div>
        </TiltCard>

        {/* DASHBOARD */}
        {result && (
          <div style={dashboard}>

            <TiltCard>
              <Panel title="CORE SCORE">
                <Holo value={result.score} />
              </Panel>
            </TiltCard>

            <TiltCard>
              <Panel title="REVENUE TRACTION">
                <Counter value={result.revenue} prefix="€" />
                <LineChart />
              </Panel>
            </TiltCard>

            <TiltCard>
              <Panel title="MARKET EXPANSION">
                <BarChart />
              </Panel>
            </TiltCard>

            <TiltCard>
              <Panel title="GROWTH RATE">
                <Counter value={result.growth} suffix="%" />
              </Panel>
            </TiltCard>

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

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.7 }
          50% { transform: scale(1.2); opacity: 1 }
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

/* 🔥 3D TILT CARD */
function TiltCard({ children }) {
  const [style, setStyle] = useState({})

  return (
    <div
      style={{ ...tilt, ...style }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const rotateX = -(y - rect.height / 2) / 15
        const rotateY = (x - rect.width / 2) / 15

        setStyle({
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
        })
      }}
      onMouseLeave={() => setStyle({ transform: "rotateX(0) rotateY(0)" })}
    >
      {children}
    </div>
  )
}

/* PANEL */
function Panel({ title, children }) {
  return (
    <div style={panel}>
      <div style={panelTitle}>{title}</div>
      {children}
    </div>
  )
}

/* 🧠 HOLOGRAM */
function Holo({ value }) {
  return (
    <div style={holo}>
      <div style={ring}></div>
      <div style={center}>{value}</div>
    </div>
  )
}

/* 💰 COUNTER */
function Counter({ value, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i += value / 30
      if (i >= value) {
        i = value
        clearInterval(interval)
      }
      setCount(Math.floor(i))
    }, 30)
  }, [value])

  return (
    <div style={counter}>
      {prefix}{count}{suffix}
    </div>
  )
}

/* 📈 LINE */
function LineChart() {
  return (
    <svg viewBox="0 0 300 120" style={{ width: "100%" }}>
      <polyline
        fill="none"
        stroke="url(#g)"
        strokeWidth="3"
        points="0,100 60,80 120,60 180,40 240,20 300,10"
        style={{ filter: "drop-shadow(0 0 15px #22d3ee)" }}
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

/* 📊 BARS */
function BarChart() {
  const data = [50, 80, 120, 150]

  return (
    <div style={bars}>
      {data.map((d, i) => (
        <div key={i} style={{
          height: d,
          flex: 1,
          borderRadius: 8,
          background: "linear-gradient(#22d3ee,#a855f7)",
          boxShadow: "0 0 20px #22d3ee"
        }} />
      ))}
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
  backdropFilter: "blur(20px)"
}

const gradientText = {
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}

const title = { fontSize: 34 }
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
  marginTop: 20,
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))"
}

const panel = {
  padding: 18,
  borderRadius: 18,
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px)"
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

const bars = {
  display: "flex",
  gap: 6,
  height: 140,
  alignItems: "flex-end"
}

const counter = {
  fontSize: 28,
  marginBottom: 10,
  color: "#22d3ee"
}

const tilt = {
  transition: "transform 0.2s ease"
}
