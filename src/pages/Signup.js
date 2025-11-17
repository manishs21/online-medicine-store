import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMedicineContext } from '../context/MedicineContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { loginUser } = useMedicineContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate email
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phone
    ) {
      toast.error('Please fill all required fields', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Invalid email format', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      return;
    }

    if (formData.phone.length < 10) {
      toast.error('Phone number must be at least 10 digits', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Call backend API to register user in MongoDB
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      // Create user object for localStorage
      const userData = {
        id: response.data._id || response.data.userId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        role: 'user',
      };

      loginUser(userData);
      toast.success('Account created successfully! Welcome to MediStore!', {
        position: 'bottom-right',
        autoClose: 2000,
      });
      navigate('/');
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Signup failed. Please try again.';
      toast.error(errorMsg, {
        position: 'bottom-right',
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <h1>Create MediStore Account</h1>
          <p>Sign up to start shopping</p>

          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Address (Optional)</label>
              <textarea
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
                rows="2"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
