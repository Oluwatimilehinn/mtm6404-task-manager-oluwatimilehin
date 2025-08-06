import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">
          <Link to="/">📝 Task Manager</Link>
        </h1>
        <div className="navbar-links">
          <Link to="/">All Lists</Link>
          {/* You can add more links if needed */}
        </div>
      </div>
    </nav>
  );
}
