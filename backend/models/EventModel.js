const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true,
    trim: true
  },
  location_zip: {
    type: String,
    required: true,
    match: [/^\\d{5}$/, 'Zip code must be 5 digits']
  },
  date: {
    type: Date,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['English', 'Spanish', 'Urdu', 'Chinese', 'Other']
  },
  instructor: {
    type: String,
    default: 'TBD'
  },
  type: {
    type: String,
    required: true,
    enum: ['Workshop', 'Seminar', 'Drop-in Help']
  }
});

module.exports = mongoose.model('Event', EventSchema);

Enhance EventModel with validation and enums
