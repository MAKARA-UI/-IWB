const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'iwb_recycling'
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// =======================
// GET /api/products
// =======================
app.get('/api/products', (req, res) => {
  const query = 'SELECT id, name, price FROM products';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});

// =======================
// POST /api/purchase
// =======================
app.post('/api/purchase', (req, res) => {
  const { item, amount, email, firstName, lastName } = req.body;

  if (!item || !amount || !email || !firstName || !lastName) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const query = `
    INSERT INTO purchases (item, amount, email, firstName, lastName, purchase_time)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;
  db.query(query, [item, amount, email, firstName, lastName], (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error on purchase' });
    res.json({ message: 'Purchase submitted', id: result.insertId });
  });
});

// =======================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
