const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// 1. Health check endpoint (Clean pattern)
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 2. Reflected XSS pattern demonstration (for Veracode SAST testing)
router.get('/greet', (req, res) => {
  const name = req.query.name || 'Guest';
  // Directly sending unescaped user input into HTML response
  res.send(`<h1>Hello, ${name}!</h1>`);
});

// 3. Command / Code Injection demonstration pattern
router.get('/eval', (req, res) => {
  const code = req.query.code;
  if (code) {
    try {
      // Intentional vulnerable pattern for SAST detection
      const result = eval(code);
      return res.json({ result });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  res.json({ message: 'Provide ?code= parameter to evaluate' });
});

// 4. Path Traversal demonstration pattern
router.get('/read-file', (req, res) => {
  const fileName = req.query.file;
  if (!fileName) {
    return res.status(400).json({ error: 'file query parameter required' });
  }

  // Constructing path directly from user input without validation/sanitization
  const filePath = path.join(__dirname, '../../data', fileName);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'File not found or inaccessible' });
    }
    res.type('text/plain').send(data);
  });
});

// 5. Insecure Direct Object Reference / Mock SQL Injection pattern
router.get('/users', (req, res) => {
  const username = req.query.username || '';
  // Raw concatenation pattern often flagged by SAST rules
  const query = `SELECT * FROM users WHERE username = '${username}' AND is_active = 1`;
  
  res.json({
    message: 'Executed mock query',
    generatedQuery: query,
  });
});

module.exports = router;
