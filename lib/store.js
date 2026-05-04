let ideas = []

export function saveIdea(userId, data) {
  ideas.push({
    id: Date.now(),
    userId,
    createdAt: new Date().toISOString(),
    ...data
  })
}

export function getIdeas(userId) {
  return ideas
    .filter(i => i.userId === userId)
    .sort((a, b) => b.score - a.score)
}
