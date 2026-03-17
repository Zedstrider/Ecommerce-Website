// server/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// @desc    Get all approved reviews for a specific product
// @route   GET /api/reviews/:productId
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ 
      product: req.params.productId, 
      isApproved: true 
    }).sort({ createdAt: -1 }); // Newest first
    
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching reviews' });
  }
});

// @desc    Submit a new review
// @route   POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { product, name, rating, comment } = req.body;
    
    const newReview = await Review.create({
      product,
      name,
      rating: Number(rating),
      comment
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error submitting review' });
  }
});

module.exports = router;