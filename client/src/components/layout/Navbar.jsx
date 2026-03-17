// client/src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${keyword}`);
      setKeyword('');
    }
  };
  
  return (
    <header>
      {/* The Announcement Bar */}
      <div className="bg-dark text-white text-center py-2" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
        <span className="fw-medium">Current Offer:</span> Free standard shipping on all orders over $50!
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4" to="/">
            TECH<span className="text-primary">GEAR</span>
          </Link>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-medium">
              <li className="nav-item"><NavLink className="nav-link px-3" to="/">Home</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link px-3" to="/catalog">Catalog</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link px-3" to="/about">About</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link px-3" to="/faq">FAQ</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link px-3" to="/contact">Contact</NavLink></li>
            </ul>

            <div className="d-flex align-items-center gap-3">
              {/* New Search Form */}
              <form onSubmit={handleSearch} className="d-flex">
                <input 
                  type="text" 
                  className="form-control form-control-sm rounded-pill px-3" 
                  placeholder="Search gear..." 
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  style={{ width: '200px', backgroundColor: '#f8f9fa', border: 'none' }}
                />
              </form>

              {/* Cart Icon */}
              <Link to="/cart" className="btn btn-outline-dark position-relative border-0 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;