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



