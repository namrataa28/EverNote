export default function Sidebar({ categories, selectedCategory, onSelectCategory, onCreateNote }) {
  return (
    <aside className="w-full lg:w-64 bg-white border-r border-gray-200 flex flex-col" style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">📝</span>
          <h2 className="text-xl font-bold text-gray-800">Notes</h2>
        </div>
        <button
          onClick={onCreateNote}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <span className="text-lg">+</span>
          New Note
        </button>
      </div>

      {/* Categories */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onSelectCategory(category)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

