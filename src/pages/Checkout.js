import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedicineContext } from '../context/MedicineContext';
import { toast } from 'react-toastify';
import '../styles/checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, cart, getCartTotal, clearCart } = useMedicineContext();
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipcode: user?.zipcode || '',
  });

  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryCharge;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const { firstName, lastName, email, phone, address, city, state, zipcode } =
      formData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !zipcode
    ) {
      toast.error('Please fill all required fields', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      return false;
    }
    return true;
  };

  // Place order
  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate order processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate Order ID
      const orderId = `ORD-${Date.now()}`;

      // Save order to localStorage
      const orderData = {
        orderId,
        date: new Date().toLocaleDateString(),
        items: cart,
        subtotal: subtotal,
        deliveryCharge: deliveryCharge,
        total: total,
        deliveryOption,
        paymentMethod,
        address: formData,
        status: 'Confirmed',
      };

      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart and navigate
      clearCart();
      setIsProcessing(false);

      // Navigate to success page with orderId
      navigate(`/order-success/${orderId}`);
    } catch (error) {
      toast.error('Failed to place order. Please try again.', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/listing')}>Start Shopping</button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="checkout-page">
        <div className="login-required">
          <h2>Login Required</h2>
          <p>Please login to proceed with checkout</p>
          <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Delivery Address */}
        <div className="checkout-section">
          <h2>📍 Delivery Address</h2>
          <form className="address-form">
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />

            <textarea
              name="address"
              placeholder="Address (House No., Street, Area)"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              required
            ></textarea>

            <div className="form-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="zipcode"
                placeholder="Zip Code"
                value={formData.zipcode}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        </div>

        {/* Delivery Options */}
        <div className="checkout-section">
          <h2>🚚 Delivery Options</h2>
          <div className="options">
            <label className="option-label">
              <input
                type="radio"
                name="delivery"
                value="standard"
                checked={deliveryOption === 'standard'}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <div>
                <strong>Standard Delivery</strong>
                <p>5-7 business days</p>
              </div>
            </label>

            <label className="option-label">
              <input
                type="radio"
                name="delivery"
                value="express"
                checked={deliveryOption === 'express'}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              <div>
                <strong>Express Delivery</strong>
                <p>2-3 business days (+₹100)</p>
              </div>
            </label>
          </div>
        </div>

        {/* Payment Options */}
        <div className="checkout-section">
          <h2>💳 Payment Method</h2>
          <div className="options">
            <label className="option-label">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div>
                <strong>UPI</strong>
                <p>Google Pay, PhonePe, PayTM</p>
              </div>
            </label>

            <label className="option-label">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div>
                <strong>Debit/Credit Card</strong>
                <p>Visa, Mastercard, American Express</p>
              </div>
            </label>

            <label className="option-label">
              <input
                type="radio"
                name="payment"
                value="netbanking"
                checked={paymentMethod === 'netbanking'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div>
                <strong>Net Banking</strong>
                <p>All major banks</p>
              </div>
            </label>

            <label className="option-label">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <div>
                <strong>Cash on Delivery</strong>
                <p>Pay when you receive</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="order-summary">
        <h2>Order Summary</h2>

        {/* Items */}
        <div className="summary-items">
          {cart.map((item) => (
            <div key={item.id} className="summary-item">
              <span>{item.name} x{item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="summary-pricing">
          <div className="pricing-row">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="pricing-row">
            <span>Delivery:</span>
            <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
          </div>
          <div className="pricing-row total">
            <span>Total Amount:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          className="place-order-btn"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? '⏳ Processing...' : '✓ Place Order'}
        </button>

        <button
          className="back-btn"
          onClick={() => navigate('/cart')}
          disabled={isProcessing}
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default Checkout;
