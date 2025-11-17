import { format } from 'date-fns'

export default function NoteCard({ note, onEdit, onDelete, isDuplicate }) {
  const handleClick = () => {
    onEdit(note)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(note)
  }

  const formattedDate = format(new Date(note.createdAt), 'MMM d, yyyy h:mm a')

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 flex-1" style={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {note.title}
        </h3>
        {isDuplicate && (
          <span className="ml-2 px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded whitespace-nowrap">
            Duplicate Title
          </span>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4" style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical'
      }}>
        {note.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
            {note.category}
          </span>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>

        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
          title="Delete note"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

