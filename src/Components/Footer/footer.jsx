// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Navigation</h3>
          <ul className="footer-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shopall">Shop All</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Phone: <a href="tel:+2348062389233">08062389233</a></p>
          <p>Address: 5 Adebiaye Street, Yaba, Lagos</p>
          <p>Email: <a href="mailto:Zuchstitches@gmail.com">Zuchstitches@gmail.com</a></p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>
            Instagram: <a href="https://instagram.com/Zuch_Collection" target="_blank" rel="noopener noreferrer">@Zuch_Collection</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ZUCH Collection. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;