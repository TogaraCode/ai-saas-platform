import fetch from "node-fetch"
import { saveIdea } from "../../../lib/store"

async function getTrendData(query) {
  try {
    const res = await fetch(
      `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&engine=google_trends&api_key=${process.env.SERP_API_KEY}`
    )
    const data = await res.json()
    if (!data.interest_over_time) return [50, 60, 70, 80, 90]
    return data.interest_over_time.timeline_data.map(p => p.values[0].value)
  } catch {
    return [50, 60, 70, 80, 90]
  }
}

async function getRedditSentiment(query) {
  try {
    const res = await fetch(`https://www.reddit.com/search.json?q=${query}&limit=10`)
    const json = await res.json()
    const posts = json.data.children
    if (!posts.length) return 50
    const score = posts.reduce((a, p) => a + p.data.score, 0) / posts.length
    return Math.min(100, Math.max(20, score))
  } catch {
    return 50
  }
}

async function getCompetitors(query) {
  try {
    const res = await fetch(
      `https://serpapi.com/search.json?q=${encodeURIComponent(query + " SaaS")}&api_key=${process.env.SERP_API_KEY}`
    )
    const data = await res.json()
    return (data.organic_results || [])
      .slice(0, 5)
      .map(r => r.title.split(" ")[0])
  } catch {
    return ["Notion", "Slack", "Airtable"]
  }
}

export async function POST(req) {
  const { idea } = await req.json()

  const [trend, sentiment, competitors] = await Promise.all([
    getTrendData(idea),
    getRedditSentiment(idea),
    getCompetitors(idea)
  ])

  const demand = Math.round(trend.reduce((a, b) => a + b, 0) / trend.length)
  const competition = competitors.length * 15
  const monetization = sentiment > 60 ? 70 : 50

  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round((demand * 0.4 + sentiment * 0.3 + monetization * 0.3) - competition * 0.2)
    )
  )

  const result = {
    idea,
    score,
    demand,
    sentiment,
    monetization,
    trend,
    competitors,
    risks: [
      competition > 50 ? "High competition" : "Low visibility",
      sentiment < 50 ? "Weak user interest" : "Positive market signal"
    ],
    summary: `Demand ${demand}, Sentiment ${sentiment}`
  }

  saveIdea(result)

  return Response.json(result)
}
