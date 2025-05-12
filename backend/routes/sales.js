const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Revenue = require('../models/Revenue');

router.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // 1. Validate product exists
    const product = await Product.findOne({ name: req.body.item }).session(session);
    if (!product) {
      throw new Error('Product not found');
    }

    // 2. Check stock
    if (product.stock < 1) {
      throw new Error('Insufficient stock');
    }

    // 3. Update product stock
    product.stock -= 1;
    await product.save({ session });

    // 4. Update revenue
    const revenue = await Revenue.findOneAndUpdate(
      {},
      { $inc: { total: req.body.amount } },
      { upsert: true, new: true, session }
    );

    // 5. Create sale record
    const sale = new Sale({
      item: req.body.item,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
    const savedSale = await sale.save({ session });

    // Commit transaction
    await session.commitTransaction();
    
    res.status(201).json({
      success: true,
      product: product.name,
      newStock: product.stock,
      revenue: revenue.total,
      sale: savedSale
    });

  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction Error:', error);
    res.status(400).json({ 
      success: false,
      error: error.message,
      item: req.body.item,
      amount: req.body.amount
    });
  } finally {
    session.endSession();
  }
});

module.exports = router;
