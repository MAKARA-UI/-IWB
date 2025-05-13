const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Sale = require('../models/Sale');

// Add expense
router.post('/', async (req, res) => {
  const expense = new Expense(req.body);
  await expense.save();
  res.json(expense);
});

// Get all expenses
router.get('/', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// Get finance summary
router.get('/summary', async (req, res) => {
  const expenses = await Expense.find();
  const sales = await Sale.find();

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = sales.reduce((sum, s) => sum + s.amount, 0);
  const profit = totalIncome - totalExpenses;

  res.json({ totalIncome, totalExpenses, profit });
});

module.exports = router;
