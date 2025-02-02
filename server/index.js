const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your frontend
app.use(cors({
  origin: ['http://localhost:5173', 'https://app-quizzzer.netlify.app']
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Proxy endpoint for quiz data
app.get('/api/quiz/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.jsonserve.com/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 