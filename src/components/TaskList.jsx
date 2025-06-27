import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [showCompleted, setShowCompleted] = useState(true);

  // ✅ Load tasks from localStorage when the app loads
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsed = JSON.parse(storedTasks);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        }
      } catch (err) {
        console.error('Failed to load from localStorage:', err);
      }
    }
  }, []);

  // ✅ Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    const trimmed = newTask.trim();
    if (!trimmed) return;

    const newItem = {
      id: crypto.randomUUID(), // generate unique ID
      title: trimmed,
      completed: false,
      priority,
    };

    setTasks(prev => [...prev, newItem]);
    setNewTask('');
    setPriority('Medium');
  };

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const sortedTasks = tasks
    .filter(task => showCompleted || !task.completed)
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <section>
      <h2>My Tasks</h2>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <div className="toggle-row">
        <label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          Show Completed
        </label>
      </div>

      {sortedTasks.length > 0 ? (
        sortedTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))
      ) : (
        <p>No tasks to show.</p>
      )}
    </section>
  );
}