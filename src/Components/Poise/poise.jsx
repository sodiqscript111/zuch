// src/components/Poise.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './poise.css';

const Poise = () => {
  const images = [
    'https://i.ibb.co/bR26RNfk/POISE-WHITE-100k.webp',
    'https://i.ibb.co/wDH2f6J/IMG-3663.jpg',
    'https://i.ibb.co/DPPcQVsv/IMG-1461.jpg',
    'https://i.ibb.co/TMgS4MQP/Lumin-blue-80k-1.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div 
      className="poise-collection-container"
      style={{ 
        backgroundImage: `url(${images[currentImageIndex]})`, 
        backgroundSize: 'cover', 
        width: '100%', 
        height: '85vh',
        position: 'relative',
        overflowY: 'hidden',
        color: '#fff', 
        backgroundPosition: '0% 20%',
      }}
    >
      <div className="poise-content">
        <h1 className="poise-heading">SHOP OUR TOP NOTCH CLASSIC WEARS</h1>
        <p className="poise-description">
          Our collection is the synthesis of harmonious elements of playful elegance.
        </p>
        <Link to="/shopall" className="poise-link">Shop Now</Link>
      </div>
    </div>
  );
};

export default Poise;