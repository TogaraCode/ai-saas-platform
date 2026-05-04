
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
    <div style={root}>
      <div style={container}>

        <h2 style={heading}>Dashboard</h2>

        {/* KPI */}
        <div style={kpiGrid}>
          <KPI label="MRR" value={`€${data.mrr}`} />
          <KPI label="Growth" value={`${data.growth}%`} />
          <KPI label="Users" value={data.users} />
          <KPI label="Conversion" value={`${data.conversion}%`} />
        </div>

        {/* GRID */}
        <div style={grid}>

          <Card title="Revenue trend">
            <LineChart />
          </Card>

          <Card title="Unit economics">
            <div>LTV: €{data.ltv}</div>
            <div>CAC: €{data.cac}</div>
            <div style={{ color: "#6366f1" }}>
              {(data.ltv / data.cac).toFixed(1)}x ratio
            </div>
          </Card>

        </div>

      </div>
    </div>
  )
}

function KPI({ label, value }) {
  return (
    <div style={kpi}>
      <div style={value}>{value}</div>
      <div style={labelStyle}>{label}</div>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div style={card}>
      <div style={cardTitle}>{title}</div>
      {children}
    </div>
  )
}

function LineChart() {
  return (
    <svg viewBox="0 0 300 120" style={{ width: "100%" }}>
      <polyline
        fill="none"
        stroke="#6366f1"
        strokeWidth="2"
        points="0,100 60,70 120,60 180,40 240,30 300,10"
      />
    </svg>
  )
}

/* STYLES */
const root = { minHeight: "100vh", background: "#0a0f1c", color: "white" }
const container = { maxWidth: 1100, margin: "0 auto", padding: 24 }

const heading = { marginBottom: 20 }

const kpiGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 12,
  marginBottom: 30
}

const kpi = { background: "#111827", padding: 16, borderRadius: 10 }
const valueStyle = { fontWeight: "bold" }
const labelStyle = { opacity: 0.6, fontSize: 12 }

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16
}

const card = { background: "#111827", padding: 16, borderRadius: 12 }
const cardTitle = { marginBottom: 10 }
