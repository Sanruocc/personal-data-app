const express = require('express');
const router = express.Router();
const { loadData, saveData } = require('../utils/dataStorage');

router.get('/', async (req, res) => {
  try {
    const data = await loadData();
    res.json(data.tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await loadData();
    const newTask = {
      id: Date.now().toString(),
      title: req.body.title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    data.tasks.push(newTask);
    await saveData(data);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await loadData();
    const taskIndex = data.tasks.findIndex(task => task.id === req.params.id);
    if (taskIndex > -1) {
      data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...req.body };
      await saveData(data);
      res.json(data.tasks[taskIndex]);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await loadData();
    data.tasks = data.tasks.filter(task => task.id !== req.params.id);
    await saveData(data);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;