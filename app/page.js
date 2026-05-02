"use client"
import { useState } from "react"

export default function Home() {
  const [showAuth, setShowAuth] = useState(false)

  return (
    <div style={{
      minHeight: "100vh",
      color: "white",
      fontFamily: "system-ui",
      position: "relative",
      overflow: "hidden"
    }}>

      {/* 🌌 BACKGROUND */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(168,85,247,0.2), transparent),
          radial-gradient(circle at 80% 40%, rgba(34,211,238,0.2), transparent),
          url("https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.3)",
        zIndex: 0
      }} />

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1, padding: 16 }}>

        {/* 🔥 HEADER */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20
        }}>

          {/* LOGO */}
          <div style={logo}>
            NEXA.AI
          </div>

          {/* SEARCH */}
          <input
            placeholder="Search ideas..."
            style={search}
          />

          {/* LOGIN BUTTON (IMAGE STYLE) */}
          <div onClick={() => setShowAuth(true)} style={loginBtn}>
            ⚡
          </div>
        </div>

        {/* 🚀 HERO */}
        <div style={card}>
          <h1 style={title}>
            Turn Ideas Into Money
          </h1>

          <p style={{ opacity: 0.7 }}>
            AI validates your startup before you build
          </p>

          <input placeholder="Describe your idea..." style={input} />

          <button style={cta}>
            ⚡ Analyze Idea
          </button>
        </div>

        {/* 🔥 GRID */}
        <div style={grid}>
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
        </div>

      </div>

      {/* 🔐 AUTH MODAL */}
      {showAuth && (
        <div style={modalOverlay} onClick={() => setShowAuth(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>

            <h2 style={modalTitle}>Access System</h2>

            <input placeholder="Email" style={input} />
            <input placeholder="Password" type="password" style={input} />

            <button style={cta}>Login</button>

            <div style={{ marginTop: 10, opacity: 0.6, fontSize: 12 }}>
              No account? Sign up
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

/* ================= STYLES ================= */

const logo = {
  fontWeight: "bold",
  fontSize: 18,
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

const loginBtn = {
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

const card = {
  padding: 20,
  borderRadius: 20,
  background: "rgba(0,0,0,0.6)",
  border: "1px solid rgba(168,85,247,0.4)",
  marginBottom: 20
}

const title = {
  fontSize: 28,
  fontWeight: "bold",
  background: "linear-gradient(90deg,#22d3ee,#a855f7)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}

const input = {
  width: "100%",
  marginTop: 10,
  padding: 12,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.4)",
  color: "white"
}

const cta = {
  marginTop: 12,
  width: "100%",
  padding: 14,
  borderRadius: 14,
  border: "none",
  fontWeight: "bold",
  background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  color: "white"
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
  gap: 12
}

const panel = {
  padding: 16,
  borderRadius: 16,
  background: "rgba(0,0,0,0.6)",
  border: "1px solid rgba(168,85,247,0.4)"
}

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
  width: 300,
  padding: 20,
  borderRadius: 20,
  background: "rgba(0,0,0,0.9)",
  border: "1px solid #a855f7",
  boxShadow: "0 0 30px rgba(168,85,247,0.5)"
}

const modalTitle = {
  textAlign: "center",
  marginBottom: 10,
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
