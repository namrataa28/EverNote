# Notes Management Web Application

A modern, responsive Notes Management Web Application similar to Evernote or Apple Notes. Built with React, Tailwind CSS, and localStorage for data persistence.

## Features

### 📝 Core Functionality
- **Create Notes**: Add new notes with title, description, and category
- **Edit Notes**: Click any note card to edit its content
- **Delete Notes**: Remove notes with a confirmation dialog
- **Category Filtering**: Filter notes by category (All Notes, Work, Personal, Ideas)
- **Duplicate Detection**: Visual badge for notes with duplicate titles in the same category

### 🎨 User Interface
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Clean Layout**: Modern, intuitive interface with a sidebar navigation
- **Card-based Display**: Notes displayed in a responsive grid layout
- **Modal Forms**: Create and edit notes using elegant modal dialogs
- **Confirmation Dialogs**: Safe deletion with confirmation prompts

### 💾 Data Management
- **Initial Data**: Loads sample notes from `notes.json` on first launch
- **Local Storage**: All changes persist automatically in browser localStorage
- **No Backend Required**: Fully client-side application

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **date-fns** - Date formatting library
- **localStorage API** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd Todododoo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the URL shown in the terminal)

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
Todododoo/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Category navigation sidebar
│   │   ├── NotesGrid.jsx        # Grid container for note cards
│   │   ├── NoteCard.jsx         # Individual note card component
│   │   ├── NoteModal.jsx        # Create/edit note modal
│   │   └── DeleteConfirmModal.jsx # Delete confirmation modal
│   ├── utils/
│   │   ├── storage.js           # localStorage operations
│   │   └── notesLoader.js       # Initial notes loader from JSON
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles with Tailwind
├── notes.json                   # Initial sample notes data
├── package.json                 # Project dependencies
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── README.md                    # Project documentation
```

## Usage Guide

### Creating a Note

1. Click the **"New Note"** button in the sidebar
2. Fill in the note details:
   - **Title** (required): The note's title
   - **Category** (required): Select from available categories
   - **Description**: The note's content/description
3. Click **"Create"** to save the note

### Editing a Note

1. Click on any note card in the main area
2. The edit modal will open with the note's current data
3. Make your changes and click **"Update"**

### Deleting a Note

1. Click the **"Delete"** button on any note card
2. Confirm the deletion in the confirmation dialog

### Filtering Notes

1. Click on a category in the sidebar to filter notes
2. Select **"All Notes"** to view all notes across all categories

### Duplicate Title Detection

- If multiple notes in the same category have the same title, a **"Duplicate Title"** badge will appear on those notes
- The system prevents creating new notes with duplicate titles in the same category during creation/editing

## Data Persistence

- All notes are stored in the browser's `localStorage`
- Data persists between browser sessions
- Initial sample notes are loaded from `notes.json` on first launch (if localStorage is empty)
- To reset all data, clear your browser's localStorage for this application

## Browser Compatibility

This application works in all modern browsers that support:
- ES6+ JavaScript
- localStorage API
- CSS Grid and Flexbox

Tested on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Style

- Functional React components with hooks
- Clean component separation
- Utility functions for data operations
- Consistent Tailwind CSS class usage

## Future Enhancements

Potential features for future versions:
- Search functionality
- Rich text editing
- Note tags
- Color coding
- Archive/trash functionality
- Export/import notes
- Dark mode theme

## License

This project is open source and available for educational purposes.

## Author

Built as a demonstration of modern React development practices with focus on clean architecture, user experience, and code quality.

