import { useState } from 'react';
import TaskItem from './TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finish assignment', completed: false },
    { id: 2, title: 'Buy groceries', completed: true },
    { id: 3, title: 'Call mom', completed: false },
    { id: 4, title: 'Clean room', completed: true },
    { id: 5, title: 'Read 10 pages', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTask = (id) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const addTask = (e) => {
    e.preventDefault();
    const trimmed = newTask.trim();
    if (!trimmed) return;

    const newItem = {
      id: Date.now(),
      title: trimmed,
      completed: false,
    };

    setTasks([...tasks, newItem]);
    setNewTask('');
  };

  return (
    <section>
      <h2>My Tasks</h2>

      {/* Add Task Form */}
      <form onSubmit={addTask} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newTask}
          placeholder="Enter new task"
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            backgroundColor: '#10b981',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Add
        </button>
      </form>

      {/* Task List */}
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          onToggle={toggleTask}
        />
      ))}
    </section>
  );
}
