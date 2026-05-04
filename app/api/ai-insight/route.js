export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(req) {
  try {
    const body = await req.json()
    const { idea, plan } = body || {}

    // ✅ Validate input
    if (!idea || typeof idea !== "string") {
      return Response.json({ error: "Invalid idea" }, { status: 400 })
    }

    // ✅ FREE TIER → NO AI CALL
    if (plan !== "pro") {
      return Response.json({
        insight: "Upgrade to Pro to unlock AI insights"
      })
    }

    // ✅ NO ENV → SAFE FALLBACK (NO CRASH)
    if (!process.env.OPENAI_API_KEY) {
      return Response.json({
        insight: "AI temporarily unavailable"
      })
    }

    // ✅ IMPORT INSIDE HANDLER (CRITICAL FIX)
    const OpenAI = (await import("openai")).default

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Analyze this SaaS idea and give actionable insight:\n${idea}`
        }
      ]
    })

    const insight =
      completion?.choices?.[0]?.message?.content ||
      "No insight generated"

    return Response.json({ insight })

  } catch (err) {
    console.error("AI ROUTE ERROR:", err)

    return Response.json({
      insight: "AI failed. Try again later."
    })
  }
}
