import NavBar from './components/NavBar';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div id="root">
      <NavBar>
        <h1>Task Manager</h1>
      </NavBar>
      <main>
        <TaskList />
      </main>
      <Footer />
    </div>
  );
}
