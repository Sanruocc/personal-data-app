// src/pages/Notes.js
import React, { useEffect, useState } from 'react';
import { saveDataToLocalStorage, loadDataFromLocalStorage } from '../utils/dataStorage';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState('');

    useEffect(() => {
        const loadedNotes = loadDataFromLocalStorage('notes') || [];
        setNotes(loadedNotes);
    }, []);

    const addNote = () => {
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
        saveDataToLocalStorage(updatedNotes, 'notes');
        setNote('');
    };

    return (
        <div>
            <h1>Your Daily Notes</h1>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Write your note here" />
            <button onClick={addNote}>Add Note</button>
            <h2>Notes List:</h2>
            <ul>
                {notes.map((n, index) => (
                    <li key={index}>{n}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notes;
