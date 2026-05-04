"use client"
import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [result, setResult] = useState(null)

  const analyze = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea })
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div style={{ padding: 20 }}>

      <h1>NEXUS CORE</h1>

      <input
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Your idea..."
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 10,
          background: "#020617",
          border: "1px solid #1f2937",
          color: "white"
        }}
      />

      <button onClick={analyze} style={{ marginTop: 10 }}>
        Analyze
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Score: {result.score}</h2>
          <div>Demand: {result.demand}</div>
          <div>Sentiment: {result.sentiment}</div>

          <svg viewBox="0 0 300 120" style={{ width: "100%" }}>
            <polyline
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2"
              points={result.trend.map((v, i) => `${i * 40},${120 - v}`).join(" ")}
            />
          </svg>

          <div>
            {result.competitors.map(c => (
              <div key={c}>{c}</div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
