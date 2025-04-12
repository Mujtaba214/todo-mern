import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const Todo = ({ task, deleteTodo, toggle, editTodo }) => {
    return (
        <div className='Todo'>
            <p
                className={`${task.completed ? "completed" : "incompleted"}`}
                onClick={() => toggle(task.id)}
            >
                {task.task}
            </p>
            <div>
                <AiOutlineDelete
                    className='delete-icon'
                    onClick={() => deleteTodo(task.id)}
                />
                <FaEdit className='edit-icon' onClick={() => editTodo(task.id)} />
            </div>
        </div>
    );
};

export default Todo;
