import fetch from "node-fetch"
import { saveIdea } from "../../../lib/store"

export async function POST(req) {
  const { idea, userId } = await req.json()

  const trend = [50, 60, 70, 80, 90]
  const sentiment = 60
  const competitors = ["Notion", "Slack"]

  const demand = 70
  const monetization = 60
  const score = 75

  const result = {
    idea,
    score,
    demand,
    sentiment,
    monetization,
    trend,
    competitors,
    risks: ["Competition"],
    summary: "Moderate opportunity"
  }

  saveIdea(userId || "guest", result)

  return Response.json(result)
}
