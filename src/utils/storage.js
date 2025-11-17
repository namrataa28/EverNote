const STORAGE_KEY = 'notes-app-data'

// Check if localStorage is available (handles SSR and private browsing)
const isLocalStorageAvailable = () => {
  try {
    if (typeof window === 'undefined') return false
    const test = '__localStorage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

export const getNotes = () => {
  if (!isLocalStorageAvailable()) {
    return []
  }
  
  try {
    const notesJson = localStorage.getItem(STORAGE_KEY)
    if (notesJson) {
      return JSON.parse(notesJson)
    }
    return []
  } catch (error) {
    console.error('Error loading notes from localStorage:', error)
    return []
  }
}

export const saveNotes = (notes) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available')
    return
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch (error) {
    console.error('Error saving notes to localStorage:', error)
  }
}

