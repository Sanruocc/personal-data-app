const express = require('express');
const router = express.Router();
const { loadData, saveData } = require('../utils/dataStorage');

router.get('/', async (req, res) => {
  try {
    const data = await loadData();
    res.json(data.transactions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await loadData();
    const newTransaction = {
      id: Date.now().toString(),
      amount: req.body.amount,
      description: req.body.description,
      date: req.body.date || new Date().toISOString(),
      category: req.body.category
    };
    data.transactions.push(newTransaction);
    await saveData(data);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await loadData();
    const transactionIndex = data.transactions.findIndex(transaction => transaction.id === req.params.id);
    if (transactionIndex > -1) {
      data.transactions[transactionIndex] = { ...data.transactions[transactionIndex], ...req.body };
      await saveData(data);
      res.json(data.transactions[transactionIndex]);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating transaction' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await loadData();
    data.transactions = data.transactions.filter(transaction => transaction.id !== req.params.id);
    await saveData(data);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting transaction' });
  }
});

module.exports = router;