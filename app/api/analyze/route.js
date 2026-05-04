import OpenAI from "openai"

export async function POST(req) {
  try {
    const { idea } = await req.json()

    if (!idea) {
      return Response.json({ error: "Missing idea" }, { status: 400 })
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Analyze this startup idea and return JSON:
          
          ${idea}
          
          Format:
          {
            "score": number,
            "market_size": string,
            "target_user": string,
            "monetization": string,
            "risks": string[],
            "summary": string
          }`
        }
      ]
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
