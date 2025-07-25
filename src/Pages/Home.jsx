import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function Home() {
  const { lists, addList, deleteList } = useTasks();
  const [listName, setListName] = useState('');

  const handleAddList = (e) => {
    e.preventDefault();
    const trimmed = listName.trim();
    if (trimmed) {
      addList(trimmed);
      setListName('');
    }
  };

  return (
    <section className="home">
      <h2>All Task Lists</h2>

      <form onSubmit={handleAddList} className="list-form">
        <input
          type="text"
          placeholder="New list name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button type="submit">Add List</button>
      </form>

      <ul className="list-group">
        {lists.map((list) => (
          <li key={list.id} className="list-item">
            <Link to={`/list/${list.id}`} className="list-link">
              {list.name}
            </Link>
            <button
              onClick={() => deleteList(list.id)}
              className="delete-list-btn"
              disabled={list.id === 'default'} // Optional: protect default list
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
