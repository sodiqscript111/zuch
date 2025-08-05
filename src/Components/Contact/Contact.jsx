// components/Contact.jsx
import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <div className="contact-container">
        <h2>ZUCH: CONTACT</h2>
        <ul className="contact-details">
          <li>
            <span className="contact-label">Phone Number:</span>
            <a href="tel:+2348062389233" className="contact-link">08062389233</a>
          </li>
          <li>
            <span className="contact-label">Address:</span>
            <span>5 Adebiaye Street, Yaba, Lagos</span>
          </li>
          <li>
            <span className="contact-label">Email:</span>
            <a href="mailto:Zuchstitches@gmail.com" className="contact-link">Zuchstitches@gmail.com</a>
          </li>
          <li>
            <span className="contact-label">Instagram:</span>
            <a href="https://instagram.com/Zuch_Collection" target="_blank" rel="noopener noreferrer" className="contact-link">@Zuch_Collection</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;