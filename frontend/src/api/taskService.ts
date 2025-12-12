import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks/';

export interface Task {
    _id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
    user: string;
}

interface CreateTaskData {
    title: string;
    description: string;
}

interface UpdateTaskData {
    title?: string;
    description?: string;
    isCompleted?: boolean;
}

// GET all tasks (Protected: token sent via Axios default headers)
const getTasks = async (): Promise<Task[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

// POST create task (Protected)
const createTask = async (taskData: CreateTaskData): Promise<Task> => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
};

// PUT update task (Protected)
const updateTask = async (id: string, updateData: UpdateTaskData): Promise<Task> => {
    const response = await axios.put(API_URL + id, updateData);
    return response.data;
};

// DELETE delete task (Protected)
const deleteTask = async (id: string): Promise<void> => {
    await axios.delete(API_URL + id);
};

const taskService = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};

export default taskService;