// /project-root/backend/src/controllers/taskController.js

import Task from '../models/Task.js';

// Helper function to find a task owned by the user
const findTaskByIdAndUser = async (taskId, userId) => {
    // Crucial security check: ensures task belongs to the user
    const task = await Task.findOne({ _id: taskId, user: userId });
    return task;
};

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getAllTasks = async (req, res) => {
    try {
        // Only fetch tasks where the 'user' field matches the logged-in user's ID
        const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title field is required' });
    }

    try {
        const task = await Task.create({
            title,
            description,
            user: req.user._id, // Associate the task with the logged-in user
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
    try {
        const task = await findTaskByIdAndUser(req.params.id, req.user._id);

        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found or user unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const task = await findTaskByIdAndUser(req.params.id, req.user._id);

        if (task) {
            // Update fields only if they exist in the request body
            task.title = req.body.title !== undefined ? req.body.title : task.title;
            task.description = req.body.description !== undefined ? req.body.description : task.description;
            task.isCompleted = req.body.isCompleted !== undefined ? req.body.isCompleted : task.isCompleted;

            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found or user unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await findTaskByIdAndUser(req.params.id, req.user._id);

        if (task) {
            await Task.deleteOne({ _id: req.params.id }); 
            res.json({ message: 'Task removed successfully' });
        } else {
            res.status(404).json({ message: 'Task not found or user unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllTasks, createTask, getTaskById, updateTask, deleteTask };