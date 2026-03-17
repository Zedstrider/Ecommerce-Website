// server/seedDiscounts.js
require('dotenv').config();
const mongoose = require('mongoose');
const Discount = require('./models/Discount');

const seedDiscounts = [
  {
    code: 'SAVE20',
    type: 'percentage',
    value: 20,
    isActive: true
  },
  {
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 0,
    isActive: true
  },
  {
    code: 'MINUS15',
    type: 'fixed',
    value: 15, // $15 off
    isActive: true
  },
  {
    code: 'BOGOFREE',
    type: 'bogo',
    value: 100, // 100% off the second item
    isActive: true
  },
  {
    code: 'BOGO50',
    type: 'bogo',
    value: 50, // 50% off the second item
    isActive: true
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Clear existing discounts to prevent duplication errors
    await Discount.deleteMany(); 
    
    // Insert the new codes
    await Discount.insertMany(seedDiscounts); 
    
    console.log('Discount Codes Seeded Successfully!');
    process.exit();
  })
  .catch((error) => {
    console.error('Error seeding discounts:', error);
    process.exit(1);
  });