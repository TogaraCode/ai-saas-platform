import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req) {
  try {
    const { idea } = await req.json()

    if (!idea) {
      return Response.json({ error: "Missing idea" }, { status: 400 })
    }

    const prompt = `
You are a startup analyst.

Analyze this startup idea:

"${idea}"

Return STRICT JSON:

{
  "score": number (0-100),
  "market_size": string,
  "target_user": string,
  "monetization": string,
  "risks": string[],
  "summary": string
}
`

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })

    const text = response.choices[0].message.content

    let parsed
    try {
      parsed = JSON.parse(text)
    } catch {
      return Response.json({ raw: text })
    }

    return Response.json(parsed)

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
