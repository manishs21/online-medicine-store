import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            MediStore is your trusted online medicine platform providing
            quality medicines and healthcare products at affordable prices.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/listing">Medicines</Link>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li>
              <Link to="/listing?category=Tablet">Tablets</Link>
            </li>
            <li>
              <Link to="/listing?category=Syrup">Syrups</Link>
            </li>
            <li>
              <Link to="/listing?category=Injection">Injections</Link>
            </li>
            <li>
              <Link to="/listing?category=Ayurveda">Ayurveda</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📞 Phone: 1-800-MEDICINE</p>
          <p>📧 Email: support@medistore.com</p>
          <p>📍 Address: Healthcare Center, Medical City</p>
          <div className="social-links">
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
            <a href="#instagram">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 MediStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
