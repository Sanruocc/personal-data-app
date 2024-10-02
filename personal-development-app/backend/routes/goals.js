const express = require('express');
const router = express.Router();
const { loadData, saveData } = require('../utils/dataStorage');

router.get('/', async (req, res) => {
  try {
    const data = await loadData();
    res.json(data.goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await loadData();
    const newGoal = {
      id: Date.now().toString(),
      title: req.body.title,
      description: req.body.description,
      completed: false,
      createdAt: new Date().toISOString()
    };
    data.goals.push(newGoal);
    await saveData(data);
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating goal' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await loadData();
    const goalIndex = data.goals.findIndex(goal => goal.id === req.params.id);
    if (goalIndex > -1) {
      data.goals[goalIndex] = { ...data.goals[goalIndex], ...req.body };
      await saveData(data);
      res.json(data.goals[goalIndex]);
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await loadData();
    data.goals = data.goals.filter(goal => goal.id !== req.params.id);
    await saveData(data);
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal' });
  }
});

module.exports = router;