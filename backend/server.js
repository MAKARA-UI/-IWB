// backend/server.js
require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const purchaseRoutes = require('./routes/purchase');

const app = express();
app.use(cors());
app.use(express.json());

console.log('→ MONGO_URI =', process.env.MONGO_URI);
console.log('→ PORT      =', process.env.PORT);

mongoose
  .connect(process.env.MONGO_URI)      // no options needed in Mongoose >=6
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Mongo connection error:', err));

app.use('/api/purchase', purchaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
