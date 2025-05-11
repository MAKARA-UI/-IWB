// backend/models/Purchase.js
const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  item: String,
  amount: Number,
  paymentMethod: String,
  email: String,
  firstName: String,
  lastName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
