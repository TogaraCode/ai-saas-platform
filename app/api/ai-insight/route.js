export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(req) {
  try {
    const { idea, plan } = await req.json()

    if (!idea) {
      return Response.json({ error: "Missing idea" }, { status: 400 })
    }

    // FREE TIER → NO AI
    if (plan !== "pro") {
      return Response.json({
        insight: "Upgrade to Pro for AI insights"
      })
    }

    // SAFE GUARD (prevents build crash)
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({
        insight: "AI unavailable (no key set)"
      })
    }

    // 🔥 CRITICAL: dynamic import ONLY inside function
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
      insight: completion.choices?.[0]?.message?.content || "No insight"
    })

  } catch (err) {
    console.error("AI ERROR:", err)

    return Response.json({
      insight: "AI failed safely"
    })
  }
}
