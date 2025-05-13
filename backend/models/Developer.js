const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String, // hash in production
});

module.exports = mongoose.model('Developer', developerSchema);
