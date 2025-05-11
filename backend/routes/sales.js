import express from 'express';
import Sale from '../models/Sale.js';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { item, amount, paymentMethod, email, firstName, lastName } = req.body;

  try {
    const product = await Product.findOne({ name: item });
    if (!product || product.quantity < 1) {
      return res.status(400).json({ error: 'Product not available' });
    }

    const sale = new Sale({ item, amount, paymentMethod, email, firstName, lastName });
    await sale.save();

    product.quantity -= 1;
    await product.save();

    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
