import { getIdeas } from "../../../lib/store"

export async function POST(req) {
  try {
    const { userId } = await req.json()
    return Response.json(getIdeas(userId || "guest"))
  } catch (err) {
    console.error("IDEAS ERROR:", err)
    return Response.json([])
  }
}
