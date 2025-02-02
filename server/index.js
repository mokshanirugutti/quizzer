const express = require('express');
const cors = require('cors');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your frontend
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Quiz API is running' });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Proxy endpoint for quiz data
app.get('/api/quiz/:id', async (req, res) => {
  try {
    console.log(`Fetching quiz data for ID: ${req.params.id}`);
    const { id } = req.params;
    const response = await axios.get(`https://api.jsonserve.com/${id}`);
    console.log('Quiz data fetched successfully');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching quiz data:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Current timestamp: ${new Date().toISOString()}`);
}); 