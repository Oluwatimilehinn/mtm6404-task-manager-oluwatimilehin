import { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [lists, setLists] = useState(() => {
    const stored = localStorage.getItem('taskLists');
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 'default',
            name: 'My Tasks',
            tasks: [],
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem('taskLists', JSON.stringify(lists));
  }, [lists]);

  // Add a new task to a list
  const addTask = (listId, title, priority) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
    };

    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      )
    );
  };

  // Toggle a task's completion
  const toggleTask = (listId, taskId) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : list
      )
    );
  };

  // Delete a task
  const deleteTask = (listId, taskId) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list
      )
    );
  };

  // Add a new task list
  const addList = (name) => {
    const newList = {
      id: crypto.randomUUID(),
      name,
      tasks: [],
    };
    setLists((prev) => [...prev, newList]);
  };

  // Delete an entire task list
  const deleteList = (listId) => {
    setLists((prev) => prev.filter((list) => list.id !== listId));
  };

  return (
    <TaskContext.Provider
      value={{
        lists,
        addList,
        deleteList,
        addTask,
        toggleTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
