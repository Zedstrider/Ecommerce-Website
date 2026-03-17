// client/src/pages/Checkout.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Calculate financials
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 10.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = (e) => {
    e.preventDefault();
    // Simulate API call and order processing
    const generatedOrderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNumber);
    setIsSubmitted(true);
    clearCart();
  };

  // Success State View
  if (isSubmitted) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '70vh' }}>
        <div className="mb-4">
          <span className="display-1 text-success">✓</span>
        </div>
        <h1 className="fw-bold mb-3">Order Confirmed!</h1>
        <p className="lead text-muted mb-4">Thank you for your purchase. Your order number is <strong>{orderNumber}</strong>.</p>
        <p className="mb-5">We'll email you an order confirmation with details and tracking info.</p>
        <Link to="/" className="btn btn-dark btn-lg px-5">Continue Shopping</Link>
      </div>
    );
  }

  // Empty Cart Check (prevents accessing checkout with 0 items)
  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-dark mt-3">Return to Shop</Link>
      </div>
    );
  }

  // Active Checkout View
  return (
    <div className="container py-5" style={{ minHeight: '70vh' }}>
      <h1 className="fw-bold mb-4">Checkout</h1>
      
      {/* Test Mode Banner */}
      <div className="alert alert-info mb-4" role="alert">
        <strong>Test Mode:</strong> This is a portfolio project. No real payments are processed.
      </div>

      <div className="row g-5">
        {/* Left Column: Forms */}
        <div className="col-lg-7">
          <form onSubmit={handleCheckout}>
            {/* Shipping Info */}
            <h4 className="fw-bold mb-3">Shipping Address</h4>
            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <label className="form-label">First name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Last name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-12">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" placeholder="1234 Main St" required />
              </div>
              <div className="col-md-5">
                <label className="form-label">Country</label>
                <select className="form-select" required>
                  <option value="">Choose...</option>
                  <option>United States</option>
                  <option>India</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">State/Region</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Zip Code</label>
                <input type="text" className="form-control" required />
              </div>
            </div>

            <hr className="my-4" />

            {/* Payment Info */}
            <h4 className="fw-bold mb-3">Payment Details</h4>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label">Name on card</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Credit card number</label>
                <input type="text" className="form-control" placeholder="0000 0000 0000 0000" required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Expiration</label>
                <input type="text" className="form-control" placeholder="MM/YY" required />
              </div>
              <div className="col-md-3">
                <label className="form-label">CVV</label>
                <input type="text" className="form-control" required />
              </div>
            </div>

            <button className="btn btn-dark w-100 btn-lg fw-bold mb-5 shadow-sm" type="submit">
              Place Order (${total.toFixed(2)})
            </button>
          </form>
        </div>

        {/* Right Column: Mini Order Summary */}
        <div className="col-lg-5">
          <div className="card border-0 bg-light p-4 sticky-top" style={{ top: '100px' }}>
            <h5 className="fw-bold mb-4">In Your Cart</h5>
            <ul className="list-group list-group-flush mb-4 bg-transparent">
              {cartItems.map(item => (
                <li key={item._id} className="list-group-item d-flex justify-content-between lh-sm bg-transparent px-0">
                  <div>
                    <h6 className="my-0">{item.title}</h6>
                    <small className="text-muted">Qty: {item.quantity}</small>
                  </div>
                  <span className="text-muted">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            
            <div className="border-top pt-3 d-flex justify-content-between fw-bold fs-5">
              <span>Total (USD)</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;