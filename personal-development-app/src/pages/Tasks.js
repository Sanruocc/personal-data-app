// src/pages/Tasks.js
import React, { useEffect, useState } from 'react';
import { saveDataToLocalStorage, loadDataFromLocalStorage } from '../utils/dataStorage';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        const loadedTasks = loadDataFromLocalStorage('tasks') || [];
        setTasks(loadedTasks);
    }, []);

    const addTask = () => {
        const updatedTasks = [...tasks, task];
        setTasks(updatedTasks);
        saveDataToLocalStorage(updatedTasks, 'tasks');
        setTask('');
    };

    return (
        <div>
            <h1>Your Tasks</h1>
            <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Add a new task" />
            <button onClick={addTask}>Add Task</button>
            <h2>Task List:</h2>
            <ul>
                {tasks.map((t, index) => (
                    <li key={index}>{t}</li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
