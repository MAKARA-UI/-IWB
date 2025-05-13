const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String
  },
  message: {
    type: String,
    required: true
  },
  response: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'complete'],
    default: 'pending'
  },
  autoResponded: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Query', querySchema);
