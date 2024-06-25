import React, { useState, useEffect } from 'react';
import TaskList from './Pages/TaskList';
import TaskForm from './Pages/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [counter, setCounter] = useState(0)
  // Load tasks from localStorage when the app initializes
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) ;
    console.log('savedTasks', savedTasks)
    // lina meghr el pars el objet ley yjina format json , docn 7achthna bih js 
    setTasks(savedTasks);
    setCounter(1);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (counter === 0) {
      return
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
};

export default App;
