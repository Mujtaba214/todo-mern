import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import EditTodo from "./EditTodo";
import axios from "axios";

const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [editableId, setEditableId] = useState(null);

    const fetchTodos = () => {
        axios.get("https://backend-todo-blond.vercel.app/api/data")
            .then(result => {
                setTodos(result.data.map(todo => ({
                    ...todo,
                    completed: todo.completed || false
                })));
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchTodos(); // Load todos on component mount
    }, []);

    const refreshTodos = () => {
        fetchTodos();
        setEditableId(null); // Exit edit mode on refresh
    };

    const addTodo = (task) => {
        axios.post("https://backend-todo-blond.vercel.app/api/add", { task })
            .then(() => refreshTodos())
            .catch(err => console.log(err));
    };

    const deleteTodo = (id) => {
        axios.delete(`https://backend-todo-blond.vercel.app/api/delete/${id}`)
            .then(() => refreshTodos())
            .catch(err => console.log(err));
    };

    const toggleComplete = (id) => {
        const todo = todos.find(t => t._id === id);
        if (!todo) return;

        axios.put(`https://backend-todo-blond.vercel.app/api/update/${id}`, { completed: !todo.completed })
            .then(() => refreshTodos())
            .catch(err => console.log(err));
    };

    const editTask = (task, id) => {
        axios.put(`https://backend-todo-blond.vercel.app/api/update/${id}`, { task })
            .then(() => refreshTodos())
            .catch(err => console.log(err));
    };

    return (
        <div className="TodoWrapper">
            <h1>Todo App</h1>
            <button className="refresh-btn" onClick={refreshTodos}>
                🔄 Refresh
            </button>

            <TodoForm addTodo={addTodo} />

            {todos.map((todo) =>
                editableId === todo._id ? (
                    <EditTodo
                        key={todo._id}
                        editTodo={editTask}
                        task={todo}
                        cancelEdit={() => setEditableId(null)}
                    />
                ) : (
                    <div className="Todo" key={todo._id}>
                        <p
                            className={`task-text ${todo.completed ? "completed" : ""}`}
                            onClick={() => toggleComplete(todo._id)}
                        >
                            {todo.task}
                        </p>
                        <div className="buttons">
                            <button className="todo-btn" onClick={() => setEditableId(todo._id)}>
                                Edit
                            </button>
                            <button className="todo-btn" onClick={() => deleteTodo(todo._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default TodoWrapper;
