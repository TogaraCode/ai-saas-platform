
let ideas = []

export function saveIdea(data) {
  const entry = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...data
  }

  ideas.push(entry)

  // sort by score (highest first)
  ideas.sort((a, b) => b.score - a.score)

  return entry
}

export function getIdeas() {
  return ideas.slice(0, 20) // top 20
}
