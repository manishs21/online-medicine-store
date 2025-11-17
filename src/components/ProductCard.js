import React from 'react';
import { Link } from 'react-router-dom';
import { useMedicineContext } from '../context/MedicineContext';
import { toast } from 'react-toastify';
import '../styles/productcard.css';

const ProductCard = ({ medicine }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useMedicineContext();
  const inWishlist = isInWishlist(medicine.id);

  const handleAddToCart = () => {
    addToCart(medicine);
    toast.success(`${medicine.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(medicine.id);
      toast.info(`${medicine.name} removed from wishlist`, {
        position: 'bottom-right',
        autoClose: 2000,
      });
    } else {
      addToWishlist(medicine);
      toast.success(`${medicine.name} added to wishlist!`, {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  const discountPercentage = Math.round(
    ((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100
  );

  return (
    <div className="product-card">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="discount-badge">{discountPercentage}% OFF</div>
      )}

      {/* Wishlist Heart */}
      <button
        className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
        onClick={handleWishlist}
        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        ♡
      </button>

      {/* Product Image */}
      <Link to={`/product/${medicine.id}`} className="product-image-link">
        <img src={medicine.image} alt={medicine.name} className="product-image" />
      </Link>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-brand">{medicine.brand}</div>

        <Link to={`/product/${medicine.id}`} className="product-name-link">
          <h3 className="product-name">{medicine.name}</h3>
        </Link>

        <p className="product-description">{medicine.description}</p>

        {/* Rating */}
        <div className="product-rating">
          <span className="stars">⭐ {medicine.rating}</span>
          <span className="reviews">({medicine.reviews} reviews)</span>
        </div>

        {/* Stock Status */}
        <div className={`stock-status ${medicine.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
          {medicine.stock > 0 ? `In Stock (${medicine.stock})` : 'Out of Stock'}
        </div>

        {/* Pricing */}
        <div className="product-pricing">
          <span className="current-price">₹{medicine.price}</span>
          {medicine.originalPrice && (
            <span className="original-price">₹{medicine.originalPrice}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={medicine.stock === 0}
        >
          {medicine.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
