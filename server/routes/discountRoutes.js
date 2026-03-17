// server/routes/discountRoutes.js
const express = require('express');
const router = express.Router();
const Discount = require('../models/Discount');

// @desc    Validate a discount code
// @route   POST /api/discounts/validate
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;
    
    // Find the code and ensure it is currently active
    const discount = await Discount.findOne({ code: code.toUpperCase(), isActive: true });
    
    if (!discount) {
      return res.status(404).json({ message: 'Invalid or expired discount code.' });
    }
    
    res.json(discount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error validating discount.' });
  }
});

module.exports = router;