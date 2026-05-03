export async function POST(req) {
  const { idea } = await req.json()

  return new Response(
    JSON.stringify({
      result: "🚀 Your SaaS idea: " + idea + " looks promising!"
    }),
    {
      headers: { "Content-Type": "application/json" }
    }
  )
}
