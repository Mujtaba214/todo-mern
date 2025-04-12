import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import EditTodo from "./EditTodo";
import axios from "axios";

const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios.get("https://backend-todo-kappa.vercel.app/api/data")
            .then(result => setTodos(result.data.map(todo => ({
                ...todo,
                completed: todo.completed || false
            }))))
            .catch(err => console.log(err));
    }, [todos]);

    const addTodo = (todo) => {
        axios.post("https://backend-todo-kappa.vercel.app/api/add", { task: todo })
            .then(res => setTodos([...todos, { ...res.data, completed: false }]))
            .catch(err => console.log(err));
        setRefresh(!refresh);
    };

    const deleteTodo = (id) => {
        axios.delete(`https://backend-todo-kappa.vercel.app/api/delete/${id}`)
            .then(() => setTodos(todos.filter(todo => todo._id !== id)))
            .catch(err => console.log(err));
    };

    const toggleComplete = (id) => {
        const updatedTodo = todos.find(todo => todo._id === id);
        const updatedTodoData = { ...updatedTodo, completed: !updatedTodo.completed };

        setTodos(todos.map(todo =>
            todo._id === id ? updatedTodoData : todo
        ));

        axios.put(`https://backend-todo-kappa.vercel.app/api/update/${id}`, { completed: updatedTodoData.completed })
            .then(res => {
                console.log("Task updated successfully on the backend:", res.data);
            })
            .catch(err => console.log("Error updating task on the backend:", err));
    };

    const toggleEdit = (id) => {
        setTodos(todos.map(todo =>
            todo._id === id ? { ...todo, isEditable: !todo.isEditable } : todo
        ));
    };

    const editTask = (task, id) => {
        axios.put(`https://backend-todo-kappa.vercel.app/api/update/${id}`, { task })
            .then(res => setTodos(todos.map(todo =>
                todo._id === id ? { ...res.data, isEditable: false } : todo
            )))
            .catch(err => console.log(err));
    };

    return (
        <div className="TodoWrapper">
            <h1>Todo App</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo) =>
                todo.isEditable ? (
                    <EditTodo key={todo._id} editTodo={editTask} task={todo} />
                ) : (
                    <div className="Todo" key={todo._id}>
                        <p
                            className={`task-text ${todo.completed ? "completed" : ""}`}
                            onClick={() => toggleComplete(todo._id)}
                        >
                            {todo.task}
                        </p>
                        <div className="buttons">
                            <button className="todo-btn" onClick={() => toggleEdit(todo._id)}>
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
