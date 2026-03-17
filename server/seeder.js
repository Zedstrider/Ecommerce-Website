// server/seeder.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const seedProducts = [
  {
    title: 'Ergonomic Split Mechanical Keyboard',
    description: 'A premium, split-design mechanical keyboard engineered to reduce ulnar deviation and wrist strain during long coding sessions. Features hot-swappable switches and a solid aluminum chassis.',
    vendor: 'TechGear',
    productType: 'Keyboards',
    tags: ['keyboard', 'workstation', 'ergonomic', 'mechanical'],
    price: 189.99,
    compareAtPrice: 220.00,
    sku: 'TG-KB-001',
    inventory: 45,
    images: ['https://placehold.co/600x600/eee/31343C?text=Split+Keyboard'],
    shippingSnippet: 'Ships in 1-2 business days.',
    options: [
      { name: 'Color', values: ['Matte Black', 'Arctic White'] },
      { name: 'Switch Type', values: ['Tactile (Brown)', 'Linear (Red)', 'Clicky (Blue)'] }
    ],
    seo: {
      title: 'Ergonomic Split Mechanical Keyboard | TechGear',
      description: 'Upgrade your workspace with the TechGear split mechanical keyboard. Engineered to reduce wrist strain with hot-swappable switches and an aluminum chassis.'
    }
  },
  {
    title: 'High-Fidelity ANC Studio Headphones',
    description: 'Achieve absolute focus. These over-ear headphones deliver studio-grade audio quality combined with active noise cancellation to drown out office chatter and background distractions.',
    vendor: 'AuraAudio',
    productType: 'Audio',
    tags: ['headphones', 'audio', 'focus', 'wireless'],
    price: 249.99,
    compareAtPrice: 299.99,
    sku: 'AA-HP-002',
    inventory: 30,
    images: ['https://placehold.co/600x600/eee/31343C?text=ANC+Headphones'],
    shippingSnippet: 'Free standard shipping.',
    options: [
      { name: 'Color', values: ['Midnight Black', 'Lunar Silver'] }
    ],
    seo: {
      title: 'High-Fidelity ANC Studio Headphones | TechGear',
      description: 'Block out distractions with our High-Fidelity ANC Studio Headphones. Enjoy premium active noise cancellation and studio-grade audio for deep focus.'
    }
  },
  {
    title: 'Premium Merino Wool Desk Mat',
    description: 'Add warmth and texture to your minimal setup. This dense merino wool blend protects your desk surface while providing a smooth glide for your mouse.',
    vendor: 'TechGear',
    productType: 'Accessories',
    tags: ['desk', 'mat', 'minimalist', 'accessories', 'bestseller'],
    price: 35.00,
    compareAtPrice: null,
    sku: 'TG-DM-003',
    inventory: 120,
    images: ['https://placehold.co/600x600/eee/31343C?text=Wool+Desk+Mat'],
    shippingSnippet: 'Ships in 2-3 business days.',
    options: [
      { name: 'Size', values: ['Medium (31" x 11")', 'Large (35" x 15")'] },
      { name: 'Color', values: ['Dark Grey', 'Light Ash'] }
    ],
    seo: {
      title: 'Premium Merino Wool Desk Mat | TechGear',
      description: 'Protect your desk and enjoy a smooth mouse glide with the TechGear Merino Wool Desk Mat. A minimal, high-quality accessory for any professional workspace.'
    }
  },
  {
    title: 'Wireless Productivity Mouse',
    description: 'Sculpted for the human hand. Features a precision electromagnetic scroll wheel, customizable thumb buttons, and multi-device seamless switching.',
    vendor: 'LogiCraft',
    productType: 'Mice',
    tags: ['mouse', 'wireless', 'ergonomic', 'productivity', 'new'],
    price: 99.99,
    compareAtPrice: null,
    sku: 'LC-MS-004',
    inventory: 85,
    images: ['https://placehold.co/600x600/eee/31343C?text=Wireless+Mouse'],
    shippingSnippet: 'Ships in 1-2 business days.',
    options: [
      { name: 'Color', values: ['Graphite', 'Pale Grey'] }
    ],
    seo: {
      title: 'Ergonomic Wireless Productivity Mouse | TechGear',
      description: 'Maximize your workflow with our Wireless Productivity Mouse. Featuring an electromagnetic scroll wheel, custom buttons, and seamless multi-device switching.'
    }
  }
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