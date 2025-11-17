import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import medicinesData from '../data/medicines.json';
import '../styles/listing.css';

const Listing = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || ''
  );
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');

  // Get unique categories and brands from medicines
  const categories = [...new Set(medicinesData.map((m) => m.category))];
  const brands = [...new Set(medicinesData.map((m) => m.brand))];

  // Filter medicines based on criteria
  const filteredMedicines = useMemo(() => {
    const searchTerm = (searchParams.get('search') || '').toLowerCase();

    let filtered = medicinesData.filter((medicine) => {
      const matchCategory =
        !selectedCategory || medicine.category === selectedCategory;
      const matchBrand = !selectedBrand || medicine.brand === selectedBrand;
      const matchPrice =
        medicine.price >= priceRange[0] && medicine.price <= priceRange[1];
      const matchRating = medicine.rating >= minRating;
      const matchSearch =
        !searchTerm ||
        medicine.name.toLowerCase().includes(searchTerm) ||
        medicine.brand.toLowerCase().includes(searchTerm) ||
        medicine.category.toLowerCase().includes(searchTerm);

      return (
        matchCategory &&
        matchBrand &&
        matchPrice &&
        matchRating &&
        matchSearch
      );
    });

    // Sort medicines
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [selectedCategory, selectedBrand, priceRange, minRating, sortBy, searchParams]);

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
  };

  return (
    <div className="listing-page">
      <div className="listing-container">
        {/* Sidebar Filters */}
        <aside className="sidebar">
          <h2>Filters</h2>

          {/* Category Filter */}
          <div className="filter-group">
            <h3>Category</h3>
            <div className="filter-options">
              <label>
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ''}
                  onChange={() => setSelectedCategory('')}
                />
                All Categories
              </label>
              {categories.map((category) => (
                <label key={category}>
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="filter-group">
            <h3>Brand</h3>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <h3>Price Range</h3>
            <div className="price-filter">
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[1]}
                onChange={handlePriceChange}
              />
              <p>₹0 - ₹{priceRange[1]}</p>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <h3>Minimum Rating</h3>
            <div className="rating-filter">
              {[0, 3, 4, 4.5].map((rating) => (
                <label key={rating}>
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={minRating === rating}
                    onChange={() => setMinRating(rating)}
                  />
                  {rating === 0 ? 'All Ratings' : `⭐ ${rating} & up`}
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            className="clear-filters-btn"
            onClick={() => {
              setSelectedCategory('');
              setSelectedBrand('');
              setPriceRange([0, 5000]);
              setMinRating(0);
            }}
          >
            Clear All Filters
          </button>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          {/* Sort & Results Header */}
          <div className="listing-header">
            <h1>Medicines</h1>
            <div className="sort-section">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            <p className="results-count">
              Showing {filteredMedicines.length} results
            </p>
          </div>

          {/* Products Grid */}
          {filteredMedicines.length > 0 ? (
            <div className="products-grid">
              {filteredMedicines.map((medicine) => (
                <ProductCard key={medicine.id} medicine={medicine} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No medicines found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedBrand('');
                  setPriceRange([0, 5000]);
                  setMinRating(0);
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listing;
