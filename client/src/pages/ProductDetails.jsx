// client/src/pages/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductReviews from '../components/product/ProductReviews';

const ProductDetails = () => {
  const { id } = useParams(); // Grab the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
        if (data.options && data.options.length > 0) {
          const initialSelections = {};
          data.options.forEach(opt => {
            initialSelections[opt.name] = opt.values[0];
          });
          setSelectedOptions(initialSelections);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle selection changes
  const handleOptionChange = (optionName, value) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  // Pass selected options to the cart
  const handleAddToCart = () => {
    // We attach the specific selected variants to the product object
    const productToAdd = {
      ...product,
      selectedOptions 
    };
    addToCart(productToAdd);
  };
  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <h2>{error || 'Product not found'}</h2>
        <Link to="/" className="btn btn-outline-dark mt-3">Return Home</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.seo?.title || `${product.title} | TechGear`}</title>
        <meta name="description" content={product.seo?.description || product.description.substring(0, 155)} />
      </Helmet>
      <div className="container py-5">
        <div className="row mb-5">
          {/* Left Column: Clean Image Gallery */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden sticky-top" style={{ top: '100px' }}>
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="img-fluid w-100" 
                style={{ objectFit: 'cover', maxHeight: '500px' }} 
              />
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="col-md-6 px-md-5">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/catalog" className="text-decoration-none text-muted">{product.productType}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
              </ol>
            </nav>

            <h1 className="fw-bold mb-3">{product.title}</h1>
            
            {/* Reviews Positioning */}
            <div className="d-flex align-items-center mb-3">
              <div className="text-warning me-2">★★★★★</div>
              <span className="text-muted text-decoration-underline" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                Read 124 Reviews
              </span>
            </div>

            {/* Pricing */}
            <div className="mb-4">
              <span className="fs-2 fw-bold">${product.price}</span>
              {product.compareAtPrice && (
                <>
                  <span className="fs-4 text-muted text-decoration-line-through ms-3">${product.compareAtPrice}</span>
                  <span className="badge bg-danger ms-3 align-middle">Sale</span>
                </>
              )}
            </div>

            <p className="lead text-muted mb-4">{product.description}</p>

            {/* Variant Selectors UI */}
            {product.options && product.options.length > 0 && (
              <div className="mb-4 p-4 bg-light rounded-3 border">
                {product.options.map((option) => (
                  <div key={option.name} className="mb-3 last-child-mb-0">
                    <label className="fw-bold mb-2 d-block">{option.name}</label>
                    <div className="d-flex flex-wrap gap-2">
                      {option.values.map((val) => (
                        <button
                          key={val}
                          onClick={() => handleOptionChange(option.name, val)}
                          className={`btn ${selectedOptions[option.name] === val ? 'btn-dark' : 'btn-outline-dark bg-white'}`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Shipping Snippet */}
            <div className="d-flex align-items-center mb-4 text-success fw-medium">
              <span className="me-2">📦</span> {product.shippingSnippet || 'Free shipping on this item.'}
            </div>

            {/* Sticky Add-to-Cart Action area */}
            <div className="d-grid gap-2 mb-4">
              <button onClick={handleAddToCart} className="btn btn-dark btn-lg py-3 fw-bold shadow-sm">
                Add to Cart
              </button>
              <button className="btn btn-outline-dark py-2 fw-bold">
                Buy it now
              </button>
            </div>

            {/* Trust Badges specific to product page */}
            <div className="card border-0 bg-light p-3 rounded-3 mt-4">
              <div className="d-flex justify-content-around text-center" style={{ fontSize: '0.85rem' }}>
                <div><span className="d-block mb-1 fs-5">🔒</span> Secure Checkout</div>
                <div><span className="d-block mb-1 fs-5">🚚</span> Fast Delivery</div>
                <div><span className="d-block mb-1 fs-5">🔄</span> Free Returns</div>
              </div>
            </div>
            
          </div>
        </div>
        <ProductReviews productId={product._id} />
      </div>
    </>
  );
};

export default ProductDetails;