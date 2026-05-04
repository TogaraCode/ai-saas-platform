"use client"

import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const analyze = async () => {
    if (!idea) return

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          idea,
          userId: "demo-user",
        }),
      })

      if (!res.ok) {
        throw new Error("Request failed")
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      console.error(err)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col px-6 pt-24 pb-20">
      
      {/* HEADER */}
      <h1 className="text-5xl font-serif leading-tight mb-10">
        AI MARKET <br /> INTELLIGENCE
      </h1>

      {/* INPUT */}
      <input
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Describe your startup idea..."
        className="w-full p-4 rounded-xl text-black mb-6"
      />

      {/* BUTTON */}
      <button
        onClick={analyze}
        disabled={loading}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold"
      >
        ⚡ {loading ? "Analyzing..." : "ANALYZE"}
      </button>

      {/* ERROR */}
      {error && (
        <p className="mt-4 text-red-400">{error}</p>
      )}

      {/* RESULTS */}
      {result && (
        <div className="mt-10 space-y-4">
          
          <div className="p-6 rounded-xl bg-[#0f172a]">
            <p>CORE SCORE: {result.score}</p>
          </div>

          <div className="p-6 rounded-xl bg-[#0f172a]">
            <p>DEMAND: {result.market}</p>
          </div>

          <div className="p-6 rounded-xl bg-[#0f172a]">
            <p>SENTIMENT: {result.user}</p>
          </div>

          <div className="p-6 rounded-xl bg-[#0f172a]">
            <p>MONETIZATION: {result.monetization}</p>
          </div>

          <div className="p-6 rounded-xl bg-[#0f172a]">
            <p>SUMMARY: {result.summary}</p>
          </div>

          <div className="p-6 rounded-xl bg-[#0f172a]">
            <p>
              COMPETITORS:{" "}
              {Array.isArray(result.competitors)
                ? result.competitors.join(", ")
                : "N/A"}
            </p>
          </div>

        </div>
      )}
    </main>
  )
}
