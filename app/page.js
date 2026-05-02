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
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 20
      }}>
        <h1 style={{
          fontSize: 18,
          letterSpacing: 2,
          color: "#22d3ee"
        }}>
          TOGARA TECH
        </h1>

        <div style={{ color: "#94a3b8", fontSize: 12 }}>
          AI SaaS ENGINE
        </div>
      </div>

      {/* GRID */}
      <div style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"
      }}>

        {/* 1 */}
        <Panel title="$1.3 TRILLION MARKET">
          <RowStats />
        </Panel>

        {/* 2 */}
        <Panel title="AI FLYWHEEL">
          <CircleDiagram />
        </Panel>

        {/* 3 */}
        <Panel title="WHY WE WIN">
          <Checklist />
        </Panel>

        {/* 4 */}
        <Panel title="TRACTION">
          <BarChart />
        </Panel>

        {/* 5 */}
        <Panel title="UNIT ECONOMICS">
          <Metrics />
        </Panel>

        {/* 6 */}
        <Panel title="GROWTH FUNNEL">
          <Funnel />
        </Panel>

        {/* 7 */}
        <Panel title="DATA PIPELINE">
          <Pipeline />
        </Panel>

        {/* 8 */}
        <Panel title="TECH STACK">
          <Stack />
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

/* ROW STATS */
function RowStats() {
  const stats = [
    ["Growth", "18.7%"],
    ["Market", "$307B"],
    ["Startups", "10K+"],
    ["AI Size", "$3.6T"]
  ]

  return (
    <div style={{
      display: "grid",
      grid
