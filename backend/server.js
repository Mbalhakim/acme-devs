const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Maak een nieuwe SQLite database of open een bestaande
const db = new sqlite3.Database('./users.db');

// Maak een users tabel als deze nog niet bestaat
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['demo', 'password']);
});

// Inlogroute
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request:', username, password);
  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ message: 'Internal server error' });
    } else if (row) {
      console.log('Login successful for user:', username);
      res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Invalid credentials for user:', username);
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
