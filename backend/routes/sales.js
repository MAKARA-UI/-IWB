const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Revenue = require('../models/Revenue');

// Handle a new sale and update stock & revenue
router.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { item, amount, paymentMethod, email, firstName, lastName } = req.body;

    const product = await Product.findOne({ name: item }).session(session);
    if (!product) throw new Error('Product not found');
    if (product.stock < 1) throw new Error('Insufficient stock');

    // Update product stock
    product.stock -= 1;
    await product.save({ session });

    // Update revenue
    const revenue = await Revenue.findOneAndUpdate(
      {},
      { $inc: { total: amount } },
      { upsert: true, new: true, session }
    );

    // Record sale
    const sale = new Sale({ item, amount, paymentMethod, email, firstName, lastName });
    const savedSale = await sale.save({ session });

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

// GET: Daily / Weekly / Monthly sales summary
router.get('/summary', async (req, res) => {
  const type = req.query.type || 'monthly';

  let groupBy;
  if (type === 'daily') {
    groupBy = {
      year: { $year: "$date" },
      month: { $month: "$date" },
      day: { $dayOfMonth: "$date" }
    };
  } else if (type === 'weekly') {
    groupBy = {
      year: { $year: "$date" },
      week: { $isoWeek: "$date" }
    };
  } else {
    groupBy = {
      year: { $year: "$date" },
      month: { $month: "$date" }
    };
  }

  try {
    const result = await Sale.aggregate([
      { $group: {
          _id: groupBy,
          revenue: { $sum: "$amount" },
          units: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const formatted = result.map(entry => {
      let label = '';
      if (type === 'daily') {
        label = `${entry._id.year}-${String(entry._id.month).padStart(2, '0')}-${String(entry._id.day).padStart(2, '0')}`;
      } else if (type === 'weekly') {
        label = `Week ${entry._id.week}, ${entry._id.year}`;
      } else {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                        "Aug", "Sep", "Oct", "Nov", "Dec"];
        label = `${months[entry._id.month - 1]} ${entry._id.year}`;
      }

      return {
        label,
        revenue: entry.revenue,
        units: entry.units
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error('Summary Fetch Error:', err);
    res.status(500).json({ error: 'Failed to get sales summary' });
  }
});

module.exports = router;
