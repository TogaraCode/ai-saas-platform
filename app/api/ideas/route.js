import { getIdeas } from "../../../lib/store"

export async function POST(req) {
  const { userId } = await req.json()
  return Response.json(getIdeas(userId || "guest"))
}
