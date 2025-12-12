// /project-root/backend/src/models/Task.js

import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        // Link to the User model (ownership)
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User', 
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;