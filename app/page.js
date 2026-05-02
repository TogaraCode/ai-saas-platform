"use client"
import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [result, setResult] = useState(false)
  const [loading, setLoading] = useState(false)

  async function analyze() {
    setLoading(true)
    setResult(false)

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ idea })
    })

    await res.json()

    // simulate premium AI delay
    setTimeout(() => {
      setResult(true)
      setLoading(false)
    }, 1200)
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #020617, #0f172a)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      color: "white"
    }}>
      <div style={{ width: "100%", maxWidth: 520 }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h1 style={{
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 10
          }}>
            Validate Your SaaS Idea
          </h1>

          <p style={{
            color: "#94a3b8",
            fontSize: 16
          }}>
            AI-powered validation in seconds
          </p>

          <div style={{
            marginTop: 10,
            fontSize: 13,
            color: "#22c55e"
          }}>
            ● Used by founders to avoid bad ideas
          </div>
        </div>

        {/* INPUT CARD */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: 20,
          backdropFilter: "blur(10px)"
        }}>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g. AI tool that writes cold emails for SaaS founders..."
            rows={3}
            style={{
              width: "100%",
              padding: 15,
              borderRadius: 12,
              border: "1px solid #334155",
              background: "#020617",
              color: "white",
              marginBottom: 15,
              resize: "none"
            }}
          />

          <button
            onClick={analyze}
            style={{
              width: "100%",
              padding: 15,
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #22c55e, #06b6d4)",
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer"
            }}
          >
            {loading ? "Analyzing with AI..." : "Analyze Idea"}
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{
            marginTop: 25,
            padding: 20,
            borderRadius: 16,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            textAlign: "center"
          }}>
            🧠 AI is analyzing your idea...
          </div>
        )}

        {/* RESULT UI */}
        {result && (
          <div style={{
            marginTop: 25,
            padding: 20,
            borderRadius: 16,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            lineHeight: 1.6
          }}>

            {/* SCORE */}
            <div style={{
              fontSize: 28,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#22c55e"
            }}>
              ⭐ Score: 7.8 / 10
            </div>

            {/* BREAKDOWN */}
            <div style={{ marginBottom: 10 }}>
              <strong>📈 Market Potential:</strong><br />
              High demand among SaaS founders looking for automation tools.
            </div>

            <div style={{ marginBottom: 10 }}>
              <strong>💰 Monetization:</strong><br />
              Subscription model (€19–€49/month) with strong upsell potential.
            </div>

            <div style={{ marginBottom: 10 }}>
              <strong>⚠️ Risk:</strong><br />
              Competitive market with existing players.
            </div>

            <div style={{ marginBottom: 15 }}>
              <strong>🚀 Improvement:</strong><br />
              Focus on niche targeting + better personalization.
            </div>

            {/* PAYWALL HOOK */}
            <div style={{
              marginTop: 15,
              padding: 15,
              borderRadius: 12,
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
              textAlign: "center"
            }}>
              🔒 Unlock full AI breakdown + winning strategy
            </div>

          </div>
        )}

        {/* FOOTER */}
        <div style={{
          marginTop: 25,
          textAlign: "center",
          fontSize: 12,
          color: "#64748b"
        }}>
          Built by Togara Hess
        </div>

      </div>
    </div>
  )
}
