// client/src/components/home/BenefitsUSP.jsx
import React from 'react';

const BenefitsUSP = () => {
  return (
    <section className="container py-5 my-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img src="https://placehold.co/800x600/eee/31343C?text=Brand+Story" alt="Our Mission" className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-6 px-md-5">
          <h2 className="fw-bold mb-3">Designed for Focus and Flow</h2>
          <p className="lead text-muted mb-4">
            We build high-quality gear that eliminates distractions so you can perform at your absolute best, whether you are coding a new app or designing a new product.
          </p>
          <ul className="list-unstyled">
            <li className="mb-2">✓ Premium, sustainable materials</li>
            <li className="mb-2">✓ Ergonomic designs for long sessions</li>
            <li className="mb-2">✓ Minimalist aesthetic to reduce clutter</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BenefitsUSP;