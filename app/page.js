"use client"
import { useState } from "react"

export default function Home() {
  const [active, setActive] = useState("dashboard")

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      color: "white",
      fontFamily: "system-ui",
      padding: 16
    }}>

      {/* HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
      }}>
        <Logo />

        <div style={{ fontSize: 11, color: "#94a3b8" }}>
          AUTONOMOUS SAAS ENGINE
        </div>
      </div>

      {/* NAV IMAGE BUTTONS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
        gap: 12,
        marginBottom: 20
      }}>
        <NavCard
          img="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600"
          label="Dashboard"
          onClick={() => setActive("dashboard")}
        />
        <NavCard
          img="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=600"
          label="AI Engine"
          onClick={() => setActive("ai")}
        />
        <NavCard
          img="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=600"
          label="Analytics"
          onClick={() => setActive("analytics")}
        />
        <NavCard
          img="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600"
          label="Growth"
          onClick={() => setActive("growth")}
        />
      </div>

      {/* CONTENT SWITCH */}
      {active === "dashboard" && <Dashboard />}
      {active === "ai" && <AIEngine />}
      {active === "analytics" && <Analytics />}
      {active === "growth" && <Growth />}

    </div>
  )
}




/* ================= NAV IMAGE BUTTON ================= */

function NavCard({ img, label, onClick }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 0 25px rgba(168,85,247,0.4)"
      }}
    >
      <img src={img} style={{ width: "100%", height: 120, objectFit: "cover" }} />

      {/* OVERLAY */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: hover
          ? "rgba(0,0,0,0.7)"
          : "rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.3s"
      }}>
        {hover && (
          <span style={{
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: 1,
            color: "#22d3ee"
          }}>
            {label}
          </span>
        )}
      </div>
    </div>
  )
}




/* ================= SECTIONS ================= */

function Dashboard() {
  return (
    <Section title="SYSTEM OVERVIEW">
      <Metrics />
      <BarChart />
    </Section>
  )
}

function AIEngine() {
  return (
    <Section title="AI ENGINE">
      <p style={{ color: "#94a3b8" }}>
        Generates, validates and scores SaaS ideas autonomously.
      </p>
      <Circle />
    </Section>
  )
}

function Analytics() {
  return (
    <Section title="ANALYTICS">
      <Metrics />
    </Section>
  )
}

function Growth() {
  return (
    <Section title="GROWTH SYSTEM">
      <Funnel />
    </Section>
  )
}




/* ================= SECTION WRAPPER ================= */

function Section({ title, children }) {
  return (
    <div style={{
      padding: 16,
      borderRadius: 20,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(168,85,247,0.3)",
      boxShadow: "0 0 30px rgba(168,85,247,0.25)"
    }}>
      <h3 style={{ color: "#22d3ee", marginBottom: 10 }}>{title}</h3>
      <div style={{ display: "grid", gap: 16 }}>
        {children}
      </div>
    </div>
  )
}




/* ================= COMPONENTS ================= */

function Logo() {
  return (
    <div style={{
      fontWeight: "bold",
      fontSize: 18,
      background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
      WebkitBackgroundClip: "text",
      color: "transparent"
    }}>
      TOGARA
    </div>
  )
}

function Metrics() {
  const data = [
    ["Idea Score", "82"],
    ["Demand", "78"],
    ["Monetization", "74"],
    ["Market", "€2.4B"]
  ]

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: 10
    }}>
      {data.map(([l, v]) => (
        <div key={l} style={{
          padding: 10,
          borderRadius: 12,
          background: "rgba(255,255,255,0.05)"
        }}>
          <div style={{ fontSize: 11, color: "#94a3b8" }}>{l}</div>
          <div style={{ color: "#22d3ee", fontWeight: "bold" }}>{v}</div>
        </div>
      ))}
    </div>
  )
}

function BarChart() {
  const data = [20, 40, 60, 90, 120]

  return (
    <div style={{
      display: "flex",
      alignItems: "flex-end",
      height: 120,
      gap: 6
    }}>
      {data.map((d, i) => (
        <div key={i} style={{
          flex: 1,
          height: d,
          background: "linear-gradient(#22d3ee,#a855f7)",
          borderRadius: 4,
          boxShadow: "0 0 10px #22d3ee"
        }} />
      ))}
    </div>
  )
}

function Funnel() {
  const steps = [
    ["Awareness", "100%"],
    ["Signup", "12%"],
    ["Activated", "62%"],
    ["Paid", "4.9%"]
  ]

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {steps.map(([l, v]) => (
        <div key={l} style={{
          padding: 8,
          borderRadius: 8,
          background: "rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between"
        }}>
          {l}
          <span style={{ color: "#22d3ee" }}>{v}</span>
        </div>
      ))}
    </div>
  )
}

function Circle() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: 20
    }}>
      <div style={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        border: "2px solid #22d3ee",
        boxShadow: "0 0 30px #22d3ee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        AI
      </div>
    </div>
  )
}
