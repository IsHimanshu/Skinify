import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './home.css'; // Import styles
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Register = (props) => {
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
      // Send POST request to localhost/register
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log(response.data); // Log the response from the server
      if (response.data.message ==='User registered successfully'){
        alert("User Registered")
      }
    } catch (error) {
      console.error(error); // Log any errors
    }
  };

  return (
    <div className="home-container">
      <Helmet>
        <title>Register - Skinfy</title>
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

      {/* Registration form */}
      <div className="home-container02">
        <h2 className="home-features-heading heading2">Register</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"> Email </label>
            <input
              type="text"
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
          <button className="buttonFilled" type="submit">Register</button>
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

export default Register;
