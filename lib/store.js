let ideas = []

export function saveIdea(userId, data) {
  try {
    if (!data || typeof data !== "object") return

    ideas.push({
      id: Date.now(),
      userId: userId || "guest",
      createdAt: new Date().toISOString(),
      ...data
    })
  } catch (err) {
    console.error("store.saveIdea error:", err)
  }
}

export function getIdeas(userId) {
  try {
    const list = ideas
      .filter(i => (userId ? i.userId === userId : true))
      .sort((a, b) => (b.score || 0) - (a.score || 0))

    return list
  } catch (err) {
    console.error("store.getIdeas error:", err)
    return []
  }
}
