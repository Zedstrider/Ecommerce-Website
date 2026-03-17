// client/src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container py-5" style={{ minHeight: '70vh' }}>
      <div className="row align-items-center mb-5">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img 
            src="https://placehold.co/800x600/eee/31343C?text=Our+Workspace" 
            alt="About TechGear" 
            className="img-fluid rounded-4 shadow-sm"
          />
        </div>
        <div className="col-lg-6 px-lg-5">
          <h1 className="fw-bold mb-4">Elevating Your Workflow.</h1>
          <p className="lead text-muted mb-4">
            TechGear was founded with a single mission: to provide developers, designers, and creators with the premium tools they need to achieve deep focus and produce their best work.
          </p>
          <p className="mb-4">
            We believe that your physical workspace directly impacts your digital output. That is why we source only the highest quality ergonomic keyboards, precision audio gear, and minimalist desk accessories. No clutter. No distractions. Just pure performance.
          </p>
          <Link to="/catalog" className="btn btn-dark btn-lg px-4">Explore Our Gear</Link>
        </div>
      </div>
    </div>
  );
};

export default About;