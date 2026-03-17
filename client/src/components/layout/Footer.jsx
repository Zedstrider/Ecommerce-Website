// client/src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4 mb-4">
          
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3 text-white">
              TECH<span className="text-primary">GEAR</span>
            </h5>
            <p className="text-white-50 small" style={{ lineHeight: '1.6' }}>
              Upgrade your daily routine with premium performance gear. Designed for modern professionals and enthusiasts who demand the best from their workspace.
            </p>
          </div>

          {/* Spacer for layout balance */}
          <div className="col-lg-2 d-none d-lg-block"></div>

          {/* Quick Links Column */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-white text-uppercase" style={{ letterSpacing: '1px' }}>Quick Links</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/catalog" className="text-white-50 text-decoration-none">Catalog</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-white-50 text-decoration-none">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white-50 text-decoration-none">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-white text-uppercase" style={{ letterSpacing: '1px' }}>Policies</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/faq" className="text-white-50 text-decoration-none">FAQ</Link>
              </li>
              <li className="mb-2">
                <Link to="/policies/shipping" className="text-white-50 text-decoration-none">Shipping & Returns</Link>
              </li>
              <li className="mb-2">
                <Link to="/policies/privacy" className="text-white-50 text-decoration-none">Privacy Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/policies/terms" className="text-white-50 text-decoration-none">Terms of Service</Link>
              </li>
              <li className="mb-2">
                <Link to="/track" className="text-white-50 text-decoration-none">Track Order</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <hr className="my-4 border-secondary" />
        <div className="row align-items-center text-white-50 small">
          <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
            &copy; {new Date().getFullYear()} TechGear. All rights reserved.
          </div>
          <div className="col-md-6 text-center text-md-end">
            Full-Stack Portfolio Project
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;