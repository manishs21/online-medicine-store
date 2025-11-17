import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ordersuccess.css';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="order-success-page">
      <div className="success-container">
        <div className="success-icon">✓</div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-message">
          Thank you for your order. Your medicines will be delivered soon.
        </p>

        <div className="order-id-section">
          <p>Order ID:</p>
          <h2>{orderId}</h2>
          <button
            className="copy-btn"
            onClick={() => {
              navigator.clipboard.writeText(orderId);
              alert('Order ID copied!');
            }}
          >
            Copy
          </button>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <ul>
            <li>✓ You will receive a confirmation email shortly</li>
            <li>✓ Your order is being prepared for shipment</li>
            <li>✓ You will get SMS updates about delivery</li>
            <li>✓ Track your order in the profile section</li>
          </ul>
        </div>

        <div className="action-buttons">
          <button
            className="continue-shopping-btn"
            onClick={() => navigate('/listing')}
          >
            Continue Shopping
          </button>
          <button className="orders-btn" onClick={() => navigate('/orders')}>
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
