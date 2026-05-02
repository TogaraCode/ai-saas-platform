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
      <div style={gridBg}></div>

      <div style={content}>

        {/* HEADER */}
        <div style={header}>

          {/* LOGO */}
          <div style={logo}>
            <span style={logoMain}>NEXUS</span>
            <span style={logoSub}>CORE</span>
          </div>

          {/* SEARCH */}
          {!isMobile && (
            <div style={searchWrap}>
              <input placeholder="Search ideas..." style={search} />
            </div>
          )}

          {/* RIGHT ICONS (ALWAYS RIGHT) */}
          <div style={rightIcons}>
            <NeonButton icon="⚡" />
            <NeonButton icon="👤" />
          </div>

        </div>

        {/* HERO */}
        <div style={hero}>

          <h1 style={title}>
            <span style={gradient}>TURN IDEAS</span><br />
            <span style={gradient}>INTO MONEY</span>
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

        {/* KPI DASHBOARD */}
        {result && (
          <div style={kpiGrid}>
            <KPI label="MRR" value={`€${result.mrr}`} />
            <KPI label="Growth" value={`${result.growth}%`} />
            <KPI label="Conversion" value={`${result.conversion}%`} />
            <KPI label="LTV/CAC" value={(result.ltv / result.cac).toFixed(1) + "x"} />
          </div>
        )}

      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes glow {
          0% { box-shadow: 0 0 10px #22d3ee }
          50% { box-shadow: 0 0 30px #a855f7 }
          100% { box-shadow: 0 0 10px #22d3ee }
        }

        @keyframes click {
          0% { transform: scale(1) }
          50% { transform: scale(0.9) }
          100% { transform: scale(1) }
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

function NeonButton({ icon }) {
  const [active, setActive] = useState(false)

  return (
    <div
      onClick={() => {
        setActive(true)
        setTimeout(() => setActive(false), 200)
      }}
      style={{
        ...iconBtn,
        ...(active ? { animation: "click 0.2s" } : {})
      }}
    >
      {icon}
    </div>
  )
}

function KPI({ label, value }) {
  return (
    <div style={kpi}>
      <div style={kpiValue}>{value}</div>
      <div style={kpiLabel}>{label}</div>
    </div>
  )
}

/* ================= STYLES ================= */

const root = {
  minHeight: "100vh",
  fontFamily: "system-ui",
  color: "white"
}

const bg = {
  position: "fixed",
  inset: 0,
  background: `
    radial-gradient(circle at 20% 20%, rgba(168,85,247,0.3), transparent),
    radial-gradient(circle at 80% 40%, rgba(34,211,238,0.3), transparent),
    #020617`
}

const gridBg = {
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
  padding: 16,
  position: "relative",
  zIndex: 1
}

/* HEADER */
const header = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 20,
  position: "relative",
  padding: "12px 16px",
  borderRadius: 16,
  backdropFilter: "blur(20px)",
  background: "rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.1)"
}

const logo = {
  display: "flex",
  gap: 6,
  fontWeight: "bold"
}

const logoMain = {
  color: "#22d3ee",
  fontWeight: 900
}

const logoSub = {
  color: "#a855f7"
}

const searchWrap = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  padding: "0 10px"
}

const search = {
  width: "100%",
  maxWidth: 400,
  padding: 10,
  borderRadius: 12,
  background: "rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white"
}

/* RIGHT ICONS FIX */
const rightIcons = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  gap: 10
}

const iconBtn = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#22d3ee,#a855f7,#ec4899)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 0 15px #22d3ee",
  fontSize: 18
}

/* HERO */
const hero = {
  padding: 24,
  borderRadius: 20,
  background: "rgba(0,0,0,0.6)",
  border: "1px solid rgba(168,85,247,0.3)",
  marginBottom: 20
}

const title = {
  fontSize: 32,
  fontWeight: 900,
  lineHeight: 1.1
}

const gradient = {
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}

const subtitle = {
  opacity: 0.7,
  marginBottom: 12
}

const input = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.4)",
  color: "white",
  marginBottom: 12
}

const cta = {
  width: "100%",
  padding: 16,
  borderRadius: 16,
  border: "none",
  fontWeight: "bold",
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  color: "white",
  animation: "glow 2s infinite"
}

const scan = {
  height: 4,
  marginTop: 10,
  background: "linear-gradient(90deg,#22d3ee,#a855f7)",
  animation: "scan 1s infinite"
}

/* KPI */
const kpiGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
  gap: 12
}

const kpi = {
  padding: 16,
  borderRadius: 14,
  background: "rgba(0,0,0,0.6)",
  border: "1px solid rgba(168,85,247,0.3)",
  textAlign: "center"
}

const kpiValue = {
  fontSize: 20,
  fontWeight: "bold",
  color: "#22d3ee"
}

const kpiLabel = {
  fontSize: 12,
  opacity: 0.6
}
