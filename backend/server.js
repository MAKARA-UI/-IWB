require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');

const saleRoutes = require('./routes/sales');    
const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

console.log('→ MONGO_URI =', process.env.MONGO_URI);
console.log('→ PORT      =', process.env.PORT);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Mongo connection error:', err));


app.use('/api/sales', saleRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
