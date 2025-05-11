// salesRoutes.js
import express from 'express';
import { check, validationResult } from 'express-validator';
import Product from '../models/Product.js';
import Query from '../models/Query.js';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Salesperson authentication
router.post('/login', [
  check('email').isEmail(),
  check('password').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const user = await User.findOne({ 
      email: req.body.email,
      role: 'sales',
      isActive: true
    });
    
    if (!user || !(await user.matchPassword(req.body.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check sales user limit
    const salesCount = await User.countDocuments({ role: 'sales' });
    if (salesCount > 3) {
      return res.status(403).json({ message: 'Maximum sales users reached' });
    }

    const token = user.generateAuthToken();
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Product management
router.get('/products', authMiddleware('sales'), async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Query auto-responder
router.post('/queries/auto-respond', authMiddleware('sales'), async (req, res) => {
  try {
    const newQuery = req.body;
    const pastQueries = await Query.find();
    
    // Simple similarity check (can be enhanced with NLP)
    const similarQuery = pastQueries.find(q => 
      q.question.toLowerCase().includes(newQuery.question.toLowerCase().split(' ')[0])
    );

    if (similarQuery) {
      newQuery.response = similarQuery.response;
      newQuery.status = 'complete';
      newQuery.autoResponded = true;
    }

    const query = new Query(newQuery);
    await query.save();
    res.json(query);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

export default router;