"use client"
import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")

  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      color: "white",
      fontFamily: "system-ui"
    }}>

      {/* HERO */}
      <section style={{
        padding: 30,
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: 42,
          fontWeight: 900,
          background: "linear-gradient(90deg,#22d3ee,#a855f7,#ec4899)",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          Turn Ideas Into Money
        </h1>

        <p style={{ color: "#94a3b8", marginTop: 10 }}>
          AI tells you if your idea is worth building
        </p>

        {/* HERO IMAGE */}
        <img
          src="https://source.unsplash.com/800x500/?cyberpunk,teen,technology"
          style={{
            width: "100%",
            borderRadius: 20,
            marginTop: 20,
            boxShadow: "0 0 40px rgba(34,211,238,0.3)"
          }}
        />

        {/* INPUT */}
        <div style={{
          marginTop: 20,
          padding: 20,
          borderRadius: 20,
          background: "rgba(255,255,255,0.05)"
        }}>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your idea..."
            rows={3}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              background: "#020617",
              color: "white",
              border: "1px solid #334155"
            }}
          />

          <button style={{
            marginTop: 15,
            width: "100%",
            padding: 14,
            borderRadius: 12,
            background: "linear-gradient(120deg,#22d3ee,#a855f7,#ec4899)",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0 0 30px rgba(168,85,247,0.6)"
          }}>
            ⚡ Analyze Idea
          </button>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section style={{ padding: 30 }}>
        <h2>What you get</h2>

        <div style={{ display: "grid", gap: 15, marginTop: 15 }}>
          {[
            "📊 Probability score (will it work?)",
            "💰 Revenue potential estimate",
            "📈 Market demand signals",
            "⚠️ Risk detection"
          ].map((t, i) => (
            <div key={i} style={{
              padding: 15,
              borderRadius: 15,
              background: "rgba(255,255,255,0.05)"
            }}>
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* VISUAL DASHBOARD */}
      <section style={{ padding: 30 }}>
        <img
          src="https://source.unsplash.com/800x500/?futuristic,data,ai"
          style={{
            width: "100%",
            borderRadius: 20,
            boxShadow: "0 0 40px rgba(34,211,238,0.3)"
          }}
        />
      </section>

      {/* WHY DIFFERENT */}
      <section style={{ padding: 30 }}>
        <h2>Why this is different</h2>

        <div style={{ display: "grid", gap: 10, marginTop: 15 }}>
          <div>✔ AI + market signals</div>
          <div>✔ Built for fast decision making</div>
          <div>✔ No coding required</div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: 30 }}>
        <h2>Pricing</h2>

        <div style={{
          display: "grid",
          gap: 20,
          marginTop: 20
        }}>

          {/* FREE */}
          <div style={card()}>
            <h3>Free</h3>
            <p>Idea score + basic insights</p>
          </div>

          {/* PRO */}
          <div style={card()}>
            <h3>Pro</h3>
            <p>€50 + €10/mo</p>
            <p>Deep analysis + 2 AI suggestions</p>
          </div>

          {/* ELITE */}
          <div style={cardHighlight()}>
            <h3>Elite</h3>
            <p>€2000 + €100/mo</p>
            <p>Full idea + business plan + deployment</p>
          </div>

        </div>
      </section>

    </div>
  )
}

function card() {
  return {
    padding: 20,
    borderRadius: 20,
    background: "rgba(255,255,255,0.05)"
  }
}

function cardHighlight() {
  return {
    padding: 20,
    borderRadius: 20,
    background: "linear-gradient(120deg,#22d3ee,#a855f7)",
    color: "black",
    fontWeight: "bold"
  }
}
