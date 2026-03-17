// client/src/pages/PasswordPage.jsx
import React, { useState } from 'react';

const PasswordPage = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check against the required training document password
    if (password === 'Test@123') {
      onUnlock();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="card border-0 shadow-lg p-5 text-center" style={{ maxWidth: '450px', width: '100%' }}>
        
        <h2 className="fw-bold mb-3">TECH<span className="text-primary">GEAR</span></h2>
        <h4 className="mb-4 text-muted">Opening Soon</h4>
        
        <p className="small text-muted mb-4">
          This store is currently in development mode. Please enter the password to access the preview.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="password" 
              className={`form-control form-control-lg bg-light ${error ? 'is-invalid' : ''}`}
              placeholder="Enter store password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
          
          <button type="submit" className="btn btn-dark btn-lg w-100 fw-bold">
            Enter Store
          </button>
        </form>

        <div className="mt-5 text-muted" style={{ fontSize: '0.75rem' }}>
          Portfolio Project &bull; MERN Stack Architecture
        </div>

      </div>
    </div>
  );
};

export default PasswordPage;