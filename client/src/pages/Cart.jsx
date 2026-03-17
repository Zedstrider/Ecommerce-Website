// client/src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cartItems, addToCart, removeFromCart, decreaseQuantity, 
    discount, applyDiscount, removeDiscount,
    rawSubtotal, discountAmount, shipping, tax, total 
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  
  // NEW: State for Upsell Products
  const [upsellProducts, setUpsellProducts] = useState([]);

  // NEW: Fetch and filter products for the Upsell section
  useEffect(() => {
    const fetchUpsells = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const allProducts = await response.json();
        
        // Filter out products that are already in the cart
        const cartProductIds = cartItems.map(item => item._id);
        const recommendations = allProducts.filter(p => !cartProductIds.includes(p._id));
        
        // Grab up to 2 items to suggest
        setUpsellProducts(recommendations.slice(0, 2));
      } catch (err) {
        console.error("Failed to load upsells", err);
      }
    };

    if (cartItems.length > 0) {
      fetchUpsells();
    }
  }, [cartItems]);

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    setPromoError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/discounts/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode })
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message);
      
      applyDiscount(data);
      setPromoCode(''); 
    } catch (err) {
      setPromoError(err.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <h2 className="fw-bold mb-4">Your Cart is Empty</h2>
        <p className="text-muted mb-4">Looks like you haven't added any gear to your setup yet.</p>
        <Link to="/" className="btn btn-dark btn-lg px-4">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: '70vh' }}>
      <h1 className="fw-bold mb-5">Shopping Cart</h1>
      
      <div className="row g-5">
        {/* Left Column: Cart Items & Upsells */}
        <div className="col-lg-8">
          
          {/* Main Cart Items */}
          <div className="card border-0 shadow-sm mb-5">
            <div className="card-body p-4">
              {cartItems.map((item) => (
                <div key={`${item._id}-${JSON.stringify(item.selectedOptions)}`} className="row align-items-center mb-4 pb-4 border-bottom last-child-border-0">
                  <div className="col-md-2 col-4">
                    <img 
                      src={item.images && item.images[0] ? item.images[0] : 'https://placehold.co/150x150'} 
                      alt={item.title} 
                      className="img-fluid rounded" 
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  
                  <div className="col-md-5 col-8">
                    <Link to={`/product/${item._id}`} className="text-decoration-none text-dark fw-bold fs-5 d-block mb-1">
                      {item.title}
                    </Link>
                    
                    {/* Render selected variants if they exist */}
                    {item.selectedOptions && Object.entries(item.selectedOptions).map(([key, value]) => (
                      <span key={key} className="d-block text-muted small">{key}: {value}</span>
                    ))}
                    
                   {/*Interactive Quantity Adjuster */}
                    <div className="d-flex align-items-center mb-2 mt-2" style={{ maxWidth: '120px' }}>
                      <button 
                        onClick={() => decreaseQuantity(item._id)}
                        className="btn btn-sm btn-outline-secondary px-2 border-0 bg-light"
                      >
                        -
                      </button>
                      <span className="mx-3 fw-medium small">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="btn btn-sm btn-outline-secondary px-2 border-0 bg-light"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="btn btn-link text-danger p-0 text-decoration-none small fw-medium"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="col-md-5 col-12 text-md-end mt-3 mt-md-0">
                    <span className="fw-bold fs-5">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NEW: Cart Upsells Section */}
          {upsellProducts.length > 0 && (
            <div className="mt-2">
              <h4 className="fw-bold mb-4">Complete Your Setup</h4>
              <div className="row g-3">
                {upsellProducts.map(product => (
                  <div key={product._id} className="col-md-6">
                    <div className="card h-100 border p-3 rounded-4 flex-row align-items-center">
                      <img 
                        src={product.images[0]} 
                        alt={product.title} 
                        className="rounded" 
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                      />
                      <div className="ms-3 flex-grow-1">
                        <h6 className="fw-bold mb-1 text-truncate" style={{ maxWidth: '180px' }}>{product.title}</h6>
                        <div className="text-muted small mb-2">${product.price.toFixed(2)}</div>
                        <button 
                          onClick={() => addToCart(product)}
                          className="btn btn-sm btn-outline-dark fw-medium rounded-pill px-3"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>

        {/* Right Column: Order Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '100px' }}>
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Order Summary</h4>
              
              <form onSubmit={handleApplyPromo} className="mb-4">
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Discount code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={discount !== null}
                  />
                  <button className="btn btn-outline-dark" type="submit" disabled={discount !== null || !promoCode}>
                    Apply
                  </button>
                </div>
                {promoError && <div className="text-danger small mt-2">{promoError}</div>}
              </form>

              {discount && (
                <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-3">
                  <span className="small fw-bold">🏷️ {discount.code} applied</span>
                  <button onClick={removeDiscount} className="btn btn-sm btn-link text-danger p-0 text-decoration-none small">
                    Remove
                  </button>
                </div>
              )}

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-medium">${rawSubtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Discount</span>
                  <span className="fw-medium">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Estimated Shipping</span>
                <span className="fw-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
                <span className="text-muted">Estimated Tax</span>
                <span className="fw-medium">${tax.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-4">
                <span className="fs-5 fw-bold">Total</span>
                <span className="fs-5 fw-bold">${total.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="btn btn-dark w-100 btn-lg fw-bold mb-3 shadow-sm d-block text-center">
                Proceed to Checkout
              </Link>
              
              <div className="text-center mt-3 text-muted" style={{ fontSize: '0.85rem' }}>
                <span className="d-block mb-2">🔒 Secure Encrypted Checkout</span>
                We accept all major credit cards.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;