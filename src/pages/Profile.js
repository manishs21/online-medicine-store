import React, { useState, useEffect } from 'react';
import { useMedicineContext } from '../context/MedicineContext';
import '../styles/profile.css';

const Profile = () => {
  const { user, wishlist } = useMedicineContext();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  if (!user) {
    return (
      <div className="profile-page">
        <div className="not-logged-in">
          <h2>Please login to view your profile</h2>
          <a href="/login">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-card">
            <div className="profile-avatar">👤</div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

          <nav className="profile-nav">
            <button
              className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 My Orders
            </button>
            <button
              className={`nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              🤍 Wishlist ({wishlist.length})
            </button>
            <button
              className={`nav-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              👤 Personal Details
            </button>
            <button
              className={`nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              📍 Saved Addresses
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="profile-content">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <section className="tab-section">
              <h2>My Orders</h2>
              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.orderId} className="order-card">
                      <div className="order-header">
                        <div>
                          <h3>{order.orderId}</h3>
                          <p>{order.date}</p>
                        </div>
                        <div className="order-status">
                          <span className={`status ${order.status.toLowerCase()}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="order-items">
                        {order.items.slice(0, 3).map((item) => (
                          <p key={item.id}>
                            {item.name} x{item.quantity}
                          </p>
                        ))}
                        {order.items.length > 3 && (
                          <p>+{order.items.length - 3} more items</p>
                        )}
                      </div>

                      <div className="order-footer">
                        <p className="order-total">
                          Total: <strong>₹{order.total}</strong>
                        </p>
                        <button className="order-details-btn">View Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No orders yet</p>
                  <a href="/listing">Start Shopping</a>
                </div>
              )}
            </section>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <section className="tab-section">
              <h2>My Wishlist</h2>
              {wishlist.length > 0 ? (
                <div className="wishlist-grid">
                  {wishlist.map((item) => (
                    <div key={item.id} className="wishlist-item">
                      <img src={item.image} alt={item.name} />
                      <h3>{item.name}</h3>
                      <p className="brand">{item.brand}</p>
                      <p className="price">₹{item.price}</p>
                      <a href={`/product/${item.id}`} className="view-btn">
                        View Product
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>Your wishlist is empty</p>
                  <a href="/listing">Browse Medicines</a>
                </div>
              )}
            </section>
          )}

          {/* Personal Details Tab */}
          {activeTab === 'details' && (
            <section className="tab-section">
              <h2>Personal Details</h2>
              <div className="details-form">
                <div className="form-group">
                  <label>Name</label>
                  <p>{user.name}</p>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <p>{user.phone || 'Not provided'}</p>
                </div>
              </div>
            </section>
          )}

          {/* Saved Addresses Tab */}
          {activeTab === 'addresses' && (
            <section className="tab-section">
              <h2>Saved Addresses</h2>
              {user.address ? (
                <div className="address-card">
                  <p>{user.address}</p>
                  <p>{user.city}, {user.state} {user.zipcode}</p>
                </div>
              ) : (
                <div className="empty-state">
                  <p>No saved addresses</p>
                  <a href="/checkout">Add Address</a>
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
