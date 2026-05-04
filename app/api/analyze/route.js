import { NextResponse } from "next/server"

// ---------- UTIL ----------
const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v))

const normalize = (value, min, max) => {
  if (max === min) return 50
  return clamp(((value - min) / (max - min)) * 100)
}

// ---------- KEYWORD EXTRACTION ----------
function extractKeywords(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter(w => w.length > 3)
    .slice(0, 10)
}

// ---------- MOCK SIGNALS (replace later with real APIs) ----------
async function getSignals(keywords) {
  // Replace this with real APIs later (Google Trends, Reddit, etc.)
  return {
    mentions: Math.random() * 1000,
    growthRate: Math.random() * 100,
    competitors: Math.random() * 50,
    avgPrice: Math.random() * 100,
    sentiment: Math.random() * 100
  }
}

// ---------- SCORING ----------
function computeScores(signals) {
  const demandRaw = signals.mentions * (1 + signals.growthRate / 100)
  const competitionRaw = signals.competitors
  const monetizationRaw = signals.avgPrice * (signals.sentiment / 100)

  const demand = normalize(demandRaw, 0, 2000)
  const competition = normalize(competitionRaw, 0, 100)
  const monetization = normalize(monetizationRaw, 0, 100)

  const risk = clamp(100 - demand + competition / 2)

  // Weighted composite
  const score = Math.round(
    demand * 0.4 +
    (100 - competition) * 0.2 +
    monetization * 0.3 +
    (100 - risk) * 0.1
  )

  return {
    score,
    demand: Math.round(demand),
    competition: Math.round(competition),
    monetization: Math.round(monetization),
    risk: Math.round(risk)
  }
}

// ---------- AI INSIGHT (OPTIONAL, SAFE FALLBACK) ----------
async function generateInsights(scores, idea) {
  // If no API key, fallback to deterministic text
  if (!process.env.OPENAI_API_KEY) {
    return {
      insight: `Demand appears ${scores.demand > 70 ? "strong" : "moderate"} with ${scores.competition > 60 ? "high" : "manageable"} competition.`,
      recommendations: [
        "Focus on a niche segment",
        "Validate pricing early",
        "Differentiate via UX or automation"
      ]
    }
  }

  // Lazy import so build doesn't fail if package isn't installed yet
  const OpenAI = (await import("openai")).default
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const prompt = `
Analyze this SaaS idea:

Idea: ${idea}

Scores:
Demand: ${scores.demand}
Competition: ${scores.competition}
Monetization: ${scores.monetization}
Risk: ${scores.risk}

Return JSON with:
- insight (short paragraph)
- recommendations (array of 3 actionable steps)
`

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  })

  try {
    const text = completion.choices[0].message.content
    const parsed = JSON.parse(text)
    return parsed
  } catch {
    return {
      insight: "AI insight parsing failed. Using fallback.",
      recommendations: ["Validate manually", "Refine positioning", "Re-run analysis"]
    }
  }
}

// ---------- ROUTE ----------
export async function POST(req) {
  try {
    const { idea } = await req.json()

    if (!idea || idea.length < 5) {
      return NextResponse.json({ error: "Invalid idea" }, { status: 400 })
    }

    const keywords = extractKeywords(idea)
    const signals = await getSignals(keywords)
    const scores = computeScores(signals)
    const ai = await generateInsights(scores, idea)

    return NextResponse.json({
      ...scores,
      ...ai,
      keywords,
      signals
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
