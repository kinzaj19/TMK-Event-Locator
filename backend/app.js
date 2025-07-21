const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const eventsRoute = require('./routes/events');
const infoRoute = require('./routes/info'); // ✅ your own route!

app.use('/api/events', eventsRoute);
app.use('/api/info', infoRoute);

// Root route
app.get('/', (req, res) => {
  res.send('TMK Backend Server is Running!');
});

module.exports = app;
//Set up main Express app in app.js

