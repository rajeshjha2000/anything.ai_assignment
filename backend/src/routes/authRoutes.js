const express = require('express');
const {
    register,
    login,
    getProfile,
} = require('../controllers/authController');
const protect = require('../middleware/auth');
const {
    validateRegister,
    validateLogin,
    handleValidationErrors,
} = require('../middleware/validator');

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/profile', protect, getProfile);

module.exports = router;
