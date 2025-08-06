// /src/context/TaskContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [lists, setLists] = useState([]);

  // Fetch lists and tasks in real-time
  useEffect(() => {
    const q = query(collection(db, 'lists'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLists(data);
    });
    return () => unsubscribe();
  }, []);

  // Add new list
  const addList = async (name) => {
    await addDoc(collection(db, 'lists'), {
      name,
      tasks: [],
      createdAt: new Date()
    });
  };

  // Delete list
  const deleteList = async (id) => {
    await deleteDoc(doc(db, 'lists', id));
  };

  // Add task to list
  const addTask = async (listId, title, priority) => {
    const listRef = doc(db, 'lists', listId);
    const current = lists.find(list => list.id === listId);
    if (!current) return;

    const updatedTasks = [
      ...current.tasks,
      { id: crypto.randomUUID(), title, priority, completed: false }
    ];

    await updateDoc(listRef, { tasks: updatedTasks });
  };

  // Toggle task complete
  const toggleTask = async (listId, taskId) => {
    const current = lists.find(list => list.id === listId);
    if (!current) return;

    const updatedTasks = current.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    await updateDoc(doc(db, 'lists', listId), { tasks: updatedTasks });
  };

  // Delete task
  const deleteTask = async (listId, taskId) => {
    const current = lists.find(list => list.id === listId);
    if (!current) return;

    const updatedTasks = current.tasks.filter(task => task.id !== taskId);
    await updateDoc(doc(db, 'lists', listId), { tasks: updatedTasks });
  };

  return (
    <TaskContext.Provider value={{
      lists,
      addList,
      deleteList,
      addTask,
      toggleTask,
      deleteTask,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
