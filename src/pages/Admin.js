import React, { useState, useEffect } from 'react';
import { useMedicineContext } from '../context/MedicineContext';
import medicinesData from '../data/medicines.json';
import { toast } from 'react-toastify';
import '../styles/admin.css';

const Admin = () => {
  const { user } = useMedicineContext();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [medicines, setMedicines] = useState(medicinesData);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tablet',
    brand: '',
    price: '',
    stock: '',
    description: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: 'MediStore',
    heroHeading: 'Your Health, Our Priority',
    heroSubtext: 'Buy authentic medicines online with fast delivery',
    showOffers: true,
  });
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState({ image: '', link: '', text: '' });

  // Load orders
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
    // load site settings and banners
    const savedSettings = JSON.parse(localStorage.getItem('siteSettings') || 'null');
    if (savedSettings) setSiteSettings(savedSettings);
    const savedBanners = JSON.parse(localStorage.getItem('siteBanners') || '[]');
    setBanners(savedBanners);
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-page">
        <div className="unauthorized">
          <h2>Access Denied</h2>
          <p>Only admins can access this page</p>
          <a href="/">Back to Home</a>
        </div>
      </div>
    );
  }

  // Handle form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add or Update medicine
  const handleAddMedicine = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.brand ||
      !formData.price ||
      !formData.stock
    ) {
      toast.error('Please fill all required fields', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      return;
    }

    if (editingId) {
      // Update existing medicine
      setMedicines(
        medicines.map((m) =>
          m.id === editingId
            ? {
                ...m,
                name: formData.name,
                category: formData.category,
                brand: formData.brand,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                description: formData.description,
              }
            : m
        )
      );
      toast.success('Medicine updated!', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      setEditingId(null);
    } else {
      // Add new medicine
      const newMedicine = {
        id: Math.max(...medicines.map((m) => m.id)) + 1,
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        description: formData.description,
        image: 'https://via.placeholder.com/250x250?text=' + formData.name,
        rating: 4.0,
        reviews: 0,
        originalPrice: parseFloat(formData.price),
        discount: 0,
      };
      setMedicines([...medicines, newMedicine]);
      toast.success('Medicine added!', {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }

    setFormData({
      name: '',
      category: 'Tablet',
      brand: '',
      price: '',
      stock: '',
      description: '',
    });
  };

  // Delete medicine
  const handleDeleteMedicine = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(medicines.filter((m) => m.id !== id));
      toast.success('Medicine deleted!', {
        position: 'bottom-right',
        autoClose: 2000,
      });
    }
  };

  // Edit medicine
  const handleEditMedicine = (medicine) => {
    setFormData({
      name: medicine.name,
      category: medicine.category,
      brand: medicine.brand,
      price: medicine.price.toString(),
      stock: medicine.stock.toString(),
      description: medicine.description,
    });
    setEditingId(medicine.id);
  };

  // Dashboard Stats
  const totalProducts = medicines.length;
  const lowStockProducts = medicines.filter((m) => m.stock < 50).length;
  const totalOrders = orders.length;

  // Site management handlers
  const handleSiteChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSiteSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const saveSiteSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
    toast.success('Site settings saved', { position: 'bottom-right', autoClose: 2000 });
  };

  const handleBannerChange = (e) => {
    const { name, value } = e.target;
    setNewBanner((p) => ({ ...p, [name]: value }));
  };

  const addBanner = (e) => {
    e.preventDefault();
    if (!newBanner.image) {
      toast.error('Please provide an image URL for the banner', { position: 'bottom-right', autoClose: 2000 });
      return;
    }
    const next = [...banners, { id: Date.now(), ...newBanner }];
    setBanners(next);
    localStorage.setItem('siteBanners', JSON.stringify(next));
    setNewBanner({ image: '', link: '', text: '' });
    toast.success('Banner added', { position: 'bottom-right', autoClose: 2000 });
  };

  const deleteBanner = (id) => {
    if (!window.confirm('Delete this banner?')) return;
    const next = banners.filter((b) => b.id !== id);
    setBanners(next);
    localStorage.setItem('siteBanners', JSON.stringify(next));
    toast.success('Banner removed', { position: 'bottom-right', autoClose: 2000 });
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Sidebar Navigation */}
        <aside className="admin-sidebar">
          <h2>Admin Panel</h2>
          <nav>
            <button
              className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              📊 Dashboard
            </button>
            <button
              className={`nav-btn ${activeTab === 'medicines' ? 'active' : ''}`}
              onClick={() => setActiveTab('medicines')}
            >
              💊 Medicines
            </button>
            <button
              className={`nav-btn ${activeTab === 'site' ? 'active' : ''}`}
              onClick={() => setActiveTab('site')}
            >
              🛠️ Site
            </button>
            <button
              className={`nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              📦 Orders
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="admin-content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <section className="admin-section">
              <h2>Dashboard</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Medicines</h3>
                  <p className="stat-value">{totalProducts}</p>
                </div>
                <div className="stat-card">
                  <h3>Low Stock Products</h3>
                  <p className="stat-value alert">{lowStockProducts}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Orders</h3>
                  <p className="stat-value">{totalOrders}</p>
                </div>
                <div className="stat-card">
                  <h3>Revenue</h3>
                  <p className="stat-value">
                    ₹
                    {orders
                      .reduce((sum, order) => sum + order.total, 0)
                      .toFixed(0)}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Medicines Tab */}
          {activeTab === 'medicines' && (
            <section className="admin-section">
              <h2>{editingId ? 'Edit Medicine' : 'Add New Medicine'}</h2>

              {/* Add/Edit Form */}
              <form className="medicine-form" onSubmit={handleAddMedicine}>
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Medicine Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                    <option value="Ayurveda">Ayurveda</option>
                    <option value="Homeopathy">Homeopathy</option>
                    <option value="Equipment">Equipment</option>
                  </select>
                </div>

                <div className="form-row">
                  <input
                    type="text"
                    name="brand"
                    placeholder="Brand Name"
                    value={formData.brand}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleFormChange}
                    required
                  />
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows="3"
                ></textarea>

                <button type="submit" className="submit-btn">
                  {editingId ? 'Update Medicine' : 'Add Medicine'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        name: '',
                        category: 'Tablet',
                        brand: '',
                        price: '',
                        stock: '',
                        description: '',
                      });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </form>

              {/* Medicines List */}
              <h2 style={{ marginTop: '40px' }}>All Medicines</h2>
              <div className="medicines-table">
                <table>
                  <thead>
                    <tr>
                      <th>Preview</th>
                      <th>Name</th>
                      <th>Usage</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((medicine) => (
                      <tr key={medicine.id}>
                        <td>
                          <img
                            src={medicine.image}
                            alt={medicine.name}
                            style={{ height: 60, width: 60, objectFit: 'cover', borderRadius: 6 }}
                          />
                        </td>
                        <td>{medicine.name}</td>
                        <td style={{ maxWidth: 260 }}>{medicine.usage || medicine.description}</td>
                        <td>{medicine.brand}</td>
                        <td>{medicine.category}</td>
                        <td>₹{medicine.price}</td>
                        <td
                          className={
                            medicine.stock < 50 ? 'low-stock' : ''
                          }
                        >
                          {medicine.stock}
                        </td>
                        <td className="actions">
                          <button
                            className="edit-btn"
                            onClick={() => handleEditMedicine(medicine)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteMedicine(medicine.id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Orders Tab */}
          {activeTab === 'site' && (
            <section className="admin-section">
              <h2>Site Management</h2>

              <form className="medicine-form" onSubmit={saveSiteSettings}>
                <div className="form-row">
                  <input
                    type="text"
                    name="siteTitle"
                    placeholder="Site Title"
                    value={siteSettings.siteTitle}
                    onChange={handleSiteChange}
                  />
                  <input
                    type="text"
                    name="heroHeading"
                    placeholder="Hero Heading"
                    value={siteSettings.heroHeading}
                    onChange={handleSiteChange}
                  />
                </div>

                <textarea
                  name="heroSubtext"
                  placeholder="Hero Subtext"
                  value={siteSettings.heroSubtext}
                  onChange={handleSiteChange}
                  rows="2"
                ></textarea>

                <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input
                    type="checkbox"
                    name="showOffers"
                    checked={!!siteSettings.showOffers}
                    onChange={handleSiteChange}
                  />
                  Show Offers Section
                </label>

                <button type="submit" className="submit-btn">Save Site Settings</button>
              </form>

              <h3 style={{ marginTop: 30 }}>Homepage Banners</h3>
              <form className="medicine-form" onSubmit={addBanner}>
                <div className="form-row">
                  <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={newBanner.image}
                    onChange={handleBannerChange}
                  />
                  <input
                    type="text"
                    name="text"
                    placeholder="Alt / Text"
                    value={newBanner.text}
                    onChange={handleBannerChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="link"
                    placeholder="Link (optional)"
                    value={newBanner.link}
                    onChange={handleBannerChange}
                  />
                </div>
                <button className="submit-btn" type="submit">Add Banner</button>
              </form>

              <div style={{ marginTop: 20 }}>
                {banners.length === 0 ? (
                  <p>No banners added</p>
                ) : (
                  <div className="medicines-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Preview</th>
                          <th>Text</th>
                          <th>Link</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {banners.map((b) => (
                          <tr key={b.id}>
                            <td>
                              <img src={b.image} alt={b.text} style={{ height: 60 }} />
                            </td>
                            <td>{b.text}</td>
                            <td>{b.link || '-'}</td>
                            <td>
                              <button className="delete-btn" onClick={() => deleteBanner(b.id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {activeTab === 'orders' && (
            <section className="admin-section">
              <h2>Orders Management</h2>
              {orders.length > 0 ? (
                <div className="orders-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.orderId}>
                          <td>{order.orderId}</td>
                          <td>{order.date}</td>
                          <td>{order.items.length} items</td>
                          <td>₹{order.total}</td>
                          <td>
                            <span className="status-badge">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No orders yet</p>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
