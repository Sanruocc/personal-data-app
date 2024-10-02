// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { loadDataFromLocalStorage } from '../utils/dataStorage';

const Home = () => {
    const [goals, setGoals] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const loadedGoals = loadDataFromLocalStorage('goals') || [];
        const loadedTasks = loadDataFromLocalStorage('tasks') || [];
        const loadedNotes = loadDataFromLocalStorage('notes') || [];
        setGoals(loadedGoals);
        setTasks(loadedTasks);
        setNotes(loadedNotes);
    }, []);

    return (
        <div className="home-container">
            <h1>Welcome to Your Personal Development App</h1>

            <div className="section">
                <h2>Your Goals</h2>
                {goals.length > 0 ? (
                    <ul>
                        {goals.map((goal, index) => (
                            <li key={index}>{goal}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No goals tracked.</p>
                )}
            </div>

            <div className="section">
                <h2>Your Tasks</h2>
                {tasks.length > 0 ? (
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks in your to-do list.</p>
                )}
            </div>

            <div className="section">
                <h2>Your Daily Notes</h2>
                {notes.length > 0 ? (
                    <ul>
                        {notes.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No notes recorded.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
