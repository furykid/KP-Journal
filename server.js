const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const uri = ''

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(3004, () => {
  console.log('server running on port 3004...');
});
