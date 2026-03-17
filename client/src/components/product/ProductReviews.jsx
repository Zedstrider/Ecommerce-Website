// client/src/components/product/ProductReviews.jsx
import React, { useState, useEffect } from 'react';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reviews/${productId}`);
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch reviews");
        setLoading(false);
      }
    };
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: productId, name, rating, comment })
      });

      if (!response.ok) throw new Error('Failed to submit review');
      
      const newReview = await response.json();
      
      // Update the UI immediately without reloading the page
      setReviews([newReview, ...reviews]);
      
      // Reset form
      setName('');
      setRating(5);
      setComment('');
      setSubmitSuccess(true);
      
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  const renderStars = (num) => {
    return "★".repeat(num) + "☆".repeat(5 - num);
  };

  return (
    <div className="mt-5 pt-5 border-top">
      <h3 className="fw-bold mb-4">Customer Reviews</h3>
      
      <div className="row g-5">
        {/* Left Column: The Review Form */}
        <div className="col-lg-4">
          <div className="card border-0 bg-light p-4 rounded-4">
            <h5 className="fw-bold mb-3">Write a Review</h5>
            {submitSuccess && <div className="alert alert-success py-2">Review posted successfully!</div>}
            {submitError && <div className="alert alert-danger py-2">{submitError}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-medium">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              
              <div className="mb-3">
                <label className="form-label small fw-medium">Rating</label>
                <select className="form-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                  <option value="5">5 Stars - Excellent</option>
                  <option value="4">4 Stars - Good</option>
                  <option value="3">3 Stars - Average</option>
                  <option value="2">2 Stars - Poor</option>
                  <option value="1">1 Star - Terrible</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label small fw-medium">Comment</label>
                <textarea className="form-control" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
              </div>
              
              <button type="submit" className="btn btn-dark w-100 fw-medium">Submit Review</button>
            </form>
          </div>
        </div>

        {/* Right Column: The Reviews List */}
        <div className="col-lg-8">
          {loading ? (
            <div className="text-muted">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="text-muted">No reviews yet. Be the first to share your thoughts!</div>
          ) : (
            <div className="d-flex flex-column gap-4">
              {reviews.map((rev) => (
                <div key={rev._id} className="pb-4 border-bottom">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-warning me-2">{renderStars(rev.rating)}</span>
                    <span className="fw-bold">{rev.name}</span>
                    <span className="text-muted ms-auto small">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted mb-0">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;