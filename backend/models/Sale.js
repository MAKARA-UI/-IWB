const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  item: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  email: String,
  firstName: String,
  lastName: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', saleSchema);
