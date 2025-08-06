import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import Card from '../components/Card';

export default function TaskListPage() {
  const { id } = useParams();
  const {
    lists,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  const currentList = lists.find(list => list.id === id);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [showCompleted, setShowCompleted] = useState(true);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(id, newTask.trim(), priority);
      setNewTask('');
      setPriority('Medium');
    }
  };

  if (!currentList) return <p>List not found. <Link to="/">Back</Link></p>;

  const sortedTasks = (currentList.tasks || [])
    .filter(task => showCompleted || !task.completed)
    .sort((a, b) => {
      const order = { High: 1, Medium: 2, Low: 3 };
      return order[a.priority] - order[b.priority];
    });

  return (
    <main>
      <section className="container">
        <h2>{currentList.name}</h2>

        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            placeholder="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button type="submit">Add Task</button>
        </form>

        <label className="toggle-row">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          Show Completed
        </label>

        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <Card key={task.id}>
              <TaskItem
                task={task}
                onToggle={() => toggleTask(id, task.id)}
                onDelete={() => deleteTask(id, task.id)}
              />
            </Card>
          ))
        ) : (
          <p>No tasks to show.</p>
        )}

        <p><Link to="/">← Back to All Lists</Link></p>
      </section>
    </main>
  );
}
