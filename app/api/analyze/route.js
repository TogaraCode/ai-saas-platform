export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { saveIdea } from "../../../lib/store"

export async function POST(req) {
  try {
    const { idea, userId } = await req.json()

    if (!idea) {
      return Response.json({ error: "Missing idea" }, { status: 400 })
    }

    const length = idea.length

    const demand = Math.min(90, 50 + Math.floor(length * 0.5))
    const sentiment = Math.min(85, 55 + Math.floor(length * 0.4))
    const monetization = Math.min(80, 50 + Math.floor(length * 0.3))

    const score = Math.round(
      demand * 0.4 +
      sentiment * 0.3 +
      monetization * 0.3
    )

    const result = {
      idea,
      score,
      demand,
      sentiment,
      monetization,
      trend: [40, 50, 60, 70, 80, demand],
      competitors: ["Notion", "Slack", "Airtable"],
      risks: ["Crowded market", "Execution complexity"],
      summary: "Good potential with competitive pressure"
    }

    saveIdea(userId || "guest", result)

    return Response.json(result)

  } catch (e) {
    console.error(e)
    return Response.json({ error: "Server error" }, { status: 500 })
  }
}
