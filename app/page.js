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
      fontFamily: "system-ui",
      overflowX: "hidden"
    }}>

      {/* POINTER LIGHT */}
      <div ref={beamRef} style={{
        position: "fixed",
        width: 250,
        height: 250,
        pointerEvents: "none",
        background: "radial-gradient(circle, rgba(34,211,238,0.25), transparent 70%)",
        transform: "translate(-50%, -50%)",
        mixBlendMode: "screen",
        zIndex: 1
      }}/>

      {/* HERO */}
      <section style={{ padding: 40, textAlign: "center" }}>
        <h1 style={{
          fontSize: 44,
          fontWeight: 800,
          textShadow: "0 0 25px #22d3ee"
        }}>
          AI SaaS Validator
        </h1>

        <p style={{ color: "#94a3b8" }}>
          Holographic intelligence for startup ideas
        </p>

        {/* INPUT */}
        <div style={{
          marginTop: 30,
          maxWidth: 520,
          marginInline: "auto",
          padding: 20,
          borderRadius: 20,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 0 60px rgba(34,211,238,0.25)"
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
            boxShadow: "0 0 20px #22d3ee"
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

      {/* LIVE DATA TICKER */}
      <div style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: 10,
        fontSize: 14,
        color: "#22d3ee"
      }}>
        <div style={{
          display: "inline-block",
          animation: "scroll 20s linear infinite"
        }}>
          🚀 SaaS Market $307B • AI Economy $3.6T • 18.7% CAGR • 10,000+ Startups • Data-driven validation •
        </div>
      </div>

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

      {/* BAR CHART */}
      <section style={{ padding: 40 }}>
        <h2 style={{ textAlign: "center" }}>Revenue Growth</h2>

        <div style={{
          display: "flex",
          gap: 10,
          alignItems: "flex-end",
          height: 200,
          marginTop: 20
        }}>
          {[20, 40, 80, 120, 160].map((h, i) => (
            <div key={i} style={{
              flex: 1,
              height: h,
              background: "linear-gradient(#22d3ee,#a855f7)",
              borderRadius: 6,
              boxShadow: "0 0 15px #22d3ee"
            }}/>
          ))}
        </div>
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

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

    </div>
  )
}
