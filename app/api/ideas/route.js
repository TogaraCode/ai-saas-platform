import { getIdeas } from "../../../lib/store"

export async function POST(req) {
  try {
    const { userId } = await req.json()

    return Response.json(
      getIdeas(userId || "guest")
    )

  } catch (e) {
    console.error(e)
    return Response.json([])
  }
}
