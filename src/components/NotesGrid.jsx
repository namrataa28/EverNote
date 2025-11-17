import NoteCard from './NoteCard'

export default function NotesGrid({ notes, onEditNote, onDeleteNote, getDuplicateTitleInfo }) {
  console.log('NotesGrid rendered with notes:', notes)
  console.log('NotesGrid notes length:', notes?.length)
  
  if (!notes || notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <span className="text-6xl mb-4">📄</span>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No notes found</h3>
        <p className="text-gray-500">Create your first note to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
          isDuplicate={getDuplicateTitleInfo(note)}
        />
      ))}
    </div>
  )
}
