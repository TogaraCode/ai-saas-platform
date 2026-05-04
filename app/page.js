"use client"
import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function analyze() {
    if (!idea) return

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea })
      })

      const data = await res.json()
      setResult(data)

    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  return (
    <div style={root}>
      <div style={container}>

        <h1 style={title}>AI MARKET INTELLIGENCE</h1>

        <input
          placeholder="Describe your startup idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          style={input}
        />

        <button onClick={analyze} style={button}>
          {loading ? "Analyzing..." : "⚡ ANALYZE"}
        </button>

        {/* 🔥 RESULT SECTION */}
        {result && (
          <div style={results}>
            <Card title="CORE SCORE">{result.score}</Card>
            <Card title="DEMAND">{result.demand}</Card>
            <Card title="SENTIMENT">{result.sentiment}</Card>
            <Card title="MONETIZATION">{result.monetization}</Card>

            <Card title="SUMMARY">{result.summary}</Card>

            <Card title="COMPETITORS">
              {result.competitors?.join(", ")}
            </Card>

            <Card title="RISKS">
              {result.risks?.join(", ")}
            </Card>
          </div>
        )}

      </div>
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div style={card}>
      <div style={cardTitle}>{title}</div>
      <div>{children}</div>
    </div>
  )
}

/* STYLES */
const root = {
  minHeight: "100vh",
  background: "#020617",
  color: "white",
  padding: 20
}

const container = { maxWidth: 900, margin: "0 auto" }

const title = { marginBottom: 20 }

const input = {
  width: "100%",
  padding: 14,
  marginBottom: 12,
  borderRadius: 12
}

const button = {
  width: "100%",
  padding: 14,
  borderRadius: 14,
  background: "linear-gradient(90deg,#22d3ee,#a855f7)",
  border: "none",
  marginBottom: 20
}

const results = {
  display: "grid",
  gap: 12
}

const card = {
  padding: 16,
  borderRadius: 12,
  background: "#0f172a"
}

const cardTitle = {
  color: "#22d3ee",
  marginBottom: 6
}
