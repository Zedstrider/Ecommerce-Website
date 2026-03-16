// client/src/components/home/FeaturedCollections.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, title: 'Workstation Setup', image: 'https://placehold.co/600x400/eee/31343C?text=Workstation' },
  { id: 2, title: 'Audio Gear', image: 'https://placehold.co/600x400/eee/31343C?text=Audio+Gear' },
  { id: 3, title: 'Accessories', image: 'https://placehold.co/600x400/eee/31343C?text=Accessories' }
];

const FeaturedCollections = () => {
  return (
    <section className="container py-5">
      <h2 className="text-center fw-bold mb-4">Shop by Category</h2>
      <div className="row g-4">
        {categories.map((cat) => (
          <div key={cat.id} className="col-md-4">
            <Link to={`/category/${cat.title.toLowerCase()}`} className="text-decoration-none">
              <div className="card text-white border-0 shadow-sm overflow-hidden" style={{ height: '250px' }}>
                <img src={cat.image} className="card-img h-100" alt={cat.title} style={{ objectFit: 'cover' }} />
                <div className="card-img-overlay d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                  <h4 className="card-title fw-bold m-0">{cat.title}</h4>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollections;