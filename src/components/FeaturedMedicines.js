import React from 'react';
import ProductCard from './ProductCard';
import '../styles/featured.css';

const FeaturedMedicines = ({ medicines }) => {
  // Get top featured medicines
  const featured = medicines.slice(0, 6);

  return (
    <section className="featured-section">
      <h2>Featured Medicines</h2>
      <div className="featured-grid">
        {featured.map((medicine) => (
          <ProductCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedMedicines;
