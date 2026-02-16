const express = require('express');
const {
    getAllUsers,
    getAllTasks,
    deleteUser,
} = require('../controllers/adminController');
const protect = require('../middleware/auth');
const authorize = require('../middleware/roleCheck');

const router = express.Router();

router.get('/users', protect, authorize('admin'), getAllUsers);
router.get('/tasks', protect, authorize('admin'), getAllTasks);
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
