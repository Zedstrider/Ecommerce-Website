// client/src/components/home/BestSellers.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useCart } from '../../context/CartContext';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          Error loading products: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Best Sellers</h2>
        <p className="text-muted">Our most popular gear, chosen by professionals.</p>
      </div>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                <img 
                  src={product.images[0]} 
                  className="card-img-top rounded-top" 
                  alt={product.title} 
                  style={{ objectFit: 'cover', height: '250px' }}
                />
              </Link>
              
              <div className="card-body d-flex flex-column">
                <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                  <h5 className="card-title fs-6 fw-semibold mb-2">{product.title}</h5>
                </Link>
                
                {/* 2. Removed the duplicate h5 title that was sitting here */}
                
                <div className="mb-2 text-warning" style={{ fontSize: '0.9rem' }}>
                  ★★★★★
                </div>

                <div className="mt-auto mb-3">
                  <span className="fw-bold fs-5">${product.price}</span>
                  {product.compareAtPrice && (
                    <span className="text-muted text-decoration-line-through ms-2">
                      ${product.compareAtPrice}
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => addToCart(product)} 
                  className="btn btn-dark w-100 fw-medium mt-auto"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;