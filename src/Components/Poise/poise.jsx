import React from 'react';
import { Link } from 'react-router-dom';
import './poise.css'; // Ensure to style this component

const Poise = () => {
  return (
    <div 
      className="poise-collection-container"
      style={{ 
        backgroundImage: 'url(https://i.ibb.co/bR26RNfk/POISE-WHITE-100k.webp)', 
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
        <Link to="/shopall" className="poise-link">Explore New Collection</Link>
      </div>
    </div>
  );
};

export default Poise;
