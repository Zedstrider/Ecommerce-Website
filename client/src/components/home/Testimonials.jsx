// client/src/components/home/Testimonials.jsx
import React from 'react';

const mockTestimonials = [
  { id: 1, name: 'Alex Johnson', role: 'Software Engineer', text: 'The ergonomic keyboard completely changed my workflow. No more wrist pain after long coding sessions.' },
  { id: 2, name: 'Sarah Lee', role: 'Product Designer', text: 'Clean, minimal, and perfectly functional. The laptop stand is exactly what my desk setup needed.' }
];

const Testimonials = () => {
  return (
    <section className="container py-5">
      <h2 className="text-center fw-bold mb-5">What Our Customers Say</h2>
      <div className="row justify-content-center g-4">
        {mockTestimonials.map((review) => (
          <div key={review.id} className="col-md-5">
            <div className="card h-100 border-0 shadow-sm p-4 text-center">
              <div className="text-warning mb-3">★★★★★</div>
              <p className="fst-italic mb-4">"{review.text}"</p>
              <h6 className="fw-bold mb-0">{review.name}</h6>
              <small className="text-muted">{review.role}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;