// /frontend/src/app/components/TaskItem.tsx

import React from 'react';
import taskService, { Task } from '../../api/taskService';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

interface TaskItemProps {
    task: Task;
    onEdit: () => void;
    onDelete: (id: string) => void;
    onToggleComplete: () => void; // Callback to refresh the list
}

export default function TaskItem({ task, onEdit, onDelete, onToggleComplete }: TaskItemProps) {
    const handleToggle = async () => {
        try {
            // Update the task status via the API
            await taskService.updateTask(task._id, { isCompleted: !task.isCompleted });
            onToggleComplete(); // Refresh the parent TaskList component
        } catch (error) {
            console.error('Failed to toggle task status:', error);
            alert('Failed to update task status.');
        }
    };

    return (
        <div className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition ${
            task.isCompleted ? 'bg-green-50 border-l-4 border-green-500' : 'bg-white border-l-4 border-gray-300'
        }`}>
            <div className="flex-grow">
                <h4 className={`text-lg font-semibold ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.title}
                </h4>
                {task.description && (
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                )}
            </div>

            <div className="flex items-center space-x-3 ml-4">
                {/* Completion Status Button */}
                <button
                    onClick={handleToggle}
                    className={`p-2 rounded-full text-white transition ${
                        task.isCompleted ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                    title={task.isCompleted ? 'Mark as Pending' : 'Mark as Complete'}
                >
                    {task.isCompleted ? <FaTimes /> : <FaCheck />}
                </button>

                {/* Edit Button */}
                <button
                    onClick={onEdit}
                    className="p-2 text-indigo-600 hover:text-indigo-800 transition"
                    title="Edit Task"
                >
                    <FaEdit />
                </button>

                {/* Delete Button */}
                <button
                    onClick={() => onDelete(task._id)}
                    className="p-2 text-red-600 hover:text-red-800 transition"
                    title="Delete Task"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}