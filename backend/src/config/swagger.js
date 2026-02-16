const swaggerSpec = {
    openapi: '3.0.0',
    info: {
        title: 'Task Management API',
        version: '1.0.0',
        description: 'REST API with Authentication and Role-Based Access Control',
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            User: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string', enum: ['user', 'admin'] },
                    createdAt: { type: 'string', format: 'date-time' },
                },
            },
            Task: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    status: { type: 'string', enum: ['pending', 'in-progress', 'completed'] },
                    priority: { type: 'string', enum: ['low', 'medium', 'high'] },
                    userId: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                },
            },
        },
    },
    paths: {
        '/api/v1/auth/register': {
            post: {
                tags: ['Authentication'],
                summary: 'Register a new user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['name', 'email', 'password'],
                                properties: {
                                    name: { type: 'string', example: 'John Doe' },
                                    email: { type: 'string', example: 'john@example.com' },
                                    password: { type: 'string', example: 'password123' },
                                    role: { type: 'string', enum: ['user', 'admin'], example: 'user' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'User registered successfully',
                    },
                    400: {
                        description: 'Bad request',
                    },
                },
            },
        },
        '/api/v1/auth/login': {
            post: {
                tags: ['Authentication'],
                summary: 'Login user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string', example: 'john@example.com' },
                                    password: { type: 'string', example: 'password123' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Login successful',
                    },
                    401: {
                        description: 'Invalid credentials',
                    },
                },
            },
        },
        '/api/v1/auth/profile': {
            get: {
                tags: ['Authentication'],
                summary: 'Get user profile',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Profile fetched successfully',
                    },
                    401: {
                        description: 'Not authorized',
                    },
                },
            },
        },
        '/api/v1/tasks': {
            post: {
                tags: ['Tasks'],
                summary: 'Create a new task',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['title'],
                                properties: {
                                    title: { type: 'string', example: 'Complete assignment' },
                                    description: { type: 'string', example: 'Finish the backend project' },
                                    status: { type: 'string', enum: ['pending', 'in-progress', 'completed'], example: 'pending' },
                                    priority: { type: 'string', enum: ['low', 'medium', 'high'], example: 'medium' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Task created successfully',
                    },
                },
            },
            get: {
                tags: ['Tasks'],
                summary: 'Get all user tasks',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Tasks fetched successfully',
                    },
                },
            },
        },
        '/api/v1/tasks/{id}': {
            get: {
                tags: ['Tasks'],
                summary: 'Get task by ID',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    200: {
                        description: 'Task fetched successfully',
                    },
                    404: {
                        description: 'Task not found',
                    },
                },
            },
            put: {
                tags: ['Tasks'],
                summary: 'Update task',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string' },
                                    description: { type: 'string' },
                                    status: { type: 'string', enum: ['pending', 'in-progress', 'completed'] },
                                    priority: { type: 'string', enum: ['low', 'medium', 'high'] },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Task updated successfully',
                    },
                },
            },
            delete: {
                tags: ['Tasks'],
                summary: 'Delete task',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    200: {
                        description: 'Task deleted successfully',
                    },
                },
            },
        },
        '/api/v1/admin/users': {
            get: {
                tags: ['Admin'],
                summary: 'Get all users (Admin only)',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Users fetched successfully',
                    },
                    403: {
                        description: 'Not authorized',
                    },
                },
            },
        },
        '/api/v1/admin/tasks': {
            get: {
                tags: ['Admin'],
                summary: 'Get all tasks (Admin only)',
                security: [{ bearerAuth: [] }],
                responses: {
                    200: {
                        description: 'Tasks fetched successfully',
                    },
                },
            },
        },
        '/api/v1/admin/users/{id}': {
            delete: {
                tags: ['Admin'],
                summary: 'Delete user (Admin only)',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' },
                    },
                ],
                responses: {
                    200: {
                        description: 'User deleted successfully',
                    },
                },
            },
        },
    },
};

module.exports = swaggerSpec;
