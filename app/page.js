"use client"
import { useEffect, useState } from "react"

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      color: "white",
      fontFamily: "'Orbitron', system-ui",
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

        <div style={{
          fontSize: 11,
          color: "#94a3b8",
          letterSpacing: 1
        }}>
          AI AUTONOMOUS SAAS ENGINE
        </div>
      </div>

      {/* HERO IMAGE */}
      <div style={{
        marginBottom: 20,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 0 40px rgba(168,85,247,0.4)"
      }}>
        <img
          src="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1400&auto=format&fit=crop"
          style={{ width: "100%" }}
        />
      </div>

      {/* HERO TEXT */}
      <div style={{ marginBottom: 20 }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 800,
          background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          Turn Ideas Into Autonomous SaaS
        </h2>

        <p style={{ color: "#94a3b8" }}>
          The first AI system that validates, builds and scales SaaS ideas automatically.
        </p>
      </div>

      {/* GRID */}
      <div style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))"
      }}>

        <Panel title="$1.3 TRILLION OPPORTUNITY">
          <RowStats />
        </Panel>

        <Panel title="AI FLYWHEEL">
          <CircleDiagram />
        </Panel>

        <Panel title="WHY THIS WINS">
          <Checklist />
        </Panel>

        <Panel title="TRACTION">
          <BarChart />
        </Panel>

        <Panel title="UNIT ECONOMICS">
          <Metrics />
        </Panel>

        <Panel title="GROWTH FUNNEL">
          <Funnel />
        </Panel>

        <Panel title="DATA PIPELINE">
          <Pipeline />
        </Panel>

        <Panel title="TECH STACK">
          <Stack />
        </Panel>

      </div>

    </div>
  )
}






/* ================= COMPONENTS ================= */

function Logo() {
  return (
    <svg width="160" height="40" viewBox="0 0 300 80">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <text
        x="0"
        y="50"
        fontSize="42"
        fontWeight="800"
        fill="url(#grad)"
        filter="url(#glow)"
        style={{ letterSpacing: "4px" }}
      >
        TOGARA
      </text>
    </svg>
  )
}

function Panel({ title, children }) {
  return (
    <div style={{
      padding: 16,
      borderRadius: 20,
      background: "linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",
      border: "1px solid rgba(168,85,247,0.3)",
      boxShadow: "0 0 30px rgba(168,85,247,0.25)"
    }}>
      <div style={{
        fontSize: 12,
        marginBottom: 10,
        color: "#22d3ee"
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function RowStats() {
  const stats = [
    ["Growth", "18.7"],
    ["Market", "307"],
    ["Startups", "10000"],
    ["AI Size", "3600"]
  ]

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: 8
    }}>
      {stats.map(([l, v]) => (
        <Stat key={l} label={l} value={v} />
      ))}
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div style={{
      padding: 10,
      borderRadius: 10,
      background: "rgba(255,255,255,0.05)"
    }}>
      <div style={{ fontSize: 10, color: "#94a3b8" }}>{label}</div>
      <div style={{ color: "#22d3ee", fontWeight: "bold" }}>
        <AnimatedNumber value={value} />
      </div>
    </div>
  )
}

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseInt(value)
    const duration = 600

    const step = Math.ceil(end / (duration / 16))

    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        start = end
        clearInterval(timer)
      }
      setDisplay(start)
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return <span>{display}</span>
}

function BarChart() {
  const data = [30, 60, 80, 120, 160]

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

function CircleDiagram() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 140
    }}>
      <div style={{
        width: 110,
        height: 110,
        borderRadius: "50%",
        border: "2px solid #22d3ee",
        boxShadow: "0 0 25px #22d3ee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        AI
      </div>
    </div>
  )
}

function Checklist() {
  const items = [
    "AI Idea Discovery",
    "Real-time Validation",
    "Auto Build",
    "Growth Engine"
  ]

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {items.map((i) => (
        <div key={i} style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <span>{i}</span>
          <span style={{ color: "#22c55e" }}>✔</span>
        </div>
      ))}
    </div>
  )
}

function Metrics() {
  const m = [
    ["LTV/CAC", "8"],
    ["ARPU", "23"],
    ["Margin", "82"],
    ["Payback", "1"]
  ]

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: 8
    }}>
      {m.map(([l, v]) => (
        <Stat key={l} label={l} value={v} />
      ))}
    </div>
  )
}

function Funnel() {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      {[
        ["Awareness", "100%"],
        ["Signup", "12%"],
        ["Activated", "62%"],
        ["Paid", "4.9%"]
      ].map(([l, v]) => (
        <div key={l} style={{
          padding: 6,
          borderRadius: 6,
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

function Pipeline() {
  const steps = ["Collect", "Clean", "Extract", "Embed", "Score", "Generate"]

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }}>
      {steps.map(s => (
        <div key={s} style={{
          padding: "6px 10px",
          borderRadius: 10,
          background: "rgba(255,255,255,0.05)"
        }}>
          {s}
        </div>
      ))}
    </div>
  )
}

function Stack() {
  const items = ["Next.js", "React", "AI", "Stripe", "Supabase"]

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }}>
      {items.map(i => (
        <div key={i} style={{
          padding: 8,
          borderRadius: 10,
          background: "rgba(255,255,255,0.05)"
        }}>
          {i}
        </div>
      ))}
    </div>
  )
}
