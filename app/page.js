"use client"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const beamRef = useRef(null)

  async function analyze() {
    setLoading(true)
    setShowResult(false)

    setTimeout(() => {
      setLoading(false)
      setShowResult(true)
    }, 1200)
  }

  // pointer glow
  useEffect(() => {
    const move = (e) => {
      if (!beamRef.current) return
      beamRef.current.style.left = e.clientX + "px"
      beamRef.current.style.top = e.clientY + "px"
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  // scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal")
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible")
        }
      })
    }, { threshold: 0.2 })

    els.forEach(el => obs.observe(el))
  }, [])

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 30% 30%, #0ea5e9, #020617)",
      color: "white",
      fontFamily: "system-ui",
      overflowX: "hidden"
    }}>

      {/* pointer glow */}
      <div ref={beamRef} style={{
        position: "fixed",
        width: 200,
        height: 200,
        pointerEvents: "none",
        background: "radial-gradient(circle, rgba(34,211,238,0.25), transparent 70%)",
        transform: "translate(-50%, -50%)",
        mixBlendMode: "screen",
        zIndex: 1
      }}/>

      {/* HERO */}
      <section style={{ padding: 40, textAlign: "center" }}>
        <h1 style={{
          fontSize: 42,
          fontWeight: 800,
          textShadow: "0 0 20px #22d3ee"
        }}>
          AI SaaS Validator
        </h1>

        <p style={{ color: "#94a3b8" }}>
          Data-driven validation powered by AI
        </p>

        {/* input */}
        <div style={{
          marginTop: 30,
          maxWidth: 500,
          marginInline: "auto",
          padding: 20,
          borderRadius: 20,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 40px rgba(34,211,238,0.2)"
        }}>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your SaaS idea..."
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

          <button onClick={analyze} style={{
            marginTop: 15,
            width: "100%",
            padding: 14,
            borderRadius: 12,
            background: "linear-gradient(90deg,#22c55e,#06b6d4,#a855f7)",
            fontWeight: "bold",
            color: "black"
          }}>
            {loading ? "Analyzing..." : "Analyze Idea"}
          </button>
        </div>

        {showResult && (
          <div style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 16,
            background: "rgba(255,255,255,0.05)",
            transform: "perspective(800px) rotateX(4deg)"
          }}>
            ⭐ Score: 7.8 / 10
            <p>Strong SaaS opportunity with scalable revenue.</p>
          </div>
        )}
      </section>

      {/* DATA CARDS */}
      <section style={{
        padding: 40,
        display: "grid",
        gap: 20
      }}>
        {[
          "$307B SaaS Market",
          "$3.6T AI Economy",
          "18.7% CAGR Growth"
        ].map((item, i) => (
          <div key={i} className="reveal card">
            {item}
          </div>
        ))}
      </section>

      {/* CHART */}
      <section style={{
        padding: 40,
        textAlign: "center"
      }}>
        <h2>Revenue Growth Projection</h2>

        <svg width="100%" height="200">
          <polyline
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3"
            points="0,150 80,130 160,110 240,80 320,50"
          />
        </svg>
      </section>

      {/* STYLES */}
      <style jsx>{`
        .card {
          padding: 20px;
          border-radius: 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          opacity: 0;
          transform: translateY(40px);
          transition: 0.6s;
        }

        .visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

    </div>
  )
}
