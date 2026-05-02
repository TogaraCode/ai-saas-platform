"use client"
import { useState } from "react"

export default function Home() {
  const [showAuth, setShowAuth] = useState(false)

  return (
    <div style={root}>

      {/* 🌌 BACKGROUND LAYER SYSTEM */}
      <div style={bg} />
      <div style={bgGlow} />

      {/* 🔥 HEADER */}
      <header style={header}>
        <div style={logo}>TOGARA.AI</div>

        <input placeholder="Search ideas..." style={search} />

        <div style={navRight}>
          <GlowBtn>⚡</GlowBtn>
          <GlowBtn onClick={() => setShowAuth(true)}>👤</GlowBtn>
        </div>
      </header>

      {/* 🚀 HERO */}
      <section style={hero}>
        <h1 style={title}>TURN IDEAS INTO MONEY</h1>

        <p style={subtitle}>
          AI-powered SaaS validation engine
        </p>

        <input placeholder="Describe your startup idea..." style={input} />

        <button style={cta}>⚡ ANALYZE</button>
      </section>

      {/* 📊 SYSTEM PANELS */}
      <section style={grid}>
        <Panel title="MARKET">
          <Bars />
        </Panel>

        <Panel title="ENGINE">
          <Circle />
        </Panel>

        <Panel title="FUNNEL">
          <Funnel />
        </Panel>

        <Panel title="TECH">
          <Tags />
        </Panel>
      </section>

      {/* 🔐 AUTH */}
      {showAuth && (
        <div style={modalOverlay} onClick={() => setShowAuth(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalTitle}>Access System</h2>

            <input placeholder="Email" style={input} />
            <input placeholder="Password" type="password" style={input} />

            <button style={cta}>Login</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ================= ROOT ================= */

const root = {
  minHeight: "100vh",
  color: "white",
  fontFamily: "Inter, system-ui",
  position: "relative",
  overflow: "hidden"
}

/* ================= BACKGROUND ================= */

const bg = {
  position: "fixed",
  inset: 0,
  background: "#020617",
  zIndex: 0
}

const bgGlow = {
  position: "fixed",
  inset: 0,
  background: `
    radial-gradient(circle at 20% 30%, rgba(168,85,247,0.25), transparent),
    radial-gradient(circle at 80% 50%, rgba(34,211,238,0.25), transparent)
  `,
  filter: "blur(80px)",
  zIndex: 0
}

/* ================= HEADER ================= */

const header = {
  position: "relative",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  padding: 16,
  gap: 10,
  backdropFilter: "blur(16px)",
  borderBottom: "1px solid rgba(255,255,255,0.08)"
}

const logo = {
  fontWeight: "bold",
  fontSize: 18,
  letterSpacing: 1.2,
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}

const search = {
  flex: 1,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(0,0,0,0.5)",
  color: "white"
}

const navRight = {
  display: "flex",
  gap: 10
}

/* ================= HERO ================= */

const hero = {
  position: "relative",
  zIndex: 2,
  margin: 16,
  padding: 24,
  borderRadius: 24,
  background: "rgba(10,10,20,0.6)",
  border: "1px solid rgba(168,85,247,0.4)",
  boxShadow
