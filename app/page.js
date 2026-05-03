"use client"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <div style={root}>
      <div style={container}>

        <Header />

        <div style={hero}>
          <h1 style={title}>
            Predict startup success before you build
          </h1>

          <p style={subtitle}>
            AI-powered validation using real-world signals.
          </p>

          <div style={{ display: "flex", gap: 10 }}>
            <button style={primary} onClick={() => router.push("/dashboard")}>
              Start analyzing
            </button>

            <button style={ghost} onClick={() => router.push("/pricing")}>
              View pricing
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

/* HEADER */
function Header() {
  return (
    <div style={header}>
      <div style={logo}>NEXUS CORE</div>

      <div style={{ display: "flex", gap: 10 }}>
        <button style={ghost}>Login</button>
        <button style={primary}>Sign up</button>
      </div>
    </div>
  )
}

/* STYLES */
const root = { minHeight: "100vh", background: "#0a0f1c", color: "white" }
const container = { maxWidth: 1100, margin: "0 auto", padding: 24 }

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 60
}

const logo = { fontWeight: "bold" }

const hero = { maxWidth: 600 }

const title = { fontSize: 42, fontWeight: 700 }
const subtitle = { opacity: 0.7, margin: "12px 0 20px" }

const primary = {
  background: "#6366f1",
  padding: "10px 16px",
  borderRadius: 8,
  border: "none",
  color: "white"
}

const ghost = {
  border: "1px solid #1f2937",
  padding: "10px 16px",
  borderRadius: 8,
  background: "transparent",
  color: "#cbd5f5"
}
