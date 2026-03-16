// client/src/components/home/ProductHighlights.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductHighlights = () => {
  return (
    <section className="bg-dark text-white py-5">
      <div className="container py-4 text-center">
        <h2 className="fw-bold mb-3">Meet The Pro Series</h2>
        <p className="mb-4 mx-auto" style={{ maxWidth: '600px' }}>
          Our flagship line engineered for professionals who demand the highest tier of performance and durability from their daily tools.
        </p>
        <Link to="/collections/pro-series" className="btn btn-outline-light btn-lg px-4">
          Explore the Pro Series
        </Link>
      </div>
    </section>
  );
};

export default ProductHighlights;