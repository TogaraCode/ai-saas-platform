"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [result, setResult] = useState(false)
  const [loading, setLoading] = useState(false)

  async function analyze() {
    setLoading(true)
    setResult(false)

    setTimeout(() => {
      setResult(true)
      setLoading(false)
    }, 1200)
  }

  // simple floating particles
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const arr = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2
    }))
    setParticles(arr)
  }, [])

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 30% 30%, #0ea5e9, #020617)",
      color: "white",
      overflow: "hidden",
      position: "relative"
    }}>

      {/* PARTICLES */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${p.left}%`,
          top: `${p.top}%`,
          width: p.size,
          height: p.size,
          background: "#22c55e",
          borderRadius: "50%",
          opacity: 0.2
        }} />
      ))}

      {/* MAIN */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        minHeight: "100vh"
      }}>

        <div style={{
          width: "100%",
          maxWidth: 520,
          textAlign: "center"
        }}>

          {/* HERO */}
          <h1 style={{
            fontSize: 38,
            fontWeight: 800,
            marginBottom: 10,
            textShadow: "0 0 20px rgba(34,197,94,0.5)"
          }}>
            Validate Your SaaS Idea
          </h1>

          <p style={{
            color: "#94a3b8",
            marginBottom: 20
          }}>
            AI-powered validation in seconds
          </p>

          {/* INPUT */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: 20,
            padding: 20,
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 40px rgba(0,0,0,0.5)"
          }}>

            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your SaaS idea..."
              rows={3}
              style={{
                width: "100%",
                padding: 15,
                borderRadius: 12,
                border: "none",
                background: "#020617",
                color: "white",
                marginBottom: 15
              }}
            />

            <button
              onClick={analyze}
              style={{
                width: "100%",
                padding: 15,
                borderRadius: 12,
                background: "linear-gradient(135deg,#22c55e,#06b6d4)",
                color: "black",
                fontWeight: "bold",
                fontSize: 16,
                boxShadow: "0 0 20px rgba(34,197,94,0.5)"
              }}
            >
              {loading ? "Analyzing..." : "Analyze Idea"}
            </button>
          </div>

          {/* LOADING */}
          {loading && (
            <div style={{
              marginTop: 20,
              padding: 20,
              borderRadius: 16,
              background: "rgba(255,255,255,0.05)"
            }}>
              🧠 AI is thinking...
            </div>
          )}

          {/* RESULT */}
          {result && (
            <div style={{
              marginTop: 20,
              padding: 20,
              borderRadius: 16,
              background: "rgba(255,255,255,0.05)",
              transform: "perspective(800px) rotateX(2deg)"
            }}>

              <div style={{
                fontSize: 26,
                fontWeight: "bold",
                color: "#22c55e"
              }}>
                ⭐ Score: 7.8 / 10
              </div>

              <p style={{ marginTop: 10 }}>
                High demand SaaS idea with strong monetization potential.
              </p>

              <div style={{
                marginTop: 15,
                padding: 10,
                borderRadius: 10,
                background: "rgba(34,197,94,0.1)"
              }}>
                🔒 Unlock full strategy
              </div>
            </div>
          )}

        </div>
      </div>

      {/* SCROLL SECTION */}
      <div style={{
        padding: 40,
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: 24 }}>Why this works</h2>

        <div style={{
          display: "grid",
          gap: 20,
          marginTop: 20
        }}>

          {["Market Analysis", "Monetization", "Risk Detection"].map((item, i) => (
            <div key={i} style={{
              padding: 20,
              borderRadius: 16,
              background: "rgba(255,255,255,0.05)",
              transform: "translateZ(20px)",
              transition: "0.3s"
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
