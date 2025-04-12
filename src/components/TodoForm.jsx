import axios from 'axios';
import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [task, setTask] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://backend-todo-kappa.vercel.app/api/add", { task: task })
            .then(result => {
                console.log(result);
                setTask("");
            })
            .catch(err => {
                console.error(err);
                setError("An error occurred while adding the task.");
            });
    };

    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={(e) => setTask(e.target.value)}
                className='todo-input'
                placeholder='What is your task'
                value={task}
            />
            <button className='todo-btn'>Add task</button>
            {error && <p className="error">{error}</p>}  {/* Error message */}
        </form>
    );
};

export default TodoForm;
