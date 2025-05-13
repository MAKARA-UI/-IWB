const express = require('express');
const router = express.Router();
const Developer = require('../models/Developer');
const fs = require('fs');
const path = require('path');

// Middleware: limit access to only 3 devs
router.use(async (req, res, next) => {
  const devs = await Developer.find();
  if (devs.length > 3) {
    return res.status(403).json({ message: 'Developer access limit exceeded' });
  }
  next();
});

// GET list of files
router.get('/files', async (req, res) => {
  const dir = path.join(__dirname, '../dev_files'); // assume all editable files are here
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Cannot read files' });
    res.json({ files });
  });
});

// GET file content
router.get('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../dev_files', req.params.filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).json({ error: 'File not found' });
    res.json({ content: data });
  });
});

// POST update file
router.post('/files/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../dev_files', req.params.filename);
  fs.writeFile(filePath, req.body.content, 'utf8', (err) => {
    if (err) return res.status(500).json({ error: 'Write failed' });
    res.json({ message: 'File updated successfully' });
  });
});

module.exports = router;
