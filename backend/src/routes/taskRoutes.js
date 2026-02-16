const express = require('express');
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');
const protect = require('../middleware/auth');
const {
    validateTask,
    handleValidationErrors,
} = require('../middleware/validator');

const router = express.Router();

router
    .route('/')
    .post(protect, validateTask, handleValidationErrors, createTask)
    .get(protect, getTasks);

router
    .route('/:id')
    .get(protect, getTaskById)
    .put(protect, validateTask, handleValidationErrors, updateTask)
    .delete(protect, deleteTask);

module.exports = router;
