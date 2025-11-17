require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

connectDB();

// Import Routes
const medicinesRouter = require('./routes/medicines');
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders');

// Root Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Online Medicine Store Backend API', 
    version: '1.0.0',
    endpoints: {
      medicines: '/api/medicines',
      auth: '/api/auth',
      orders: '/api/orders',
      health: '/api/health'
    }
  });
});

// Routes
app.use('/api/medicines', medicinesRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', ordersRouter);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend is running', 
    mongoConnection: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see API information`);
});
