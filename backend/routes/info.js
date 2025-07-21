const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    name: 'TMK Event Locator',
    version: '1.0.0',
    author: 'Zia',
    description: 'Backend helper for showing system info'
  });
});

module.exports = router;
//Add new info route at /api/info
