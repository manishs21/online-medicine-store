import React, { useState, useEffect } from 'react';
import '../styles/orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1>My Orders</h1>

        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.orderId} className="order-card-large">
                <div className="order-header-large">
                  <div>
                    <h3>{order.orderId}</h3>
                    <p>{order.date}</p>
                  </div>
                  <div className="order-status-badge">
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="order-body">
                  <div className="order-items-section">
                    <h4>Items:</h4>
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <span>{item.name}</span>
                        <span>x{item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-details-section">
                    <h4>Delivery Address:</h4>
                    <p>
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p>{order.address.address}</p>
                    <p>
                      {order.address.city}, {order.address.state}{' '}
                      {order.address.zipcode}
                    </p>
                  </div>
                </div>

                <div className="order-footer-large">
                  <div className="order-summary">
                    <p>
                      Subtotal: <span>₹{order.subtotal}</span>
                    </p>
                    <p>
                      Delivery: <span>{order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}</span>
                    </p>
                    <p className="total">
                      Total: <span>₹{order.total}</span>
                    </p>
                  </div>
                  <button className="track-btn">Track Order</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-orders">
            <p>No orders yet</p>
            <a href="/listing">Start Shopping</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
