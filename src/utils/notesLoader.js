export const loadInitialNotes = async () => {
  try {
    const response = await fetch('/notes.json')
    if (!response.ok) {
      throw new Error('Failed to load notes.json')
    }
    const notesData = await response.json()
    return notesData.map(note => ({
      ...note,
      createdAt: note.createdAt || new Date().toISOString()
    }))
  } catch (error) {
    console.error('Error loading initial notes:', error)
    return []
  }
}

