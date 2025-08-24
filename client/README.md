# Memoize Frontend

Memoize is a note-taking web application built with React and Vite. This frontend connects to a Node.js/Express backend and provides features like authentication, note management, and label organization.

## Features

- User authentication (signup, login, logout)
- Create, update, and view notes
- Organize notes by labels
- Pin and search notes
- Upload user avatars
- Responsive UI with Tailwind CSS
- Toast notifications for feedback

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Lucide React](https://lucide.dev/icons/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Backend server running (see `/server` folder)

### Installation

```sh
npm install

npm run dev

npm run build

npm run lint

client/
  ├── public/           # Static assets
  ├── src/
  │   ├── components/   # Reusable UI and main components
  │   ├── pages/        # Route pages (Login, Signup, Home, Account)
  │   ├── store/        # Redux store and slices
  │   ├── utils/        # API and helper functions
  │   ├── [App.jsx](http://_vscodecontentref_/0)       # Main app component
  │   ├── [main.jsx](http://_vscodecontentref_/1)      # Entry point
  │   └── [index.css](http://_vscodecontentref_/2)     # Global styles
  ├── [package.json](http://_vscodecontentref_/3)
  ├── [vite.config.js](http://_vscodecontentref_/4)
  └── [README.md](http://_vscodecontentref_/5)


  Environment Variables
The frontend expects the backend API to be running at http://localhost:8000. You can change this in src/utils/api.js.

API Endpoints
See backend documentation for available endpoints.