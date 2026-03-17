// server/models/Discount.js
const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  code: { 
    type: String, 
    required: true, 
    unique: true, 
    uppercase: true, // Forces codes like 'save20' to 'SAVE20'
    trim: true 
  },
  type: { 
    type: String, 
    enum: ['percentage', 'fixed', 'free_shipping', 'bogo'], 
    required: true 
  },
  value: { 
    type: Number, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Discount', discountSchema);