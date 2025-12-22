// backend/index.js
const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: Date.now(), ...req.body };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.map(t => t.id === id ? { ...t, ...req.body } : t);
  res.json(tasks.find(t => t.id === id));
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
