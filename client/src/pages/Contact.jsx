// client/src/pages/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <div className="container py-5" style={{ minHeight: '70vh' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center mb-5">
          <h1 className="fw-bold">Contact Us</h1>
          <p className="lead text-muted">Have a question about an order or need gear recommendations? Drop us a line.</p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4 p-md-5">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-medium">Name</label>
                  <input type="text" className="form-control bg-light border-0" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium">Email</label>
                  <input type="email" className="form-control bg-light border-0" required />
                </div>
                <div className="col-12">
                  <label className="form-label fw-medium">Order Number (Optional)</label>
                  <input type="text" className="form-control bg-light border-0" />
                </div>
                <div className="col-12">
                  <label className="form-label fw-medium">Message</label>
                  <textarea className="form-control bg-light border-0" rows="5" required></textarea>
                </div>
                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-dark w-100 py-3 fw-bold">Send Message</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;