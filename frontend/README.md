# Task Management Frontend

A modern React application for managing tasks with authentication and role-based access.

## Features

- User authentication (login/register)
- Protected routes with JWT
- Dashboard for managing tasks
- CRUD operations for tasks
- Admin panel for managing users
- Responsive design
- Modern UI with gradient backgrounds

## Tech Stack

- React.js
- React Router for navigation
- Axios for API calls
- Context API for state management
- Modern CSS with responsive design

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

3. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Usage

1. Register a new account or login
2. Create, edit, and delete tasks from the dashboard
3. Admin users can access the admin panel to manage users and view all tasks

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── TaskCard.jsx
│   │   └── TaskForm.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── AdminPanel.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .gitignore
└── package.json
```

## Building for Production

```bash
npm run build
```

The build files will be in the `dist` directory.
