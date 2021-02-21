const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let JournalEntry = new Schema({
  date: {
    type: String,
  },
  userId: {
    type: String,
  },
  tag: {
    type: String,
  },
  weightFormat: {
    type: String,
  },
  sleep: {
    type: Number,
  },
  calories: {
    type: Number,
  },
  notes: {
    type: String,
  },
  exercises: {
    type: Array,
  },
});

module.exports = mongoose.model('JournalEntry', JournalEntry);
