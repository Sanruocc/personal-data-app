const express = require('express');
const router = express.Router();
const { loadData } = require('../utils/dataStorage');
const { parseQuestion } = require('../utils/qnaParser');

router.post('/', async (req, res) => {
  try {
    const { question } = req.body;
    const data = await loadData();
    const answer = parseQuestion(question, data);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ message: 'Error processing question' });
  }
});

module.exports = router;