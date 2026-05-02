"use client"
import { useEffect, useState } from "react"

export default function Home() {
  const [menu, setMenu] = useState(false)

  return (
    <div style={{
      minHeight: "100vh",
      color: "white",
      fontFamily: "system-ui",
      position: "relative",
      overflow: "hidden"
    }}>

      {/* 🌍 BACKGROUND GLOBE LAYER */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(168,85,247,0.15), transparent),
          radial-gradient(circle at 80% 40%, rgba(34,211,238,0.15), transparent),
          url("https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1600&auto=format&fit=crop")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 0,
        filter: "brightness(0.35) saturate(1.2)"
      }}/>

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1, padding: 16 }}>

        {/* 🔥 HEADER */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20
        }}>

          {/* LOGO */}
          <Logo />

          {/* SEARCH */}
          <input
            placeholder="Search ideas..."
            style={{
              flex: 1,
              margin: "0 10px",
              padding: 10,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.4)",
              color: "white"
            }}
          />

          {/* AUTH */}
          <div style={{ display: "flex", gap: 6 }}>
            <button style={btn}>Login</button>
            <button style={btn}>Logout</button>
          </div>

          {/* MENU */}
          <div onClick={() => setMenu(!menu)} style={hamburger}>
            ☰
          </div>
        </div>

        {/* DROPDOWN */}
        {menu && (
          <div style={dropdown}>
            <div>Auth</div>
            <div>Dashboard</div>
            <div>Billing</div>
          </div>
        )}

        {/* 🚀 HERO CAROUSEL */}
        <HeroCarousel />

        {/* 🔥 ICON NAV */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(100px,1fr))",
          gap: 12,
          marginTop: 20
        }}>
          <IconCard label="AI" />
          <IconCard label="Data" />
          <IconCard label="Growth" />
          <IconCard label="Revenue" />
        </div>

        {/* 🔥 PANELS */}
        <div style={{
          display: "grid",
          gap: 16,
          marginTop: 20,
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))"
        }}>
          <Panel title="MARKET">
            <Stats />
          </Panel>

          <
