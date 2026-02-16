const TaskCard = ({ task, onEdit, onDelete }) => {
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'high':
                return 'priority-high';
            case 'medium':
                return 'priority-medium';
            case 'low':
                return 'priority-low';
            default:
                return '';
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'completed':
                return 'status-completed';
            case 'in-progress':
                return 'status-progress';
            case 'pending':
                return 'status-pending';
            default:
                return '';
        }
    };

    return (
        <div className="task-card">
            <div className="task-header">
                <h3>{task.title}</h3>
                <div className="task-badges">
                    <span className={`badge ${getPriorityClass(task.priority)}`}>
                        {task.priority}
                    </span>
                    <span className={`badge ${getStatusClass(task.status)}`}>
                        {task.status}
                    </span>
                </div>
            </div>
            {task.description && <p className="task-description">{task.description}</p>}
            <div className="task-actions">
                <button onClick={() => onEdit(task)} className="btn btn-edit">
                    Edit
                </button>
                <button onClick={() => onDelete(task._id)} className="btn btn-delete">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
