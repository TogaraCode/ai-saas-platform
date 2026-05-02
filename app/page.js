"use client"
import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [result, setResult] = useState("")

  async function analyze() {
    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ idea })
    })
    const data = await res.json()
    setResult(data.result)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>AI SaaS Validator</h1>

      <input
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Enter idea"
      />

      <button onClick={analyze}>
        Analyze
      </button>

      <pre>{result}</pre>
    </div>
  )
}