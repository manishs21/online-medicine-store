import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/heroBanner.css';

const HeroBanner = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = (query || '').trim();
    if (q.length > 0) {
      navigate(`/listing?search=${encodeURIComponent(q)}`);
    } else {
      navigate('/listing');
    }
  };

  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1>Your Health, Our Priority</h1>
        <p>Buy authentic medicines online with fast delivery</p>

        <form className="hero-search" onSubmit={handleSubmit} role="search">
          <input
            type="search"
            placeholder="Search medicines, brands, categories..."
            value={query}
            aria-label="Search medicines"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={!query.trim()}>Search</button>
        </form>

        <button className="hero-btn" onClick={() => navigate('/listing')}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;
