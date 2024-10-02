// src/pages/Goals.js
import React, { useEffect, useState } from 'react';
import { saveDataToLocalStorage, loadDataFromLocalStorage } from '../utils/dataStorage';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [goal, setGoal] = useState('');

    useEffect(() => {
        const loadedGoals = loadDataFromLocalStorage('goals') || [];
        setGoals(loadedGoals);
    }, []);

    const addGoal = () => {
        const updatedGoals = [...goals, goal];
        setGoals(updatedGoals);
        saveDataToLocalStorage(updatedGoals, 'goals');
        setGoal('');
    };

    return (
        <div>
            <h1>Your Goals</h1>
            <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Add a new goal" />
            <button onClick={addGoal}>Add Goal</button>
            <h2>Goals List:</h2>
            <ul>
                {goals.map((g, index) => (
                    <li key={index}>{g}</li>
                ))}
            </ul>
        </div>
    );
};

export default Goals;
