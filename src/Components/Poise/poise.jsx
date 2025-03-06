// src/components/Poise.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import headerOnePic from "../../assets/headerpicone.jpg"
import headerTwoPic from "../../assets/headerpictwo.jpg"
import headerThreePic from "../../assets/headerpicthree.jpg"
import headerFourPic from "../../assets/headerpicfour.jpg"
import './poise.css';

const Poise = () => {
  const images = [
    headerOnePic,
    headerTwoPic,
    headerThreePic,
    headerFourPic,
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