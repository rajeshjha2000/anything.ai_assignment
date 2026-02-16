# Task Management System

A full-stack task management application with authentication and role-based access control.

## Overview

This project consists of a RESTful API backend built with Node.js/Express and a React frontend. It demonstrates secure authentication, CRUD operations, role-based access control, and modern web development practices.

## Features

### Backend
- User authentication with JWT
- Password hashing with bcrypt
- Role-based access control (user/admin)
- CRUD API for tasks
- Input validation and sanitization
- Error handling
- API documentation with Swagger
- MongoDB database

### Frontend
- User registration and login
- Protected routes
- Task management dashboard
- Admin panel for user management
- Responsive modern UI
- Real-time error/success messages

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT
- Bcrypt
- Swagger

**Frontend:**
- React.js
- React Router
- Axios
- Context API

## Installation

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Documentation

Visit `http://localhost:5000/api-docs` for interactive Swagger documentation.

## Usage

1. Register a new account
2. Login with your credentials
3. Create and manage tasks from the dashboard
4. Admin users can access the admin panel

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── context/
    │   ├── services/
    │   └── App.jsx
    └── package.json
```

## Security Features

- JWT authentication
- Password hashing
- Input validation
- Role-based access control
- Rate limiting
- CORS configuration
- Security headers with Helmet

## License

ISC
