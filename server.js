const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: 'Saurabh Bisht', email: 'saurabh123@yahoo.com' },
];

app.get('/', (req, res) => {
  res.send('Server is running...');
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

//Edit a user
app.put('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  // Find the user
  const userIndex = users.findIndex((user) => user.id === id);

  // // If user not found
  // if (userIndex === -1) {
  //   return res.status(404).json({ error: 'User not found' });
  // }

  // Update the user
  users[userIndex] = { ...users[userIndex], name, email };

  // Return updated user
  res.status(200).json(users[userIndex]);
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.filter((user) => user.id !== id);
  res.status(204).send();
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });



module.exports = app;
