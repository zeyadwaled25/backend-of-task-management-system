const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line to import cors
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000; // Use the environment variable PORT or default to 3000

const uri = process.env.MONGODB_URI; // Use an environment variable for the MongoDB URI

// Add CORS middleware before other middleware and routes
app.use(cors({
  origin: 'http://localhost:5173', // Your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

mongoose.connect(uri)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

const listRoutes = require('./routes/lists');
const taskRoutes = require('./routes/tasks');

app.use('/routes/lists', listRoutes);
app.use('/routes/tasks', taskRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));