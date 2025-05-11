// backend/routes/purchase.js
const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');

router.post('/', async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    const saved = await purchase.save();
    console.log('Purchase saved:', saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving purchase:', err);
    res.status(500).json({ error: 'Failed to save purchase' });
  }
});

module.exports = router;
