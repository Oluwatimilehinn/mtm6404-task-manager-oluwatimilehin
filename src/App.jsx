import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import TaskListPage from './pages/TaskListPage.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import { TaskProvider } from './context/TaskContext.jsx';

function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <NavBar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list/:id" element={<TaskListPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </TaskProvider>
  );
}

export default App;
