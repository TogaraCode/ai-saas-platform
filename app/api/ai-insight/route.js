import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req) {
  const { idea, data } = await req.json()

  const prompt = `
Idea: ${idea}

Score: ${data.score}
Demand: ${data.demand}
Sentiment: ${data.sentiment}

Give:
- Insight
- Risk
- Strategy
`

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  })

  return Response.json({
    insight: res.choices[0].message.content
  })
}
