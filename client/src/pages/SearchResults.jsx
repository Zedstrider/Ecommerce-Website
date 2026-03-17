// client/src/pages/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductBadge from '../components/product/ProductBadge';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); // Extracts the search term from the URL
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/products/search?q=${query}`);
        if (!response.ok) throw new Error('Failed to fetch search results');
        
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ minHeight: '70vh' }}>
      <h2 className="fw-bold mb-4">
        Search Results for "{query}"
      </h2>
      <p className="text-muted mb-5">{products.length} {products.length === 1 ? 'item' : 'items'} found</p>

      {error && <div className="alert alert-danger">{error}</div>}

      {products.length === 0 && !error ? (
        <div className="text-center py-5 bg-light rounded-4">
          <h4 className="fw-medium text-muted">No gear matched your search.</h4>
          <p className="mb-4">Try checking your spelling or using more general terms.</p>
          <Link to="/catalog" className="btn btn-dark px-4">Browse Catalog</Link>
        </div>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="position-relative">
                  <ProductBadge product={product} />
                  <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                    <img 
                      src={product.images && product.images[0] ? product.images[0] : 'https://placehold.co/400x400'} 
                      className="card-img-top rounded-top" 
                      alt={product.title} 
                      style={{ objectFit: 'cover', height: '250px' }}
                    />
                  </Link>
                </div>

                <div className="card-body d-flex flex-column">
                  <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                    <h5 className="card-title fs-6 fw-semibold mb-2">{product.title}</h5>
                  </Link>
                  <div className="mb-2 text-warning" style={{ fontSize: '0.9rem' }}>★★★★★</div>
                  <div className="mt-auto mb-3">
                    <span className="fw-bold fs-5">${product.price}</span>
                  </div>
                  <Link to={`/product/${product._id}`} className="btn btn-outline-dark w-100 fw-medium mt-auto">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;