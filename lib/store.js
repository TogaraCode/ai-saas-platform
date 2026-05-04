let ideas = []

export function saveIdea(entry) {
  ideas.push({
    id: Date.now(),
    ...entry
  })
}

export function getIdeas() {
  return ideas.sort((a, b) => b.score - a.score)
}
