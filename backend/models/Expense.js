const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true },
  category: { type: String, enum: ['general', 'non-reimbursable', 'advance'], default: 'general' }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
