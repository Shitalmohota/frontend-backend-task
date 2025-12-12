// /frontend/src/app/components/TaskList.tsx

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import taskService, { Task } from '../../api/taskService';
import TaskItem from './TaskItem'; 
import TaskForm from './TaskForm'; 
import { FaPlus, FaFilter, FaSearch } from 'react-icons/fa';

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // UI State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // --- Data Fetching ---
    const fetchTasks = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await taskService.getTasks();
            setTasks(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch tasks.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // --- CRUD Handlers ---
    const handleSave = () => {
        setIsModalOpen(false);
        setEditingTask(null);
        fetchTasks(); // Refresh list after create/edit
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskService.deleteTask(id);
                setTasks(tasks.filter(t => t._id !== id));
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to delete task.');
            }
        }
    };
    
    // --- Search & Filter Logic (Memoized for performance) ---
    const filteredTasks = useMemo(() => {
        let list = tasks;

        // 1. Filter by Status
        if (filterStatus === 'completed') {
            list = list.filter(t => t.isCompleted);
        } else if (filterStatus === 'pending') {
            list = list.filter(t => !t.isCompleted);
        }

        // 2. Filter by Search Term
        if (searchTerm) {
            list = list.filter(t => 
                t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return list;
    }, [tasks, filterStatus, searchTerm]);


    if (loading) return <div className="text-center p-8">Loading Tasks...</div>;
    if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

    return (
        <div className="space-y-6">
            {/* Search + Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search tasks by title or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
                
                {/* Filter Buttons */}
                <div className="flex gap-2">
                    {['all', 'pending', 'completed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status as 'all' | 'completed' | 'pending')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                filterStatus === status 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            <FaFilter className="inline mr-1" /> {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Create New Task Button */}
                <button
                    onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 flex items-center justify-center transition"
                >
                    <FaPlus className="mr-2" /> New Task
                </button>
            </div>

            {/* List of Tasks */}
            <div className="space-y-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <TaskItem 
                            key={task._id} 
                            task={task} 
                            onEdit={() => { setEditingTask(task); setIsModalOpen(true); }}
                            onDelete={handleDelete}
                            onToggleComplete={fetchTasks} 
                        />
                    ))
                ) : (
                    <div className="text-center p-10 text-gray-500 border border-dashed rounded-lg">
                        {tasks.length === 0 && !searchTerm ? 'You have no tasks yet. Create one!' : 'No results found for your filters.'}
                    </div>
                )}
            </div>

            {/* Create/Edit Task Modal */}
            {isModalOpen && (
                <TaskForm 
                    taskToEdit={editingTask}
                    onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
                    onSave={handleSave}
                />
            )}
        </div>
    );
}