"use client"

import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyzeIdea = async () => {
    if (!idea) return

    setLoading(true)

    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      })

      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error("Error analyzing idea:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-10">
      <div className="max-w-2xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl font-serif mb-8 leading-tight">
          AI MARKET <br /> INTELLIGENCE
        </h1>

        {/* INPUT */}
        <div className="flex gap-2">
          <input
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your startup idea..."
            className="flex-1 p-3 rounded-lg bg-gray-200 text-black"
          />

          <button
            onClick={analyzeIdea}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold"
          >
            {loading ? "..." : "⚡ ANALYZE"}
          </button>
        </div>

        {/* RESULTS */}
        {result && (
          <div className="mt-10 space-y-6">

            {[
              ["CORE SCORE", result.score],
              ["DEMAND", result.market],
              ["SENTIMENT", result.user],
              ["MONETIZATION", result.monetization],
              ["SUMMARY", result.summary],
              ["COMPETITORS", result.competitors?.join(", ")]
            ].map(([label, value]) => (
              <div
                key={label}
                className="p-6 rounded-2xl bg-[#0b1220] border border-white/5 shadow-lg"
              >
                <p className="text-cyan-400 font-serif text-lg mb-2">
                  {label}
                </p>
                <p className="text-white text-base">
                  {value || "—"}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  )
}
