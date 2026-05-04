"use client"
import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function analyze() {
    if (!idea) return
    setLoading(true)

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea })
    })

    const data = await res.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div style={root}>

      {/* 🌌 ANIMATED BACKGROUND */}
      <div style={bg}></div>

      <div style={container}>

        {/* HEADER */}
        <div style={header}>
          <div style={logo}>NEXUS</div>
          <input placeholder="Search..." style={search}/>
          <div style={icons}>
            <div style={icon}>⚡</div>
            <div style={icon}>👤</div>
          </div>
        </div>

        {/* HERO */}
        <div style={hero}>
          <h1 style={title}>AI MARKET INTELLIGENCE</h1>

          <input
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your startup idea..."
            style={input}
          />

          <button style={cta} onClick={analyze}>
            ⚡ ANALYZE
          </button>

          {loading && <div style={scan}></div>}
        </div>

        {/* RESULTS */}
        {result && (
          <div style={grid}>

            <Card title="CORE SCORE">
              <ScoreRing value={result.score}/>
            </Card>

            <Card title="TREND">
              <LineChart data={result.trend}/>
            </Card>

            <Card title="SENTIMENT">
              <BigStat value={result.sentiment}/>
            </Card>

            <Card title="DEMAND">
              <BigStat value={result.demand}/>
            </Card>

            <Card title="COMPETITION">
              <Tags items={result.competitors}/>
            </Card>

            <Card title="RISKS">
              {result.risks.map((r,i)=>(
                <div key={i} style={risk}>⚠ {r}</div>
              ))}
            </Card>

            <Card title="INSIGHT">
              <div style={summary}>{result.summary}</div>
            </Card>

          </div>
        )}

      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        @keyframes glow {
          0% { opacity: 0.4; }
          50% { opacity: 0.8; }
          100% { opacity: 0.4; }
        }

        @keyframes draw {
          from { stroke-dashoffset: 300; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

    </div>
  )
}

/* ================= COMPONENTS ================= */

function Card({ title, children }) {
  return (
    <div style={card}>
      <div style={cardTitle}>{title}</div>
      {children}
    </div>
  )
}

function ScoreRing({ value }) {
  const r = 55
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c

  return (
    <svg width="140" height="140">
      <circle cx="70" cy="70" r={r} stroke="#222" strokeWidth="6" fill="none"/>
      <circle
        cx="70" cy="70"
        r={r}
        stroke="#22d3ee"
        strokeWidth="6"
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={offset}
        style={{
          transform: "rotate(-90deg)",
          transformOrigin: "50% 50%",
          transition: "stroke-dashoffset 1s ease"
        }}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".3em"
        style={{ fontSize: 24, fill: "white" }}>
        {value}
      </text>
    </svg>
  )
}

function LineChart({ data }) {
  if (!data) return null

  const max = Math.max(...data)
  const points = data.map((v,i)=>`${i*40},${120-(v/max)*120}`).join(" ")

  return (
    <svg viewBox="0 0 300 120" style={{ width:"100%" }}>
      <polyline
        points={points}
        fill="none"
        stroke="#22d3ee"
        strokeWidth="3"
        style={{
          strokeDasharray: 300,
          strokeDashoffset: 0,
          animation: "draw 1.2s ease"
        }}
      />
    </svg>
  )
}

function BigStat({ value }) {
  return (
    <div style={big}>
      {value}
    </div>
  )
}

function Tags({ items }) {
  return (
    <div style={tags}>
      {items.map(i => <div key={i} style={tag}>{i}</div>)}
    </div>
  )
}

/* ================= STYLES ================= */

const root = {
  minHeight: "100vh",
  background: "#020617",
  color: "white",
  fontFamily: "system-ui"
}

const bg = {
  position: "fixed",
  inset: 0,
  background: `
    radial-gradient(circle at 20% 20%, rgba(168,85,247,0.3), transparent),
    radial-gradient(circle at 80% 40%, rgba(34,211,238,0.3), transparent)
  `,
  animation: "glow 6s infinite"
}

const container = { padding: 16, position:"relative" }

const header = { display:"flex", gap:10, marginBottom:20 }

const logo = { color:"#22d3ee", fontWeight:"bold" }

const search = {
  flex:1,
  padding:10,
  borderRadius:10,
  background:"#111827",
  border:"1px solid #1f2937",
  color:"white"
}

const icons = { display:"flex", gap:6 }

const icon = {
  width:40,
  height:40,
  borderRadius:"50%",
  background:"linear-gradient(#22d3ee,#a855f7)",
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
}

const hero = {
  padding:20,
  borderRadius:20,
  background:"rgba(17,24,39,0.6)",
  backdropFilter:"blur(10px)",
  marginBottom:20
}

const title = { fontSize:24 }

const input = {
  width:"100%",
  padding:12,
  borderRadius:10,
  marginTop:10,
  background:"#020617",
  border:"1px solid #1f2937",
  color:"white"
}

const cta = {
  marginTop:10,
  width:"100%",
  padding:14,
  borderRadius:14,
  background:"linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
  border:"none",
  cursor:"pointer",
  transition:"0.2s"
}

const scan = {
  height:4,
  marginTop:10,
  background:"#22d3ee",
  animation:"scan 1s infinite"
}

const grid = {
  display:"grid",
  gap:14,
  gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))"
}

const card = {
  padding:16,
  borderRadius:16,
  background:"rgba(17,24,39,0.6)",
  backdropFilter:"blur(10px)",
  border:"1px solid rgba(255,255,255,0.1)",
  transition:"0.3s",
  cursor:"pointer"
}

card[":hover"] = {
  transform:"translateY(-4px)"
}

const cardTitle = { marginBottom:10, color:"#22d3ee" }

const tags = { display:"flex", gap:6, flexWrap:"wrap" }

const tag = {
  padding:"6px 10px",
  borderRadius:10,
  background:"#020617",
  border:"1px solid #1f2937"
}

const risk = { color:"#f87171", fontSize:12 }

const summary = { opacity:0.8 }

const big = { fontSize:28, fontWeight:"bold" }
