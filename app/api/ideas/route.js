export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { getIdeas } from "../../../lib/store"

export async function GET() {
  try {
    const ideas = await getIdeas()

    // ✅ Ensure consistent response shape
    return Response.json(ideas || [])
  } catch (err) {
    console.error("Ideas route error:", err)

    return Response.json(
      { error: "Failed to fetch ideas" },
      { status: 500 }
    )
  }
}
