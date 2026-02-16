import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import api from '../services/api';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data.data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch tasks');
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        try {
            const response = await api.post('/tasks', taskData);
            setTasks([response.data.data, ...tasks]);
            setShowForm(false);
            setSuccess('Task created successfully');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create task');
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            const response = await api.put(`/tasks/${editingTask._id}`, taskData);
            setTasks(tasks.map(t => t._id === editingTask._id ? response.data.data : t));
            setEditingTask(null);
            setShowForm(false);
            setSuccess('Task updated successfully');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update task');
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            await api.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter(t => t._id !== taskId));
            setSuccess('Task deleted successfully');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete task');
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingTask(null);
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="dashboard-header">
                    <h1>My Tasks</h1>
                    {!showForm && (
                        <button onClick={() => setShowForm(true)} className="btn btn-primary">
                            Create Task
                        </button>
                    )}
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                {showForm && (
                    <div className="form-container">
                        <TaskForm
                            task={editingTask}
                            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                            onCancel={handleCancel}
                        />
                    </div>
                )}

                {loading ? (
                    <div className="loading">Loading tasks...</div>
                ) : (
                    <div className="tasks-grid">
                        {tasks.length === 0 ? (
                            <p className="no-tasks">No tasks yet. Create your first task!</p>
                        ) : (
                            tasks.map(task => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    onEdit={handleEdit}
                                    onDelete={handleDeleteTask}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
