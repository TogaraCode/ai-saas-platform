export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { saveIdea } from "../../../../lib/store"

export async function POST(req) {
  try {
    // ✅ Safe JSON parsing
    const body = await req.json()
    const { idea, userId } = body || {}

    // ✅ Input validation
    if (!idea || typeof idea !== "string") {
      return Response.json(
        { error: "Missing or invalid idea" },
        { status: 400 }
      )
    }

    // ✅ Core scoring (UNCHANGED LOGIC)
    const score = Math.min(100, Math.floor(idea.length * 1.2))

    const result = {
      score,
      market: Math.floor(score * 0.9),
      user: Math.floor(score * 0.85),
      monetization: Math.floor(score * 1.1),
      risks: 100 - score,
      summary: "Initial validation based on structure and clarity",

      // ✅ Trend data preserved
      trends: [20, 40, 60, 55, 70, score],

      // ✅ Competitor placeholders preserved
      competitors: ["Notion", "Slack", "Linear"]
    }

    // ✅ Safe persistence (won’t crash build/runtime)
    try {
      await saveIdea({ idea, userId, score })
    } catch (err) {
      console.error("Save failed:", err)
      // Do NOT break response if persistence fails
    }

    return Response.json(result)
  } catch (err) {
    console.error("Analyze route error:", err)

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
