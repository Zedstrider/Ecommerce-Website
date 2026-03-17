// server/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assuming you saved the schema from Day 1 here

// @desc    Fetch all products
// @route   GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching products' });
  }
});

// @desc    Search products by keyword
// @route   GET /api/products/search?q=keyword
router.get('/search', async (req, res) => {
  try {
    const keyword = req.query.q;
    
    // If no keyword is provided, return an empty array
    if (!keyword) {
      return res.json([]);
    }

    // Search across title, description, and tags
    const query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } }, // 'i' makes it case-insensitive
        { description: { $regex: keyword, $options: 'i' } },
        { tags: { $regex: keyword, $options: 'i' } },
        { vendor: { $regex: keyword, $options: 'i' } }
      ]
    };

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error during search' });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching product' });
  }
});

module.exports = router;