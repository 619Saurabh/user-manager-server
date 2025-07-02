const express = require('express');
const cors = require('cors');

const app = express();
// const PORT = 5000;
const PORT = process.env.PORT || 5000

// app.use(cors());
app.use(cors({ origin: 'https://bishtusermanager.netlify.app' }));
app.use(express.json());

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
];

app.get('/', (req, res) => {
  res.send('API Server is running...');
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Add a user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: Date.now(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});


// Delete a user
app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(user => user.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
