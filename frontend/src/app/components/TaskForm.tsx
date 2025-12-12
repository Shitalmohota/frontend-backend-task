// /frontend/src/app/components/TaskForm.tsx

import React, { useState, useEffect } from 'react';
import taskService, { Task } from '../../api/taskService';
import { FaSave, FaTimes } from 'react-icons/fa';

interface TaskFormProps {
    taskToEdit: Task | null; 
    onClose: () => void;
    onSave: () => void; // Callback to refresh the task list
}

export default function TaskForm({ taskToEdit, onClose, onSave }: TaskFormProps) {
    const isEditMode = !!taskToEdit;
    const [title, setTitle] = useState(taskToEdit?.title || '');
    const [description, setDescription] = useState(taskToEdit?.description || '');
    const [isCompleted, setIsCompleted] = useState(taskToEdit?.isCompleted || false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!title.trim()) {
            setError('Title is required.');
            return;
        }

        setLoading(true);
        try {
            const data = { title, description, isCompleted };
            
            if (isEditMode && taskToEdit) {
                await taskService.updateTask(taskToEdit._id, data);
            } else {
                await taskService.createTask({ title, description }); // Do not send isCompleted on create
            }
            onSave(); // Closes modal and refreshes list
        } catch (err: any) {
            setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} task.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        // Basic Modal Overlay
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-2xl font-bold text-indigo-700 mb-4 border-b pb-2">
                    {isEditMode ? 'Edit Task' : 'Create New Task'}
                </h3>
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <FaTimes size={20} />
                </button>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:border-indigo-500"
                        disabled={loading}
                        required
                    />
                    <textarea
                        placeholder="Task Description (Optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:border-indigo-500"
                        disabled={loading}
                    />

                    {isEditMode && (
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={(e) => setIsCompleted(e.target.checked)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                disabled={loading}
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Mark as Completed
                            </span>
                        </label>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center transition"
                    >
                        <FaSave className="mr-2" /> {loading ? 'Saving...' : 'Save Task'}
                    </button>
                </form>
            </div>
        </div>
    );
}