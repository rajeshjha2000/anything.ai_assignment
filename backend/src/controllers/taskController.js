const Task = require('../models/Task');
const sendResponse = require('../utils/apiResponse');

const createTask = async (req, res) => {
    try {
        const { title, description, status, priority } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            userId: req.user._id,
        });

        sendResponse(res, 201, true, 'Task created successfully', task);
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
        sendResponse(res, 200, true, 'Tasks fetched successfully', tasks);
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return sendResponse(res, 404, false, 'Task not found');
        }

        if (task.userId.toString() !== req.user._id.toString()) {
            return sendResponse(res, 403, false, 'Not authorized to access this task');
        }

        sendResponse(res, 200, true, 'Task fetched successfully', task);
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return sendResponse(res, 404, false, 'Task not found');
        }

        if (task.userId.toString() !== req.user._id.toString()) {
            return sendResponse(res, 403, false, 'Not authorized to update this task');
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        sendResponse(res, 200, true, 'Task updated successfully', updatedTask);
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return sendResponse(res, 404, false, 'Task not found');
        }

        if (task.userId.toString() !== req.user._id.toString()) {
            return sendResponse(res, 403, false, 'Not authorized to delete this task');
        }

        await Task.findByIdAndDelete(req.params.id);

        sendResponse(res, 200, true, 'Task deleted successfully');
    } catch (error) {
        sendResponse(res, 500, false, error.message);
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
