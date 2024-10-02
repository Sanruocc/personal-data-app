const express = require('express');
const router = express.Router();
const { loadData, saveData } = require('../utils/dataStorage');

router.get('/', async (req, res) => {
  try {
    const data = await loadData();
    res.json(data.notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await loadData();
    const newNote = {
      id: Date.now().toString(),
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date().toISOString()
    };
    data.notes.push(newNote);
    await saveData(data);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await loadData();
    const noteIndex = data.notes.findIndex(note => note.id === req.params.id);
    if (noteIndex > -1) {
      data.notes[noteIndex] = { ...data.notes[noteIndex], ...req.body };
      await saveData(data);
      res.json(data.notes[noteIndex]);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating note' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await loadData();
    data.notes = data.notes.filter(note => note.id !== req.params.id);
    await saveData(data);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note' });
  }
});

module.exports = router;