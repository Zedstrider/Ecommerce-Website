// client/src/components/home/TrustBadges.jsx
import React from 'react';

const TrustBadges = () => {
  return (
    <section className="bg-light py-4 border-bottom border-top">
      <div className="container">
        <div className="row text-center align-items-center">
          <div className="col-md-3 col-6 mb-3 mb-md-0">
            <span className="fs-4 d-block mb-1">🚚</span>
            <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>Free Shipping Over $50</span>
          </div>
          <div className="col-md-3 col-6 mb-3 mb-md-0">
            <span className="fs-4 d-block mb-1">🛡️</span>
            <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>1-Year Warranty</span>
          </div>
          <div className="col-md-3 col-6 mb-3 mb-md-0">
            <span className="fs-4 d-block mb-1">🔄</span>
            <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>30-Day Returns</span>
          </div>
          <div className="col-md-3 col-6 mb-3 mb-md-0">
            <span className="fs-4 d-block mb-1">🔒</span>
            <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>Secure Checkout</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;