// client/src/components/product/ProductBadge.jsx
import React from 'react';

const ProductBadge = ({ product }) => {
  const badges = [];

  // 1. Calculate "Sale" and exact percentage off
  if (product.compareAtPrice && product.compareAtPrice > product.price) {
    const discount = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
    badges.push(
      <span key="sale" className="badge bg-danger d-block mb-1 shadow-sm px-2 py-1">
        Save {discount}%
      </span>
    );
  }

  // 2. Evaluate MongoDB tags for "Bestseller" or "New"
  if (product.tags) {
    // We convert tags to lowercase to ensure case-insensitive matching
    const lowercaseTags = product.tags.map(tag => tag.toLowerCase());
    
    if (lowercaseTags.includes('bestseller')) {
      badges.push(
        <span key="bestseller" className="badge bg-dark d-block mb-1 shadow-sm px-2 py-1">
          Best Seller
        </span>
      );
    } else if (lowercaseTags.includes('new')) {
      badges.push(
        <span key="new" className="badge bg-primary d-block mb-1 shadow-sm px-2 py-1">
          New Arrival
        </span>
      );
    }
  }

  // If the product has no sale or special tags, render nothing
  if (badges.length === 0) return null;

  return (
    <div className="position-absolute top-0 start-0 p-2" style={{ zIndex: 2, pointerEvents: 'none' }}>
      {badges}
    </div>
  );
};

export default ProductBadge;