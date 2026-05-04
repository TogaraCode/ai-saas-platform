export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(req) {
  try {
    const { idea, plan } = await req.json()

    if (!idea) {
      return Response.json({ error: "Missing idea" }, { status: 400 })
    }

    // FREE TIER
    if (plan !== "pro") {
      return Response.json({
        insight: "Upgrade to Pro for AI insights"
      })
    }

    // NO ENV SAFE
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({
        insight: "AI unavailable (no API key)"
      })
    }

    const OpenAI = (await import("openai")).default

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Analyze this SaaS idea:\n${idea}`
        }
      ]
    })

    return Response.json({
      insight: completion.choices[0].message.content
    })

  } catch (err) {
    console.error(err)

    return Response.json({
      insight: "AI failed safely"
    })
  }
}
