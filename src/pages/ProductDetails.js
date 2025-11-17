import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import medicinesData from '../data/medicines.json';
import { useMedicineContext } from '../context/MedicineContext';
import { toast } from 'react-toastify';
import '../styles/productdetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useMedicineContext();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Find medicine by ID
  const medicine = medicinesData.find((m) => m.id === parseInt(id));
  const inWishlist = isInWishlist(parseInt(id));

  if (!medicine) {
    return (
      <div className="product-details">
        <div className="not-found">
          <p>Product not found</p>
          <button onClick={() => navigate('/listing')}>Back to Listing</button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(medicine);
    }
    toast.success(`${quantity} x ${medicine.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 2000,
    });
    setQuantity(1);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(medicine.id);
      toast.info('Removed from wishlist', {
        position: 'bottom-right',
        autoClose: 2000,
      });
    } else {
      addToWishlist(medicine);
      toast.success('Added to wishlist!', {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  const discountPercentage = Math.round(
    ((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100
  );

  return (
    <div className="product-details">
      <div className="details-container">
        {/* Product Image */}
        <div className="details-image">
          <img src={medicine.image} alt={medicine.name} />
          {discountPercentage > 0 && (
            <div className="discount-badge-large">{discountPercentage}% OFF</div>
          )}
        </div>

        {/* Product Information */}
        <div className="details-info">
          <div className="product-header">
            <span className="brand-tag">{medicine.brand}</span>
            <h1>{medicine.name}</h1>
            <p className="category-tag">{medicine.category}</p>
          </div>

          {/* Rating */}
          <div className="rating-section">
            <span className="rating-stars">⭐ {medicine.rating}</span>
            <span className="review-count">({medicine.reviews} reviews)</span>
          </div>

          {/* Stock Status */}
          <div
            className={`stock-section ${
              medicine.stock > 0 ? 'in-stock' : 'out-of-stock'
            }`}
          >
            {medicine.stock > 0 ? (
              <>
                <span className="stock-status">✓ In Stock</span>
                <span className="stock-count">({medicine.stock} available)</span>
              </>
            ) : (
              <span className="stock-status">Out of Stock</span>
            )}
          </div>

          {/* Pricing */}
          <div className="pricing-section">
            <div className="price">
              <span className="current-price">₹{medicine.price}</span>
              <span className="original-price">₹{medicine.originalPrice}</span>
              <span className="save-amount">
                Save ₹{medicine.originalPrice - medicine.price}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="product-description">{medicine.description}</p>

          {/* Quantity and Action Buttons */}
          <div className="action-section">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button
              className="add-to-cart-btn-large"
              onClick={handleAddToCart}
              disabled={medicine.stock === 0}
            >
              {medicine.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
            </button>

            <button
              className={`wishlist-btn-large ${inWishlist ? 'active' : ''}`}
              onClick={handleWishlist}
            >
              {inWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>

          {/* Benefits */}
          <div className="benefits">
            <div className="benefit">
              <span>🚚</span> Free Delivery on orders above ₹500
            </div>
            <div className="benefit">
              <span>💳</span> Multiple Payment Options
            </div>
            <div className="benefit">
              <span>✅</span> 100% Authentic Medicines
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs-section">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab-btn ${activeTab === 'composition' ? 'active' : ''}`}
            onClick={() => setActiveTab('composition')}
          >
            Composition
          </button>
          <button
            className={`tab-btn ${activeTab === 'usage' ? 'active' : ''}`}
            onClick={() => setActiveTab('usage')}
          >
            Usage & Side Effects
          </button>
          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === 'description' && (
            <div className="tab-pane">
              <h3>Description</h3>
              <p>{medicine.description}</p>
              <h4>Manufacturer</h4>
              <p>{medicine.manufacturer}</p>
            </div>
          )}

          {activeTab === 'composition' && (
            <div className="tab-pane">
              <h3>Composition</h3>
              <p>{medicine.composition}</p>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="tab-pane">
              <h3>Usage Instructions</h3>
              <p>{medicine.usage}</p>
              <h3 style={{ marginTop: '20px' }}>Side Effects</h3>
              <p>{medicine.sideEffects}</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-pane">
              <h3>Customer Reviews</h3>
              <div className="reviews-container">
                <div className="review">
                  <div className="review-header">
                    <strong>John Doe</strong>
                    <span className="review-rating">⭐⭐⭐⭐⭐</span>
                  </div>
                  <p>Great product! Very effective and fast delivery.</p>
                </div>
                <div className="review">
                  <div className="review-header">
                    <strong>Jane Smith</strong>
                    <span className="review-rating">⭐⭐⭐⭐</span>
                  </div>
                  <p>Good quality medicine. Highly recommended.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      <div className="back-button">
        <button onClick={() => navigate('/listing')}>← Back to Medicines</button>
      </div>
    </div>
  );
};

export default ProductDetails;
