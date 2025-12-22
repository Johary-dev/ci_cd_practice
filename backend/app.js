// backend/index.js
const express = require('express');
const app = express();

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Stockage des tâches en mémoire
// Format: { id: number, name: string }
let tasks = [];

app.get('/tasks', (req, res) => {
  console.log('GET /tasks',JSON.stringify(tasks,null,2));
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { name } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Le champ "name" est requis et doit être une chaîne de caractères' });
  }
  
  const task = { 
    id: Date.now(), 
    name: name 
  };
  
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Le champ "name" est requis et doit être une chaîne de caractères' });
  }
  
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tâche non trouvée' });
  }
  
  tasks[taskIndex] = { id, name };
  res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  
  if (tasks.length === initialLength) {
    return res.status(404).json({ error: 'Tâche non trouvée' });
  }
  
  res.status(204).send();
});

// Pour réinitialiser les données avant chaque test
app.resetTasks = () => { tasks = []; };

module.exports = app;