import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './home.css'; // Import styles
import axios from 'axios'; // Import axios
import { Link, useHistory } from 'react-router-dom'; // Import Link and useHistory from react-router-dom

const Login = () => {
  const history = useHistory(); // Get history object for redirection

  // State for form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Update form data when input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to localhost/login
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log(response.data); // Log the response from the server
      if (response.data.message === 'Login successful') {
        history.push('/upload'); // Redirect to Upload Photo page on successful login
      }
    } catch (error) {
      console.error(error); // Log any errors
      alert('Login failed'); // Prompt for failed login
    }
  };

  return (
    <div className="home-container">
      <Helmet>
        <title>Login - Skinfy</title>
        <meta property="og:title" content="Burly Austere Cattle" />
      </Helmet>

      {/* Header */}
      <div className="home-header">
        <header
          data-thq="thq-navbar"
          className="navbarContainer home-navbar-interactive"
        >
          <span className="logo">SKINFY</span>
          <div data-thq="thq-navbar-nav" className="home-desktop-menu">
            <nav className="home-links"></nav>
            <div className="home-buttons">
              {/* Link to the Login page */}
              <Link to="/login" className="home-login buttonFlat">Login</Link>
              <Link to="/register" className="buttonFilled">Register</Link>
            </div>
          </div>
          {/* Burger menu and mobile menu code */}
        </header>
      </div>

      {/* Login form */}
      <div className="home-container02">
        <h2 className="home-features-heading heading2">Login</h2>
        <form onSubmit={handleSubmit}> {/* Add onSubmit event handler */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className="buttonFilled" type="submit">Login</button>
        </form>
      </div>

      {/* Footer */}
      <div className="home-footer">
        <footer className="footerContainer home-footer1">
          <div className="home-container08">
            <span className="logo">SKINFY</span>
            <nav className="home-nav1">
              <span className="bodySmall">Home</span>
              <span className="home-nav221 bodySmall">About</span>
              <span className="home-nav321 bodySmall">Login</span>
              <span className="home-nav421 bodySmall">Register</span>
              <span className="home-nav521 bodySmall">Blog</span>
            </nav>
          </div>
          {/* Other footer content */}
        </footer>
      </div>
    </div>
  );
}

export default Login;
