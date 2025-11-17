import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMedicineContext } from '../context/MedicineContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logoutUser, getCartCount } = useMedicineContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking on nav links
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = (searchTerm || '').trim();
    if (q.length > 0) {
      navigate(`/listing?search=${encodeURIComponent(q)}`);
    } else {
      navigate('/listing');
    }
    setSearchTerm('');
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    setIsMobileMenuOpen(false);
    window.location.href = '/';
  };

  // Only show search on non-home pages
  const showSearch = location.pathname !== '/';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={handleNavClick}>
          💊 MediStore
        </Link>

        {/* Menu Toggle for Mobile */}
        <button
          className="menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          ☰
        </button>

        {/* Search Bar - Only on non-home pages */}
        {showSearch && (
          <form className="search-bar" onSubmit={handleSearch} role="search">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              aria-label="Search medicines"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" aria-label="Search" disabled={!searchTerm.trim()}>
              Search
            </button>
          </form>
        )}

        {/* Navigation Links */}
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={handleNavClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/listing" onClick={handleNavClick}>
              Medicines
            </Link>
          </li>
          {user && user.role === 'admin' && (
            <li>
              <Link to="/admin" onClick={handleNavClick}>
                Admin
              </Link>
            </li>
          )}
          {user && user.role !== 'admin' && (
            <>
              <li>
                <Link to="/profile" onClick={handleNavClick}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/orders" onClick={handleNavClick}>
                  Orders
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/cart" className="cart-link" onClick={handleNavClick}>
              🛒 Cart ({getCartCount()})
            </Link>
          </li>
          {user ? (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout ({user.name})
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={handleNavClick}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="signup-btn" onClick={handleNavClick}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
