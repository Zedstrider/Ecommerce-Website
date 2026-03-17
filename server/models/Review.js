// server/models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String, 
    required: true,
    trim: true
  },
  isApproved: {
    type: Boolean,
    default: true // Auto-approve for the portfolio demo
  }
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);