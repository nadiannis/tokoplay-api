require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectToDb = require('./config/db');

const PORT = process.env.PORT || 8080;
const app = express();

connectToDb();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'API is running' });
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
