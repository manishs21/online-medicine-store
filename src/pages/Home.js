import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import Categories from '../components/Categories';
import FeaturedMedicines from '../components/FeaturedMedicines';
import medicinesData from '../data/medicines.json';
import { useMedicineContext } from '../context/MedicineContext';
import '../styles/home.css';

const Home = () => {
  const { setMedicines } = useMedicineContext();
  const [medicines] = useState(medicinesData);

  useEffect(() => {
    setMedicines(medicines);
  }, [medicines, setMedicines]);

  // Featured brands section
  const brands = ['Bayer', 'Cipla', 'GSK', 'Sun Pharma', 'Dr. Reddy\'s', 'Novo Nordisk'];

  return (
    <div className="home-page">
      <HeroBanner />
      <Categories />
      <FeaturedMedicines medicines={medicines} />

      {/* Popular Brands Section */}
      <section className="brands-section">
        <h2>Popular Brands</h2>
        <div className="brands-grid">
          {brands.map((brand) => (
            <div key={brand} className="brand-card">
              {brand}
            </div>
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="offers-section">
        <div className="offer-card offer-1">
          <h3>Get 20% Off</h3>
          <p>On all tablets this week</p>
        </div>
        <div className="offer-card offer-2">
          <h3>Free Delivery</h3>
          <p>On orders above ₹500</p>
        </div>
        <div className="offer-card offer-3">
          <h3>7-Day Return</h3>
          <p>Money-back guarantee</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
