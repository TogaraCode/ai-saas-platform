"use client"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const beamRef = useRef(null)

  // pointer glow (laser feel)
  useEffect(() => {
    const move = (e) => {
      if (!beamRef.current) return
      beamRef.current.style.left = e.clientX + "px"
      beamRef.current.style.top = e.clientY + "px"
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <div style={{
      minHeight: "100vh",
      overflowX: "hidden",
      position: "relative",
      fontFamily: "system-ui",
      background: "#020617",
      color: "white"
    }}>

      {/* 🌌 BACKGROUND LAYER (multiverse glow) */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: `
          radial-gradient(circle at 20% 30%, #06b6d4, transparent 40%),
          radial-gradient(circle at 80% 70%, #a855f7, transparent 40%),
          radial-gradient(circle at 50% 50%, #0ea5e9, #020617)
        `,
        filter: "blur(40px)",
        opacity: 0.6
      }}/>

      {/* ⚡ POINTER LIGHT */}
      <div ref={beamRef} style={{
        position: "fixed",
        width: 200,
        height: 200,
        zIndex: 2,
        pointerEvents: "none",
        background: "radial-gradient(circle, rgba(34,211,238,0.25), transparent 70%)",
        transform: "translate(-50%, -50%)",
        mixBlendMode: "screen"
      }}/>

      {/* 🌀 IMAGE TICKER (FLOATING ABOVE BACKGROUND) */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1,
        overflow: "hidden",
        pointerEvents: "none"
      }}>
        <div style={{
          display: "flex",
          gap: 40,
          padding: 10,
          animation: "ticker 25s linear infinite"
        }}>
          {[
            "neon cyberpunk network",
            "ai hologram interface",
            "futuristic data visualization",
            "3d glowing grid universe",
            "digital neural network glowing"
          ].map((q, i) => (
            <img
              key={i}
              src={`https://source.unsplash.com/300x200/?${q}`}
              style={{
                width: 120,
                height: 80,
                objectFit: "cover",
                borderRadius: 12,
                opacity: 0.7,
                transform: "perspective(500px) rotateY(10deg)",
                boxShadow: "0 0 20px #22d3ee"
              }}
            />
          ))}
        </div>
      </div>

      {/* MAIN UI */}
      <div style={{
        position: "relative",
        zIndex: 3,
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh"
      }}>

        <div style={{
          maxWidth: 520,
          width: "100%",
          textAlign: "center"
        }}>

          <h1 style={{
            fontSize: 42,
            fontWeight: 800,
            textShadow: "0 0 25px #22d3ee"
          }}>
            AI SaaS Validator
          </h1>

          <p style={{
            color: "#94a3b8",
            marginBottom: 20
          }}>
            Built for the next generation of founders
          </p>

          {/* INPUT CARD */}
          <div style={{
            padding: 20,
            borderRadius: 20,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 0 40px rgba(34,211,238,0.25)"
          }}>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Your next billion € idea..."
              rows={3}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 12,
                background: "#020617",
                border: "1px solid #334155",
                color: "white"
              }}
            />

            <button style={{
              marginTop: 15,
              width: "100%",
              padding: 14,
              borderRadius: 12,
              background: "linear-gradient(90deg,#22c55e,#06b6d4,#a855f7)",
              fontWeight: "bold",
              color: "black",
              boxShadow: "0 0 20px #22d3ee"
            }}>
              Analyze Idea
            </button>
          </div>

        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

    </div>
  )
}
