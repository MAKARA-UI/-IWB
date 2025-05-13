const express = require('express');
const router = express.Router();
const Income = require('../models/Income');
const { verifyRole } = require('../middleware/auth'); // Role middleware

// GET all income entries (finance role only)
router.get('/', verifyRole(['finance']), async (req, res) => {
  try {
    const incomes = await Income.find().sort({ date: -1 });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch income records' });
  }
});

// POST new income entry
router.post('/', verifyRole(['finance']), async (req, res) => {
  try {
    const { description, amount, date } = req.body;
    const newIncome = new Income({ description, amount, date: date || new Date() });
    const saved = await newIncome.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save income' });
  }
});

// PUT (edit income)
router.put('/:id', verifyRole(['finance']), async (req, res) => {
  try {
    const updated = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update income' });
  }
});

// DELETE income entry
router.delete('/:id', verifyRole(['finance']), async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete income' });
  }
});

module.exports = router;
