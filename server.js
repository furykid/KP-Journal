const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
let JournalEntry = require('./models/JournalEntryModel');

app.use(cors());
app.use(express.json());

const PORT = 4000;
const DB_URI =
  'mongodb+srv://testUser:testuser@cluster0.gmfbh.mongodb.net/KiloProDB';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('connected to mongo db');
});

app.use('/', require('./routes/journalEntryRoute'));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...`);
});
