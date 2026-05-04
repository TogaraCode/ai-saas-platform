let ideas = []

export function saveIdea({ idea, userId, score }) {
  ideas.push({
    id: Date.now(),
    userId,
    idea,
    score,
    createdAt: new Date().toISOString(),
  })
}

export function getIdeas(userId) {
  return ideas
    .filter(i => i.userId === userId)
    .sort((a, b) => b.score - a.score)
}
