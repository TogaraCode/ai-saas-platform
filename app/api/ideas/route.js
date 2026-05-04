
import { getIdeas } from "@/app/lib/store"

// GET → return leaderboard (top ideas)
export async function GET() {
  try {
    const ideas = getIdeas()

    return Response.json({
      success: true,
      count: ideas.length,
      ideas
    })
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: err.message || "Failed to fetch ideas"
      },
      { status: 500 }
    )
  }
}
