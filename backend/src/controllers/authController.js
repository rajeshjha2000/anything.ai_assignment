const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendResponse = require('../utils/apiResponse');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return sendResponse(res, 400, false, 'User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user',
        });

        if (user) {
            sendResponse(res, 201, true, 'User registered successfully', {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            return sendResponse(res, 400, false, 'Invalid user data');
        }
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (user && (await user.matchPassword(password))) {
            sendResponse(res, 200, true, 'Login successful', {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            return sendResponse(res, 401, false, 'Invalid email or password');
        }
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            sendResponse(res, 200, true, 'Profile fetched successfully', {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } else {
            return sendResponse(res, 404, false, 'User not found');
        }
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

module.exports = { register, login, getProfile };
