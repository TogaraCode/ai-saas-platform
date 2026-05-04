"use client"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [ideas, setIdeas] = useState([])

  useEffect(() => {
    fetch("/api/ideas")
      .then(r => r.json())
      .then(setIdeas)
  }, [])

  return (
    <div style={{ padding: 20 }}>

      <h2>Leaderboard</h2>

      {ideas.map(i => (
        <div key={i.id} style={{
          padding: 12,
          marginBottom: 10,
          borderRadius: 10,
          background: "#020617",
          border: "1px solid #1f2937"
        }}>
          <div>{i.idea}</div>
          <div>Score: {i.score}</div>
        </div>
      ))}

    </div>
  )
}
