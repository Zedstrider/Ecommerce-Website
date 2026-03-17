const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Optimized title 
  description: { type: String, required: true }, // Clear description with benefits + features 
  vendor: { type: String, required: true }, // For filters + collections 
  productType: { type: String, required: true }, // For filters + collections 
  tags: [{ type: String }], // For filters + collections 
  price: { type: Number, required: true }, // Pricing 
  compareAtPrice: { type: Number }, // Compare price for discounts 
  sku: { type: String, required: true }, // SKU setup 
  inventory: { type: Number, default: 0 }, // Inventory setup 
  images: [{ type: String }], // Proper images (URLs from your storage bucket) 
  shippingSnippet: { type: String }, // Short line: processing + delivery estimate 
  options: [{
    name: { type: String, required: true }, // e.g., "Color" or "Size"
    values: [{ type: String, required: true }] // e.g., ["Black", "White"]
  }],
  seo: {
    title: { type: String },
    description: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);