export default function TaskItem({ task, onToggle, onDelete }) {
  const { id, title, completed, priority } = task;

  return (
    <div className={`task-item ${completed ? 'done' : ''}`}>
      <div>
        <strong>{title}</strong>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Priority: {priority}</p>
      </div>
      <div className="actions">
        <button
          className={completed ? 'completed' : ''}
          onClick={() => onToggle(id)}
        >
          {completed ? '✓' : 'Mark'}
        </button>
        <button className="delete" onClick={() => onDelete(id)}>
          🗑
        </button>
      </div>
    </div>
  );
}
