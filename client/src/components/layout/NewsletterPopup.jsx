// client/src/components/layout/NewsletterPopup.jsx
import React, { useState, useEffect } from 'react';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if the user has already seen or closed the popup
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletter');

    if (!hasSeenPopup) {
      // Delay the popup by 5 seconds to simulate realistic engagement
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenNewsletter', 'true'); // Prevent it from showing again
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you'd send this to your Express backend here
      setIsSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}>
      <div className="card border-0 shadow-lg position-relative" style={{ maxWidth: '500px', width: '90%', borderRadius: '1rem', overflow: 'hidden' }}>
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="btn-close position-absolute top-0 end-0 m-3" 
          aria-label="Close"
          style={{ zIndex: 1 }}
        ></button>

        <div className="row g-0">
          <div className="col-12 p-5 text-center bg-white">
            {!isSubmitted ? (
              <>
                <h2 className="fw-bold mb-3">Unlock 10% Off</h2>
                <p className="text-muted mb-4">
                  Join the TechGear community. Get exclusive access to new drops, ergonomic tips, and 10% off your first order.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <input 
                      type="email" 
                      className="form-control form-control-lg bg-light border-0" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-dark btn-lg w-100 fw-bold">
                    Reveal My Discount
                  </button>
                </form>
                <div className="mt-3">
                  <button onClick={handleClose} className="btn btn-link text-muted p-0 text-decoration-none small">
                    No thanks, I prefer paying full price
                  </button>
                </div>
              </>
            ) : (
              <div className="py-4">
                <span className="display-1 text-success mb-3 d-block">✓</span>
                <h3 className="fw-bold">You're on the list!</h3>
                <p className="text-muted mb-0">Use code <strong>WELCOME10</strong> at checkout.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;