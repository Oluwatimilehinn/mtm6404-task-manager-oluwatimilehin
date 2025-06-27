export default function TaskItem({ id, title, completed, onToggle }) {
  return (
    <div className="task-item">
      <span>{title}</span>
      <button
        className={completed ? 'completed' : ''}
        onClick={() => onToggle(id)}
      >
        {completed ? '✓ Completed' : 'Mark as Done'}
      </button>
    </div>
  );
}
