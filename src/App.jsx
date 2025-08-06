import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskListPage from './pages/TaskListPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list/:id" element={<TaskListPage />} />
      </Routes>
      <Footer />
    </TaskProvider>
  );
}

export default App;
