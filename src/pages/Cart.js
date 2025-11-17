import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedicineContext } from '../context/MedicineContext';
import { toast } from 'react-toastify';
import '../styles/cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, clearCart, getCartTotal } =
    useMedicineContext();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const finalTotal = subtotal - discount + deliveryCharge;

  // Apply coupon
  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      const discountAmount = subtotal * 0.1; // 10% discount
      setDiscount(discountAmount);
      toast.success('Coupon applied! 10% discount saved', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      setCouponCode('');
    } else if (couponCode.toUpperCase() === 'SAVE20') {
      const discountAmount = subtotal * 0.2; // 20% discount
      setDiscount(discountAmount);
      toast.success('Coupon applied! 20% discount saved', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      setCouponCode('');
    } else {
      toast.error('Invalid coupon code', {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Start adding some medicines to your cart</p>
          <button onClick={() => navigate('/listing')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Cart Items */}
        <div className="cart-items-section">
          <h1>Shopping Cart ({cart.length} items)</h1>

          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-brand">{item.brand}</p>
                  <p className="item-price">₹{item.price}</p>
                </div>

                <div className="item-quantity">
                  <label>Quantity:</label>
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        updateCartQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="item-total">
                  <p>₹{item.price * item.quantity}</p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.info('Item removed from cart', {
                      position: 'bottom-right',
                      autoClose: 2000,
                    });
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Clear Cart Button */}
          <button
            className="clear-cart-btn"
            onClick={() => {
              clearCart();
              toast.info('Cart cleared', {
                position: 'bottom-right',
                autoClose: 2000,
              });
            }}
          >
            Clear Cart
          </button>
        </div>

        {/* Price Summary */}
        <div className="price-summary-section">
          {/* Coupon Code */}
          <div className="coupon-section">
            <h3>Apply Coupon</h3>
            <p className="coupon-hint">Try: SAVE10 or SAVE20</p>
            <div className="coupon-input">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={applyCoupon}>Apply</button>
            </div>
          </div>

          {/* Price Details */}
          <div className="price-details">
            <h2>Price Details</h2>

            <div className="price-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="price-row discount">
                <span>Discount:</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}

            <div className="price-row">
              <span>Delivery Charge:</span>
              <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
            </div>

            {deliveryCharge === 0 && (
              <p className="free-delivery-msg">Free delivery on this order!</p>
            )}

            <div className="price-row final-total">
              <span>Final Total:</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>

          {/* Continue Shopping */}
          <button
            className="continue-shopping-btn"
            onClick={() => navigate('/listing')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
