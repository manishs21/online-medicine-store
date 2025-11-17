import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMedicineContext } from '../context/MedicineContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useMedicineContext();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields', {
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

    setIsLoading(true);

    try {
      // Call backend API to login
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // Check for admin login
      if (formData.email === 'admin@medistore.com') {
        loginUser({
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: 'admin',
          token: response.data.token,
        });
        toast.success('Admin login successful!', {
          position: 'bottom-right',
          autoClose: 2000,
        });
        navigate('/admin');
      } else {
        // Regular user login from MongoDB
        loginUser({
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: 'user',
          token: response.data.token,
        });
        toast.success('Login successful!', {
          position: 'bottom-right',
          autoClose: 2000,
        });
        navigate('/');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message || 'Login failed. Please try again.';
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
          <h1>Login to MediStore</h1>
          <p>Welcome back! Login to continue shopping</p>

          <form onSubmit={handleLogin}>
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
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="auth-btn" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="demo-credentials">
            <strong>Demo Admin:</strong> admin@medistore.com / password
          </p>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup">Sign Up here</Link>
            </p>
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
