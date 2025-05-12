import express from 'express';
import Query from '../models/query.js'; // Use your existing model

const router = express.Router();

// POST /api/queries
router.post('/', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const newQuery = new Query({ question });
    await newQuery.save();

    res.status(201).json({ message: 'Query saved', query: newQuery });
  } catch (err) {
    console.error('Error saving query:', err);
    res.status(500).json({ error: 'Server error while saving query' });
  }
});

// GET /api/queries
router.get('/', async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch queries' });
  }
});

export default router;
