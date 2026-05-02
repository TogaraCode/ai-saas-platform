export async function POST(req: Request) {
  const { idea } = await req.json()

  return Response.json({
    result: "AI will be connected next. Idea: " + idea
  })
}
