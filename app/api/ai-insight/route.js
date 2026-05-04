
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req) {
  const { idea, data } = await req.json()

  const prompt = `
You are a SaaS expert.

Idea: ${idea}

Data:
- Score: ${data.score}
- Demand: ${data.demand}
- Sentiment: ${data.sentiment}
- Competitors: ${data.competitors.join(", ")}

Give:
1. Key insight
2. Main risk
3. Strategic recommendation
`

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  })

  return Response.json({
    insight: res.choices[0].message.content
  })
}
