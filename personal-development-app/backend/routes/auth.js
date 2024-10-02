const express = require('express');
const router = express.Router();
const { loadData, saveData } = require('../utils/dataStorage');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // In a real app, use an environment variable

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await loadData();
    
    if (data.users.find(user => user.username === username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), username, password: hashedPassword };
    data.users.push(newUser);
    await saveData(data);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const data = await loadData();
    const user = data.users.find(user => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;