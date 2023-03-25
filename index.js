const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Create an in-memory database
const users = [];

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
  
});


// Get a specific user by id
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// Add a new user
app.post('/users', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(user);
  res.status(201).send(user);
});

// Update a user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');

  user.name = req.body.name;
  user.email = req.body.email;

  res.json(user);
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('User not found');

  users.splice(index, 1);

  res.json({ message: 'User deleted' });
});


// Start the server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));