export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { saveIdea } from "../../../../lib/store"

const HIGH_DEMAND = ["ai", "automation", "platform", "tool", "marketplace"]
const MONETIZATION_STRONG = ["saas", "subscription", "b2b", "enterprise"]
const HIGH_COMPETITION = ["ai", "chat", "crm", "productivity"]

function scoreIdea(idea) {
  const text = idea.toLowerCase()

  let demand = 40
  let monetization = 40
  let competition = 30
  let differentiation = 30

  // 🔥 Demand scoring
  HIGH_DEMAND.forEach(word => {
    if (text.includes(word)) demand += 8
  })

  // 💰 Monetization scoring
  MONETIZATION_STRONG.forEach(word => {
    if (text.includes(word)) monetization += 10
  })

  // ⚔️ Competition scoring (negative)
  HIGH_COMPETITION.forEach(word => {
    if (text.includes(word)) competition += 10
  })

  // 🧠 Differentiation (based on specificity)
  const lengthFactor = Math.min(idea.length / 50, 1)
  differentiation += Math.floor(lengthFactor * 30)

  // 🎯 Final score
  const score = Math.round(
    demand * 0.4 +
    monetization * 0.3 +
    differentiation * 0.2 -
    competition * 0.1
  )

  return {
    score: Math.max(0, Math.min(100, score)),
    demand,
    monetization,
    competition,
    differentiation
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const { idea, userId } = body || {}

    if (!idea || typeof idea !== "string") {
      return Response.json(
        { error: "Invalid idea" },
        { status: 400 }
      )
    }

    const metrics = scoreIdea(idea)

    const result = {
      score: metrics.score,
      market: metrics.demand,
      user: metrics.differentiation,
      monetization: metrics.monetization,
      risks: metrics.competition,

      summary:
        metrics.score > 75
          ? "Strong opportunity with good monetization potential"
          : metrics.score > 55
          ? "Moderate opportunity, needs differentiation"
          : "High competition or weak monetization",

      trends: [
        metrics.demand - 20,
        metrics.demand - 10,
        metrics.demand,
        metrics.demand + 5,
        metrics.demand + 10
      ].map(v => Math.max(10, Math.min(100, v))),

      competitors: HIGH_COMPETITION.filter(word =>
        idea.toLowerCase().includes(word)
      )
    }

    await saveIdea(userId, { idea, ...result })

    return Response.json(result)

  } catch (err) {
    console.error("Analyze error:", err)

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
