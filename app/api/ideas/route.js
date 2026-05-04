import { getIdeas } from "../../../../lib/store"

export async function GET() {
  const ideas = await getIdeas()
  return Response.json(ideas)
}
