import { useState, useEffect, useRef } from 'react'
import Sidebar from './components/Sidebar'
import NotesGrid from './components/NotesGrid'
import NoteModal from './components/NoteModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import { getNotes, saveNotes } from './utils/storage'
import { loadInitialNotes } from './utils/notesLoader'

const CATEGORIES = ['All Notes', 'Work', 'Personal', 'Ideas']

function App() {
  const [notes, setNotes] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All Notes')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [noteToDelete, setNoteToDelete] = useState(null)
  const isInitialMount = useRef(true)
  const hasLoadedNotes = useRef(false)

  // Load notes on mount
  useEffect(() => {
    // Check if we've already loaded notes (handles StrictMode double mount)
    if (hasLoadedNotes.current) {
      console.log('Already loaded, skipping initial load')
      return
    }
    
    const loadedNotes = getNotes()
    console.log('=== INITIAL LOAD START ===')
    console.log('Loading notes from localStorage:', loadedNotes)
    
    if (loadedNotes && loadedNotes.length > 0) {
      // Load notes from localStorage
      console.log('Setting notes from localStorage:', loadedNotes)
      // Set both notes and flag in the same update
      isInitialMount.current = false
      hasLoadedNotes.current = true
      setNotes(loadedNotes)
      console.log('isInitialMount set to false after loading from localStorage')
    } else {
      // Load initial notes from JSON file if localStorage is empty
      console.log('localStorage is empty, loading initial notes from JSON')
      loadInitialNotes()
        .then((initialNotes) => {
          if (initialNotes && initialNotes.length > 0) {
            console.log('Setting initial notes from JSON:', initialNotes)
            // Set flag BEFORE setting notes to prevent save effect from running with empty array
            isInitialMount.current = false
            hasLoadedNotes.current = true
            setNotes(initialNotes)
            // Save directly since we know this is the initial load
            saveNotes(initialNotes)
          } else {
            console.log('No initial notes found in JSON')
            isInitialMount.current = false
            hasLoadedNotes.current = true
          }
          console.log('isInitialMount set to false after loading from JSON')
        })
        .catch((error) => {
          console.error('Error loading initial notes:', error)
          isInitialMount.current = false
          hasLoadedNotes.current = true
          console.log('isInitialMount set to false after error')
        })
    }
    console.log('=== INITIAL LOAD END ===')
  }, [])

  // Save notes to localStorage whenever they change (skip initial mount)
  useEffect(() => {
    // Skip saving on initial mount or before notes are loaded
    if (isInitialMount.current || !hasLoadedNotes.current) {
      return
    }
    // Save notes (including empty array if user deleted all notes)
    // Both flags ensure we don't save empty array during initial load or remounts
    saveNotes(notes)
  }, [notes])

  const filteredNotes = selectedCategory === 'All Notes'
    ? notes
    : notes.filter(note => note.category === selectedCategory)

  // Debug logging
  useEffect(() => {
    console.log('Notes state updated:', notes)
    console.log('Selected category:', selectedCategory)
    console.log('Filtered notes:', filteredNotes)
  }, [notes, selectedCategory, filteredNotes])

  const handleCreateNote = () => {
    setEditingNote(null)
    setIsModalOpen(true)
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
    setIsModalOpen(true)
  }

  const handleSaveNote = (noteData) => {
    console.log('=== handleSaveNote START ===')
    console.log('noteData:', noteData)
    console.log('editingNote:', editingNote)
    console.log('Current notes before update:', notes)
    console.log('Current notes length:', notes.length)
    
    // Ensure we save even if isInitialMount hasn't been set yet
    isInitialMount.current = false
    console.log('isInitialMount set to false')
    
    if (editingNote) {
      // Update existing note
      console.log('Updating existing note')
      setNotes(prevNotes => {
        const updated = prevNotes.map(note =>
          note.id === editingNote.id
            ? { ...noteData, id: editingNote.id, createdAt: editingNote.createdAt }
            : note
        )
        console.log('Updated notes (edit):', updated)
        return updated
      })
    } else {
      // Create new note
      const newNote = {
        ...noteData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      }
      console.log('Creating new note:', newNote)
      console.log('Current selectedCategory:', selectedCategory)
      
      // Switch to the note's category so it's visible immediately if not viewing "All Notes"
      if (selectedCategory !== 'All Notes' && selectedCategory !== noteData.category) {
        console.log('Switching category from', selectedCategory, 'to', noteData.category)
        setSelectedCategory(noteData.category)
      }
      
      setNotes(prevNotes => {
        console.log('Inside setNotes callback, prevNotes:', prevNotes)
        // Ensure we create a new array reference so React detects the change
        const updated = [...prevNotes, newNote]
        console.log('Updated notes array (create):', updated)
        console.log('Previous notes length:', prevNotes.length)
        console.log('New notes length:', updated.length)
        console.log('=== handleSaveNote END (inside callback) ===')
        return updated
      })
    }
    
    console.log('Closing modal and clearing editingNote')
    setIsModalOpen(false)
    setEditingNote(null)
    console.log('=== handleSaveNote END ===')
  }

  const handleDeleteNote = (note) => {
    setNoteToDelete(note)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (noteToDelete) {
      // Ensure we save even if isInitialMount hasn't been set yet
      isInitialMount.current = false
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteToDelete.id))
      setIsDeleteModalOpen(false)
      setNoteToDelete(null)
    }
  }

  const cancelDelete = () => {
    setIsDeleteModalOpen(false)
    setNoteToDelete(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingNote(null)
  }

  // Check for duplicate titles in the same category
  const getDuplicateTitleInfo = (note) => {
    const sameCategoryNotes = notes.filter(
      n => n.category === note.category && n.id !== note.id
    )
    const duplicates = sameCategoryNotes.filter(n => n.title === note.title)
    return duplicates.length > 0
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className="lg:flex-row">
        {/* Sidebar */}
        <Sidebar
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onCreateNote={handleCreateNote}
        />

        {/* Main Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '2rem' }} className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                {selectedCategory}
              </h1>
              <p style={{ color: '#4b5563' }}>
                {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
              </p>
            </div>

            <NotesGrid
              key={`notes-${notes.length}-${selectedCategory}`}
              notes={filteredNotes}
              onEditNote={handleEditNote}
              onDeleteNote={handleDeleteNote}
              getDuplicateTitleInfo={getDuplicateTitleInfo}
            />
          </div>
        </main>
      </div>

      {/* Note Modal */}
      {isModalOpen && (
        <NoteModal
          note={editingNote}
          categories={CATEGORIES.filter(cat => cat !== 'All Notes')}
          onSave={handleSaveNote}
          onClose={closeModal}
          existingNotes={notes}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmModal
          noteTitle={noteToDelete?.title}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  )
}

export default App
