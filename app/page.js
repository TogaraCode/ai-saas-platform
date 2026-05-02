"use client"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [bursts, setBursts] = useState([])
  const [scrollY, setScrollY] = useState(0)
  const beamRef = useRef(null)

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

  // scroll tracking (parallax)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // click burst
  function handleClick(e) {
    const burst = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now()
    }
    setBursts((b) => [...b, burst])
    setTimeout(() => {
      setBursts((b) => b.filter((x) => x.id !== burst.id))
    }, 600)
  }

  return (
    <div onClick={handleClick} style={{
      minHeight: "200vh",
      overflowX: "hidden",
      position: "relative",
      fontFamily: "system-ui",
      background: "#020617",
      color: "white"
    }}>

      {/* 🌌 BACKGROUND LAYERS */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        transform: `translateY(${scrollY * 0.2}px)`,
        background: `
          radial-gradient(circle at 20% 30%, #06b6d4, transparent 40%),
          radial-gradient(circle at 80% 70%, #a855f7, transparent 40%),
          radial-gradient(circle at 50% 50%, #0ea5e9, #020617)
        `,
        filter: "blur(60px)",
        opacity: 0.6
      }}/>

      {/* 🧠 GRID FLOOR */}
      <div style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        height: "40%",
        zIndex: 0,
        transform: `perspective(600px) rotateX(60deg) translateY(${scrollY * 0.1}px)`,
        background: `
          repeating-linear-gradient(to right, rgba(34,211,238,0.2) 0px, transparent 2px, transparent 40px),
          repeating-linear-gradient(to top, rgba(168,85,247,0.2) 0px, transparent 2px, transparent 40px)
        `
      }}/>

      {/* ⚡ POINTER LIGHT */}
      <div ref={beamRef} style={{
        position: "fixed",
        width: 220,
        height: 220,
        zIndex: 2,
        pointerEvents: "none",
        background: "radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)",
        transform: "translate(-50%, -50%)",
        mixBlendMode: "screen"
      }}/>

      {/* 💥 BURSTS */}
      {bursts.map((b) => (
        <div key={b.id} style={{
          position: "fixed",
          left: b.x,
          top: b.y,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "radial-gradient(circle,#22d3ee,transparent)",
          transform: "translate(-50%,-50%)",
          animation: "burst 0.6s ease-out"
        }}/>
      ))}

      {/* 🌀 IMAGE TICKER */}
      <div style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1,
        overflow: "hidden",
        pointerEvents: "none"
      }}>
        <div style={{
          display: "flex",
          gap: 30,
          animation: "ticker 30s linear infinite"
        }}>
          {[
            "cyberpunk neon city",
            "ai hologram",
            "neural network glowing",
            "futuristic interface",
            "3d digital grid"
          ].map((q, i) => (
            <img
              key={i}
              src={`https://source.unsplash.com/300x200/?${q}`}
              style={{
                width: 140,
                height: 90,
                borderRadius: 12,
                opacity: 0.8,
                transform: "perspective(500px) rotateY(15deg)",
                boxShadow: "0 0 30px #22d3ee"
              }}
            />
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div style={{
        position: "relative",
        zIndex: 3,
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}>
        <div style={{
          maxWidth: 520,
          width: "100%",
          textAlign: "center"
        }}>

          <h1 style={{
            fontSize: 46,
            fontWeight: 900,
            textShadow: "0 0 40px #22d3ee"
          }}>
            AI SaaS Validator
          </h1>

          <p style={{ color: "#94a3b8" }}>
            Enter the neon startup universe
          </p>

          {/* INPUT */}
          <div style={{
            marginTop: 30,
            padding: 20,
            borderRadius: 20,
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 60px rgba(34,211,238,0.3)"
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
              boxShadow: "0 0 30px #22d3ee"
            }}>
              Analyze Idea
            </button>
          </div>

          {/* FLOATING CARDS */}
          <div style={{
            marginTop: 40,
            display: "grid",
            gap: 20
          }}>
            {["Market AI", "Revenue Engine", "Risk Scanner"].map((item, i) => (
              <div key={i}
                style={{
                  padding: 20,
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "0.3s"
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  e.currentTarget.style.transform =
                    `perspective(600px) rotateX(${(y - rect.height/2)/10}deg) rotateY(${-(x - rect.width/2)/10}deg)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none"
                }}
              >
                {item}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes burst {
          0% { opacity: 1; transform: scale(0.5); }
          100% { opacity: 0; transform: scale(2); }
        }
      `}</style>

    </div>
  )
}
