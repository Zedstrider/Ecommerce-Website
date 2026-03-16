// client/src/components/home/HeroBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <section className="container-fluid bg-light py-5 d-flex align-items-center" style={{ minHeight: '60vh' }}>
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="display-4 fw-bold mb-3">Upgrade Your Daily Routine</h1>
            <p className="lead text-muted mb-4">
              Discover our latest collection designed for premium performance and everyday comfort.
            </p>
            {/* The CTA button using Bootstrap classes and an Accent Color */}
            <Link to="/shop" className="btn btn-primary btn-lg px-5 py-3 fw-semibold shadow-sm">
              Shop the Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;