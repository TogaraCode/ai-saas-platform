"use client"
import { useState } from "react"

export default function Dashboard() {
  const [data] = useState({
    mrr: 14890,
    growth: 24.6,
    users: 1284,
    conversion: 5.2,
    ltv: 612,
    cac: 70
  })

  return (
    <div style={rootStyle}>
      <div style={containerStyle}>

        <h2 style={headingStyle}>Dashboard</h2>

        {/* KPI */}
        <div style={kpiGridStyle}>
          <KPI label="MRR" value={`€${data.mrr}`} />
          <KPI label="Growth" value={`${data.growth}%`} />
          <KPI label="Users" value={data.users} />
          <KPI label="Conversion" value={`${data.conversion}%`} />
        </div>

        {/* GRID */}
        <div style={gridStyle}>
          <Card title="Revenue trend">
            <LineChart />
          </Card>

          <Card title="Unit economics">
            <div>LTV: €{data.ltv}</div>
            <div>CAC: €{data.cac}</div>
            <div style={ratioStyle}>
              {(data.ltv / data.cac).toFixed(1)}x ratio
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}

/* COMPONENTS */

function KPI({ label, value }) {
  return (
    <div style={kpiStyle}>
      <div style={kpiValueStyle}>{value}</div>
      <div style={kpiLabelStyle}>{label}</div>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div style={cardStyle}>
      <div style={cardTitleStyle}>{title}</div>
      {children}
    </div>
  )
}

function LineChart() {
  return (
    <svg viewBox="0 0 300 120" style={{ width: "100%" }}>
      <defs>
        <linearGradient id="grad">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <polyline
        fill="none"
        stroke="url(#grad)"
        strokeWidth="3"
        points="0,100 60,70 120,60 180,40 240,30 300,10"
      />
    </svg>
  )
}

/* STYLES */

const rootStyle = {
  minHeight: "100vh",
  background: "#0a0f1c",
  color: "white"
}

const containerStyle = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: 24
}

const headingStyle = {
  marginBottom: 20,
  fontSize: 28,
  background: "linear-gradient(90deg,#22d3ee,#6366f1,#ec4899)",
  WebkitBackgroundClip: "text",
  color: "transparent"
}

const kpiGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 12,
  marginBottom: 30
}

const kpiStyle = {
  background: "rgba(17,24,39,0.6)",
  padding: 16,
  borderRadius: 12,
  border: "1px solid rgba(99,102,241,0.3)"
}

const kpiValueStyle = {
  fontWeight: "bold",
  fontSize: 18
}

const kpiLabelStyle = {
  opacity: 0.6,
  fontSize: 12
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16
}

const cardStyle = {
  background: "rgba(17,24,39,0.6)",
  padding: 16,
  borderRadius: 12,
  border: "1px solid rgba(99,102,241,0.3)"
}

const cardTitleStyle = {
  marginBottom: 10,
  color: "#22d3ee"
}

const ratioStyle = {
  color: "#6366f1",
  fontWeight: "bold"
}
