import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  // Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, newTask]);
      setTaskText('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="container">
      <h1>Mi Lista de Tareas - React</h1>
      <div className="todo-app">
        <div className="input-section">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nueva tarea..."
            className="task-input"
          />
          <button onClick={addTask} className="add-btn">
            Añadir Tarea
          </button>
        </div>
        
        <TaskList 
          tasks={tasks} 
          onToggle={toggleTask} 
          onDelete={deleteTask} 
        />
        
        <div className="stats">
          <span className="task-count">
            Total: {totalTasks} tareas ({completedTasks} completadas)
          </span>
          <button onClick={clearCompleted} className="clear-btn">
            Limpiar Completadas
          </button>
        </div>
      </div>
    </div>
  );
}

// Componente separado para la lista de tareas
function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay tareas. ¡Añade alguna!</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  );
}

// Componente para cada item de tarea
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span className="task-text">{task.text}</span>
      <div className="task-actions">
        <button 
          onClick={() => onToggle(task.id)} 
          className={`toggle-btn ${task.completed ? 'reactivate' : 'complete'}`}
        >
          {task.completed ? 'Reactivar' : 'Completar'}
        </button>
        <button 
          onClick={() => onDelete(task.id)} 
          className="delete-btn"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default App;