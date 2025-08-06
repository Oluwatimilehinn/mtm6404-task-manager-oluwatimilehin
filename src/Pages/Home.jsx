import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { lists, addList, deleteList } = useTasks();
  const [name, setName] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addList(name);
      setName('');
    }
  };

  return (
    <main>
      <section className="container">
        <h2>My Task Lists</h2>
        <form onSubmit={handleAdd} className="list-form">
          <input
            type="text"
            placeholder="New List Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Add List</button>
        </form>

        <ul className="list-group">
          {lists.map((list) => (
            <li key={list.id} className="list-item">
              <Link className="list-link" to={`/list/${list.id}`}>{list.name}</Link>
              <button onClick={() => deleteList(list.id)} className="delete-list-btn">🗑</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
