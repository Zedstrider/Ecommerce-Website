// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('E-commerce API is running');
});

// We will import and use product routes here in the next step
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

const discountRoutes = require('./routes/discountRoutes');
app.use('/api/discounts', discountRoutes);

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});