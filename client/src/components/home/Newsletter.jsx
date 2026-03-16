// client/src/components/home/Newsletter.jsx
import React from 'react';

const Newsletter = () => {
  return (
    <section className="bg-light py-5 border-top">
      <div className="container text-center py-4">
        <h3 className="fw-bold mb-3">Join Our Community</h3>
        <p className="text-muted mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
        <form className="d-flex justify-content-center mx-auto" style={{ maxWidth: '500px' }}>
          <input 
            type="email" 
            className="form-control me-2" 
            placeholder="Enter your email address" 
            aria-label="Email address"
            required 
          />
          <button className="btn btn-dark px-4" type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;