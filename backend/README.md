# Task Management API

A scalable REST API with authentication and role-based access control built with Node.js, Express, and MongoDB.

## Features

- User authentication (register/login) with JWT
- Password hashing with bcrypt
- Role-based access control (user/admin)
- CRUD operations for tasks
- Input validation and sanitization
- Error handling
- API documentation with Swagger
- Rate limiting for security

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Swagger for API documentation

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/taskmanagement
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/profile` - Get user profile (Protected)

### Tasks
- `POST /api/v1/tasks` - Create task (Protected)
- `GET /api/v1/tasks` - Get user's tasks (Protected)
- `GET /api/v1/tasks/:id` - Get single task (Protected)
- `PUT /api/v1/tasks/:id` - Update task (Protected)
- `DELETE /api/v1/tasks/:id` - Delete task (Protected)

### Admin
- `GET /api/v1/admin/users` - Get all users (Admin only)
- `GET /api/v1/admin/tasks` - Get all tasks (Admin only)
- `DELETE /api/v1/admin/users/:id` - Delete user (Admin only)

## API Documentation

Visit `http://localhost:5000/api-docs` for interactive Swagger documentation.

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── swagger.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── roleCheck.js
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── apiResponse.js
│   └── server.js
├── .env
├── .gitignore
└── package.json
```

## Testing

You can test the API using:
- Swagger UI at `/api-docs`
- Postman
- Any HTTP client

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Role-based access control
- Rate limiting
- CORS configuration
- Helmet for security headers
