export async function POST(req) {
  const { idea } = await req.json()

  const text = idea.toLowerCase()

  // BASIC SIGNAL DETECTION
  const signals = {
    ai: text.includes("ai"),
    marketplace: text.includes("marketplace"),
    saas: text.includes("saas"),
    b2b: text.includes("b2b"),
    consumer: text.includes("consumer") || text.includes("app"),
  }

  // MARKET SCORING (rule-based)
  let market = 50
  if (signals.ai) market += 20
  if (signals.saas) market += 15
  if (signals.marketplace) market -= 5

  // MONETIZATION
  let monetization = 40
  if (signals.b2b) monetization += 30
  if (signals.consumer) monetization -= 10

  // COMPETITOR MOCK (replace later with API)
  const competitors = []
  if (signals.ai) competitors.push("OpenAI", "Midjourney")
  if (signals.saas) competitors.push("Notion", "Slack")
  if (signals.marketplace) competitors.push("Fiverr", "Upwork")

  // TREND (fake but realistic curve)
  const trend = Array.from({ length: 7 }, () =>
    Math.floor(40 + Math.random() * 60)
  )

  // RISKS
  const risks = []
  if (signals.marketplace) risks.push("Cold start problem")
  if (signals.ai) risks.push("High competition")
  if (!signals.b2b) risks.push("Weak monetization model")

  // FINAL SCORE
  const score = Math.min(100,
    Math.round((market + monetization) / 2)
  )

  return Response.json({
    score,
    market,
    monetization,
    competitors,
    trend,
    risks,
    summary: `This idea shows ${score > 70 ? "strong" : "moderate"} potential. Focus on differentiation and distribution.`
  })
}
