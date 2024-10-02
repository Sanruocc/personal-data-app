// src/pages/SocialData.js
import React, { useState, useEffect } from 'react';
import { saveDataToLocalStorage, loadDataFromLocalStorage } from '../utils/dataStorage'; // Import utility functions

const SocialData = () => {
    const [people, setPeople] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [place, setPlace] = useState('');
    const [interests, setInterests] = useState('');

    useEffect(() => {
        loadPeople(); // Load existing people from localStorage
    }, []);

    const loadPeople = () => {
        const data = loadDataFromLocalStorage('people');
        if (data) setPeople(data);
    };

    const addPerson = () => {
        const newPerson = { name, age, place, interests };
        const updatedPeople = [...people, newPerson];
        setPeople(updatedPeople);
        saveDataToLocalStorage(updatedPeople, 'people');
        setName('');
        setAge('');
        setPlace('');
        setInterests('');
    };

    return (
        <div>
            <h1>Social Data</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <input type="text" placeholder="Place" value={place} onChange={(e) => setPlace(e.target.value)} />
            <input type="text" placeholder="Interests" value={interests} onChange={(e) => setInterests(e.target.value)} />
            <button onClick={addPerson}>Add Person</button>
            <h2>People List:</h2>
            <ul>
                {people.map((person, index) => (
                    <li key={index}>
                        <strong>{person.name}</strong> | Age: {person.age} | Place: {person.place} | Interests: {person.interests}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SocialData;
