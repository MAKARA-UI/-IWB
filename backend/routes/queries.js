const express = require('express');
const natural = require('natural');
const Query = require('../models/query');

const router = express.Router();
const threshold = 0.6; // adjust as needed for similarity

// Helper function to find a similar query
async function findSimilarQuery(message) {
  const tokenizer = new natural.WordTokenizer();
  const tfidf = new natural.TfIdf();

  const pastQueries = await Query.find({ response: { $ne: '' } });

  pastQueries.forEach(q => {
    tfidf.addDocument(tokenizer.tokenize(q.message.toLowerCase()));
  });

  const inputTokens = tokenizer.tokenize(message.toLowerCase());
  let bestMatch = null;
  let bestScore = 0;

  pastQueries.forEach((q, index) => {
    const score = tfidf.tfidf(inputTokens.join(' '), index);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = q;
    }
  });

  return bestScore > threshold ? bestMatch : null;
}

// POST /api/queries
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    let autoResponse = null;
    let status = 'pending';
    let autoResponded = false;

    const match = await findSimilarQuery(message);
    if (match) {
      autoResponse = match.response;
      status = 'complete';
      autoResponded = true;
    }

    const newQuery = new Query({
      name,
      email,
      subject,
      message,
      response: autoResponse || '',
      status,
      autoResponded
    });

    await newQuery.save();

    res.status(201).json({
      message: autoResponded ? 'Query auto-responded' : 'Query saved',
      query: newQuery
    });
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

// PATCH /api/queries/:id/respond (manual response by sales)
router.patch('/:id/respond', async (req, res) => {
  try {
    const { response } = req.body;
    const updated = await Query.findByIdAndUpdate(
      req.params.id,
      { response, status: 'complete', autoResponded: false },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to respond to query' });
  }
});

module.exports = router;
