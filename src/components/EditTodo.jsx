import React, { useState } from "react";

const EditTodo = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    editTodo(value, task._id);
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Edit your task..."
        autoFocus
      />
      <button type="submit" className="todo-btn">Update</button>
      <button
        type="button"
        className="todo-btn cancel-btn"
        onClick={() => editTodo(task.task, task._id)}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditTodo;