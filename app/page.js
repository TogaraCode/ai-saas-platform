"use client"
import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  async function analyze() {
    setLoading(true)

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ idea })
    })

    const data = await res.json()
    setResult(data.result)
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f172a",
      color: "white",
      padding: 20
    }}>
      <div style={{
        width: "100%",
        maxWidth: 500,
        textAlign: "center"
      }}>

        <h1 style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 10
        }}>
          AI SaaS Validator
        </h1>

        <p style={{
          color: "#94a3b8",
          marginBottom: 30
        }}>
          Validate your idea in seconds
        </p>

        <input
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Enter your SaaS idea..."
          style={{
            width: "100%",
            padding: 15,
            borderRadius: 10,
            border: "1px solid #334155",
            marginBottom: 15,
            background: "#020617",
            color: "white"
          }}
        />

        <button
          onClick={analyze}
          style={{
            width: "100%",
            padding: 15,
            borderRadius: 10,
            border: "none",
            background: "#06b6d4",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          {loading ? "Analyzing..." : "Analyze Idea"}
        </button>

        {result && (
          <div style={{
            marginTop: 30,
            padding: 20,
            borderRadius: 10,
            background: "#020617",
            border: "1px solid #334155",
            textAlign: "left",
            whiteSpace: "pre-wrap"
          }}>
            {result}
          </div>
        )}

      </div>
    </div>
  )
}
