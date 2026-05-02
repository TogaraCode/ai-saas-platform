"use client"
import { useState } from "react"

export default function Home() {
  const [showAuth, setShowAuth] = useState(false)

  return (
    <div style={root}>

      {/* 🌌 BACKGROUND */}
      <div style={bg} />

      {/* 🌐 HEADER */}
      <header style={header}>
        <div style={logo}>TOGARA.AI</div>

        <input placeholder="Search ideas..." style={search} />

        <div style={navRight}>
          <div style={iconBtn}>⚡</div>
          <div style={iconBtn} onClick={() => setShowAuth(true)}>👤</div>
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

      {/* 📊 DASHBOARD GRID */}
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

      {/* 🔐 AUTH MODAL */}
      {showAuth && (
        <div style={modalOverlay} onClick={() => setShowAuth(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalTitle}>Access System</h2>

            <input placeholder="Email" style={input} />
            <input placeholder="Password" type="password" style={input} />

            <button style={cta}>Login</button>

            <p style={{ marginTop: 10, opacity: 0.6 }}>
              No account? Sign up
            </p>
          </div>
        </div>
      )}

    </div>
  )
}

/* ================= CORE STYLES ================= */

const root = {
  minHeight: "100vh",
  color: "white",
  fontFamily: "system-ui",
  position: "relative",
  overflow: "hidden"
}

const bg = {
  position: "fixed",
  inset: 0,
  background: `
    radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25), transparent),
    radial-gradient(circle at 80% 40%, rgba(34,211,238,0.25), transparent),
    radial-gradient(circle at 50% 80%, rgba(236,72,153,0.15), transparent),
    linear-gradient(#020617, #020617)
  `,
  zIndex: 0
}

/* ================= HEADER ================= */

const header = {
  position: "relative",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 16,
  backdropFilter: "blur(12px)",
  borderBottom: "1px solid rgba(255,255,255,0.1)"
}

const logo = {
  fontWeight: "bold",
  fontSize: 18,
  letterSpacing: 1,
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}

const search = {
  flex: 1,
  margin: "0 10px",
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.4)",
  color: "white"
}

const navRight = {
  display: "flex",
  gap: 10
}

const iconBtn = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#22d3ee,#a855f7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 0 15px #22d3ee"
}

/* ================= HERO ================= */

const hero = {
  position: "relative",
  zIndex: 2,
  padding: 20,
  marginTop: 10,
  borderRadius: 20,
  margin: 16,
  background: "rgba(0,0,0,0.6)",
  border: "1px solid rgba(168,85,247,0.4)"
}

const title = {
  fontSize: 32,
  fontWeight: "bold",
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}

const subtitle = {
  opacity: 0.7,
  marginTop: 8
}

const input = {
  width: "100%",
  marginTop: 12,
  padding: 14,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.4)",
  color: "white"
}

const cta = {
  marginTop: 14,
  width: "100%",
  padding: 16,
  borderRadius: 16,
  border: "none",
  fontWeight: "bold",
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  color: "white",
  boxShadow: "0 0 25px rgba(168,85,247,0.6)",
  cursor: "pointer"
}

/* ================= GRID ================= */

const grid = {
  position: "relative",
  zIndex: 2,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: 14,
  padding: 16
}

const panel = {
  padding: 16,
  borderRadius: 16,
  background: "rgba(0,0,0,0.6)",
  border: "1px solid rgba(168,85,247,0.4)",
  backdropFilter: "blur(10px)"
}

/* ================= MODAL ================= */

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.8)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10
}

const modal = {
  width: 320,
  padding: 20,
  borderRadius: 20,
  background: "rgba(0,0,0,0.9)",
  border: "1px solid #a855f7",
  boxShadow: "0 0 30px rgba(168,85,247,0.5)"
}

const modalTitle = {
  textAlign: "center",
  marginBottom: 12,
  background: "linear-gradient(90deg,#22d3ee,#a855f7)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}

/* ================= COMPONENTS ================= */

function Panel({ title, children }) {
  return (
    <div style={panel}>
      <div style={{ color: "#22d3ee", marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  )
}

function Bars() {
  const data = [40, 70, 90, 120]
  return (
    <div style={{ display: "flex", gap: 6, height: 100 }}>
      {data.map((d, i) => (
        <div key={i} style={{
          flex: 1,
          height: d,
          background: "linear-gradient(#22d3ee,#a855f7)",
          borderRadius: 6
        }} />
      ))}
    </div>
  )
}

function Circle() {
  return (
    <div style={{
      width: 100,
      height: 100,
      borderRadius: "50%",
      border: "2px solid #22d3ee",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "auto"
    }}>
      AI
    </div>
  )
}

function Funnel() {
  const f = [["Awareness","100%"],["Signup","12%"],["Paid","4%"]]
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {f.map(([l,v]) => (
        <div key={l} style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 6,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 6
        }}>
          {l}
          <span style={{ color:"#22d3ee" }}>{v}</span>
        </div>
      ))}
    </div>
  )
}

function Tags() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {["Next.js","React","AI","Stripe"].map(x => (
        <div key={x} style={{
          padding: "4px 8px",
          borderRadius: 10,
          background: "rgba(255,255,255,0.1)"
        }}>
          {x}
        </div>
      ))}
    </div>
  )
}
