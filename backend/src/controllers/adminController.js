const User = require('../models/User');
const Task = require('../models/Task');
const sendResponse = require('../utils/apiResponse');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        sendResponse(res, 200, true, 'Users fetched successfully', users);
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).populate('userId', 'name email');
        sendResponse(res, 200, true, 'All tasks fetched successfully', tasks);
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return sendResponse(res, 404, false, 'User not found');
        }

        await Task.deleteMany({ userId: req.params.id });
        await User.findByIdAndDelete(req.params.id);

        sendResponse(res, 200, true, 'User and associated tasks deleted successfully');
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

module.exports = {
    getAllUsers,
    getAllTasks,
    deleteUser,
};
