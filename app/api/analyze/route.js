export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { saveIdea } from "../../../lib/store"

export async function POST(req) {
  try {
    const body = await req.json()
    const { idea, userId } = body || {}

    if (!idea || typeof idea !== "string") {
      return Response.json({ error: "Invalid idea" }, { status: 400 })
    }

    // ✅ Stable scoring (no randomness spikes)
    const base = idea.length

    const demand = Math.min(90, 50 + Math.floor(base * 0.5))
    const sentiment = Math.min(85, 55 + Math.floor(base * 0.4))
    const monetization = Math.min(80, 50 + Math.floor(base * 0.3))

    const score = Math.round(
      demand * 0.4 +
      sentiment * 0.3 +
      monetization * 0.3
    )

    const trend = Array.from({ length: 6 }, (_, i) =>
      Math.min(100, demand - 10 + i * 5)
    )

    const result = {
      idea,
      score,
      demand,
      sentiment,
      monetization,
      trend,
      competitors: ["Notion", "Slack", "Airtable"],
      risks: ["High competition", "Market saturation"],
      summary: "Solid potential with competitive pressure"
    }

    // ✅ Safe persistence
    saveIdea(userId || "guest", result)

    return Response.json(result)

  } catch (err) {
    console.error("ANALYZE ERROR:", err)

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
