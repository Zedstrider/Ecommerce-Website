// server/seeder.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const seedProducts = [
  {
    title: 'Ergonomic Mechanical Keyboard', // Optimized title [cite: 129]
    description: 'A premium mechanical keyboard designed to reduce wrist strain.', // Clear description [cite: 130]
    vendor: 'TechGear',
    productType: 'Electronics',
    tags: ['keyboard', 'workstation', 'ergonomic'],
    price: 129.99, // Pricing & compare price [cite: 133]
    compareAtPrice: 149.99,
    sku: 'TG-KB-001',
    inventory: 50,
    images: ['https://placehold.co/400x400/eee/31343C?text=Keyboard'],
    shippingSnippet: 'Ships in 1-2 business days.'
  },
  // Add 2-4 more products here following the same structure
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany(); // Clear existing
    await Product.insertMany(seedProducts); // Insert new
    console.log('Database Seeded!');
    process.exit();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });