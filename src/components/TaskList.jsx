import { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import Card from './Card';

export default function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Invalid tasks in storage:', e);
      return [];
    }
  });

  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    const trimmed = newTask.trim();
    if (!trimmed) return;

    const newItem = {
      id: crypto.randomUUID(),
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
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
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
          <Card key={task.id}>
            <TaskItem
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </Card>
        ))
      ) : (
        <p>No tasks to show.</p>
      )}
    </section>
  );
}
