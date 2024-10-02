const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const goalsRoutes = require('./routes/goals');
const tasksRoutes = require('./routes/tasks');
const notesRoutes = require('./routes/notes');
const socialRoutes = require('./routes/social');
const transactionsRoutes = require('./routes/transactions');
const qnaRoutes = require('./routes/qna');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/goals', goalsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/transactions', transactionsRoutes);
app.use('/api/qna', qnaRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});