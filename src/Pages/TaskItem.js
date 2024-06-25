import React, { useState } from 'react';

const TaskItem = ({ task, updateTask, deleteTask, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (taskName && taskDescription) {
      updateTask({ ...task, name: taskName, description: taskDescription });
      setIsEditing(false);
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <button type="submit">Update</button>
        </form>
      ) : (
        <div>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <button onClick={() => toggleComplete(task.id)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
