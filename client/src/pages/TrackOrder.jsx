// client/src/pages/TrackOrder.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, found, error

  const handleTrack = (e) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate an API call to an Orders database
    setTimeout(() => {
      // Simple validation mock: If order starts with 'TG', it's valid.
      if (orderId.toUpperCase().startsWith('TG-')) {
        setStatus('found');
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Track Your Order | TechGear</title>
        <meta name="description" content="Track your TechGear order status in real-time. Enter your order number and email to see shipping updates." />
      </Helmet>

      <div className="container py-5" style={{ minHeight: '70vh' }}>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            
            <div className="text-center mb-5">
              <h1 className="fw-bold mb-3">Track Your Order</h1>
              <p className="text-muted">Enter your order details below to check your shipping status.</p>
            </div>

            <div className="card border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white">
              <form onSubmit={handleTrack}>
                <div className="mb-4">
                  <label className="form-label fw-medium small">Order Number</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg bg-light" 
                    placeholder="e.g., TG-10485" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                  <div className="form-text mt-2">You can find this in your confirmation email.</div>
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-medium small">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg bg-light" 
                    placeholder="Enter the email used at checkout" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-dark btn-lg w-100 fw-bold"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  ) : null}
                  {status === 'loading' ? 'Locating Order...' : 'Track Order'}
                </button>
              </form>

              {/* Error State */}
              {status === 'error' && (
                <div className="alert alert-danger mt-4 border-0 d-flex align-items-center">
                  <span className="fs-5 me-2">⚠️</span>
                  <div>We couldn't find an order matching those details. Please check your order number and try again.</div>
                </div>
              )}

              {/* Success / Result State */}
              {status === 'found' && (
                <div className="mt-5 pt-4 border-top">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">Order {orderId.toUpperCase()}</h5>
                    <span className="badge bg-primary px-3 py-2 rounded-pill">In Transit</span>
                  </div>

                  {/* Simulated Tracking Timeline */}
                  <div className="position-relative m-4">
                    <div className="progress" style={{ height: '4px' }}>
                      <div className="progress-bar bg-dark" role="progressbar" style={{ width: '50%' }}></div>
                    </div>
                    
                    <div className="d-flex justify-content-between position-absolute top-0 start-0 w-100 translate-middle-y">
                      <div className="bg-dark rounded-circle border border-white border-3" style={{ width: '20px', height: '20px' }}></div>
                      <div className="bg-dark rounded-circle border border-white border-3" style={{ width: '20px', height: '20px' }}></div>
                      <div className="bg-light rounded-circle border border-white border-3 shadow-sm" style={{ width: '20px', height: '20px' }}></div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between text-muted small fw-medium mb-4">
                    <span>Confirmed</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>

                  <div className="bg-light p-3 rounded-3 small">
                    <div className="fw-bold mb-1">Latest Update:</div>
                    <div className="text-muted">Package arrived at sort facility. Estimated delivery in 2 days.</div>
                  </div>
                </div>
              )}
            </div>

            {/* Support Link */}
            <div className="text-center mt-4">
              <span className="text-muted small">Need help with your order? </span>
              <Link to="/contact" className="text-dark small fw-medium text-decoration-none border-bottom border-dark pb-1">Contact Support</Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrder;