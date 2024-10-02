const express = require('express');
const router = express.Router();
const { loadData, saveData } = require('../utils/dataStorage');

router.get('/', async (req, res) => {
  try {
    const data = await loadData();
    res.json(data.social);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching social data' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await loadData();
    const newContact = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      createdAt: new Date().toISOString()
    };
    data.social.push(newContact);
    await saveData(data);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await loadData();
    const contactIndex = data.social.findIndex(contact => contact.id === req.params.id);
    if (contactIndex > -1) {
      data.social[contactIndex] = { ...data.social[contactIndex], ...req.body };
      await saveData(data);
      res.json(data.social[contactIndex]);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await loadData();
    data.social = data.social.filter(contact => contact.id !== req.params.id);
    await saveData(data);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

module.exports = router;