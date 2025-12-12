// /project-root/backend/src/routes/taskRoutes.js

import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; 
import { 
    getAllTasks, 
    createTask,
    getTaskById, 
    updateTask, 
    deleteTask 
} from '../controllers/taskController.js';

const router = express.Router();

// Routes for /api/tasks (Collection actions) - Protected
router.route('/')
    .get(protect, getAllTasks)
    .post(protect, createTask);

// Routes for /api/tasks/:id (Individual resource actions) - Protected
router.route('/:id')
    .get(protect, getTaskById)
    .put(protect, updateTask)
    .delete(protect, deleteTask);

export default router;