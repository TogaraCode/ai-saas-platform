"use client"

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
        marginBottom: 20
      }}>
        <h1 style={{
          fontSize: 18,
          letterSpacing: 2,
          color: "#22d3ee"
        }}>
          TOGARA TECH
        </h1>

        <div style={{
          fontSize: 12,
          color: "#94a3b8"
        }}>
          AI SaaS IDEA ENGINE
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{
        display: "grid",
        gap: 16
      }}>

        {/* HERO METRICS */}
        <Panel>
          <h2 style={{
            fontSize: 20,
            background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}>
            $1.3 TRILLION MARKET
          </h2>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
            fontSize: 12
          }}>
            <Stat label="Growth" value="18.7%" />
            <Stat label="Market" value="$307B" />
            <Stat label="AI Size" value="$3.6T" />
          </div>
        </Panel>

        {/* FLYWHEEL */}
        <Panel title="AI FLYWHEEL">
          <CircleDiagram />
        </Panel>

        {/* COMPARISON */}
        <Panel title="WHY THIS WINS">
          <Checklist />
        </Panel>

        {/* REVENUE */}
        <Panel title="REVENUE">
          <BarChart />
        </Panel>

        {/* TECH STACK */}
        <Panel title="STACK">
          <StackIcons />
        </Panel>

      </div>

    </div>
  )
}

/* PANEL */
function Panel({ title, children }) {
  return (
    <div style={{
      padding: 16,
      borderRadius: 20,
      background: "linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",
      border: "1px solid rgba(168,85,247,0.3)",
      boxShadow: "0 0 30px rgba(168,85,247,0.25)"
    }}>
      {title && (
        <div style={{
          fontSize: 12,
          marginBottom: 10,
          color: "#22d3ee"
        }}>
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

/* STAT */
function Stat({ label, value }) {
  return (
    <div>
      <div style={{ color: "#94a3b8" }}>{label}</div>
      <div style={{ color: "#22d3ee", fontWeight: "bold" }}>
        {value}
      </div>
    </div>
  )
}

/* BAR CHART */
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

/* CIRCLE DIAGRAM */
function CircleDiagram() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 140
    }}>
      <div style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        border: "2px solid #22d3ee",
        boxShadow: "0 0 20px #22d3ee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        AI
      </div>
    </div>
  )
}

/* CHECKLIST */
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

/* STACK ICONS */
function StackIcons() {
  const items = ["Next.js", "React", "AI", "Stripe"]

  return (
    <div style={{
      display: "flex",
      gap: 10,
      flexWrap: "wrap"
    }}>
      {items.map((i) => (
        <div key={i} style={{
          padding: 10,
          borderRadius: 10,
          background: "rgba(255,255,255,0.05)"
        }}>
          {i}
        </div>
      ))}
    </div>
  )
}
