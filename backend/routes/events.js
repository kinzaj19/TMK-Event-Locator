const express = require('express');
const router = express.Router();
const { filterEvents } = require('../controllers/filterEvents');

// GET /api/events?zip=…&type=…&language=…&startDate=…&endDate=…
router.get('/', (req, res) => {
  try {
    const results = filterEvents(req.query);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No events found matching your filters.' });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error filtering events:', error);
    res.status(500).json({ error: 'Internal server error while filtering events.' });
  }
});

module.exports = router;

Add error handling to events API route
