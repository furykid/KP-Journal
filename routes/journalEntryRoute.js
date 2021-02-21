const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntryModel');

router.route('/createEntry').post((req, res) => {
  console.log(`userId = ${req.body.userId}`);
  const date = req.body.date;
  const userId = req.body.userId;
  const tag = req.body.tag;
  const weightFormat = req.body.weightFormat;
  const sleep = req.body.sleep;
  const calories = req.body.calories;
  const notes = req.body.notes;
  const exercises = req.body.exercises;

  const newJournalEntry = new JournalEntry({
    date,
    userId,
    tag,
    weightFormat,
    sleep,
    calories,
    notes,
    exercises,
  });

  newJournalEntry.save();
});

router.route('/journalEntries/:userId').get((req, res) => {
  const uId = req.params.userId;
  JournalEntry.find({ userId: uId }).then((foundEntries) =>
    res.json(foundEntries)
  );
});

module.exports = router;
