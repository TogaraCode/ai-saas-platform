let ideas = []

export function saveIdea(userId, data) {
  try {
    ideas.push({
      id: Date.now(),
      userId,
      createdAt: new Date().toISOString(),
      ...data
    })
  } catch (err) {
    console.error("STORE SAVE ERROR:", err)
  }
}

export function getIdeas(userId) {
  try {
    return ideas
      .filter(i => i.userId === userId)
      .sort((a, b) => b.score - a.score)
  } catch (err) {
    console.error("STORE GET ERROR:", err)
    return []
  }
}
