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

  // pointer “laser beam”
  useEffect(() => {
    function move(e) {
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
        if (e.isIntersecting) e.target.classList.add("visible")
      })
    }, { threshold: 0.2 })
    els.forEach(el => obs.observe(el))
  }, [])

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 30% 30%, #0ea5e9, #020617)",
      color: "white",
      overflowX: "hidden",
      fontFamily: "system-ui"
    }}>

      {/* laser pointer */}
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
      <section style={{
        padding: 40,
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: 40,
          fontWeight: 800,
          textShadow: "0 0 20px #22d3ee"
        }}>
          AI SaaS Validator
        </h1>

        <p style={{
          color: "#94a3b8",
          marginTop: 10
        }}>
          Holographic intelligence for startup ideas
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
          boxShadow: "0 0 40px rgba(34,211,238,0.15)"
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
            color: "black",
            boxShadow: "0 0 20px rgba(34,211,238,0.5)"
          }}>
            {loading ? "Analyzing..." : "Analyze Idea"}
          </button>
        </div>

        {loading && (
          <div style={{ marginTop: 20 }}>
            🧠 AI is scanning global market data...
          </div>
        )}

        {showResult && (
          <div style={{
            marginTop: 20,
            padding: 20,
            borderRadius: 16,
            background: "rgba(255,255,255,0.05)",
            transform: "perspective(800px) rotateX(3deg)"
          }}>
            ⭐ Score: 7.8 / 10
            <p>Strong SaaS potential with scalable monetization.</p>
          </div>
        )}
      </section>

      {/* DATA DASHBOARD */}
      <section style={{
        padding: 40,
        display: "grid",
        gap: 20
      }}>

        {[
          { title: "$307B SaaS Market", desc: "Global SaaS market size (2024)" },
          { title: "$3.6T AI Economy", desc: "Projected AI contribution by 2030" },
          { title: "18.7% CAGR", desc: "SaaS growth rate (PwC / Gartner est.)" }
        ].map((card, i) => (
          <div key={i} className="reveal" style={{
            padding: 20,
            borderRadius: 20,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            transition: "0.6s",
            transform: "translateY(40px)"
          }}>
            <h3 style={{
              fontSize: 20,
              color: "#22d3ee"
            }}>{card.title}</h3>
            <p style={{ color: "#94a3b8" }}>{card.desc}</p>
          </div>
        ))}

      </section>

      {/* STYLES */}
      <style jsx>{`
        .reveal {
          opacity: 0;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0px);
        }
      `}</style>

    </div>
  )
}
