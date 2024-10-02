import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { getNotes, createNote, updateNote, deleteNote } from '../utils/api';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const createdNote = await createNote(newNote);
      setNotes([...notes, createdNote]);
      setNewNote({ title: '', content: '' });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    try {
      const updatedNote = await updateNote(editingNote.id, editingNote);
      setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
      setEditingNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleSearch = (query) => {
    // Implement search logic here
    console.log('Searching for:', query);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Notes</h1>
      <SearchBar onSearch={handleSearch} />
      <form onSubmit={editingNote ? handleUpdateNote : handleCreateNote} className="mb-6">
        <input
          type="text"
          placeholder="Note title"
          value={editingNote ? editingNote.title : newNote.title}
          onChange={(e) => editingNote ? setEditingNote({...editingNote, title: e.target.value}) : setNewNote({...newNote, title: e.target.value})}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Note content"
          value={editingNote ? editingNote.content : newNote.content}
          onChange={(e) => editingNote ? setEditingNote({...editingNote, content: e.target.value}) : setNewNote({...newNote, content: e.target.value})}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {editingNote ? 'Update Note' : 'Add Note'}
        </button>
      </form>
      <div className="space-y-4">
        {notes.map(note => (
          <div key={note.id} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-4">{note.content}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingNote(note)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;