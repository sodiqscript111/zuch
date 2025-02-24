import React from 'react';
import { Link } from 'react-router-dom';
import './poise.css'; // Ensure to style this component

const Poise = () => {
  return (
    <div 
      className="poise-collection-container"
      style={{ 
        backgroundImage: 'url(https://i.ibb.co/gMy244tL/POISE-BLACK-1-100k.jpg)', 
        backgroundSize: 'cover', 
        width: '100%', 
        height: '100vh',
        position: 'relative',
        overflowY: 'hidden',
        color: '#fff' 
      }}
    >
      <div className="poise-content">
        <h1 className="poise-heading">Poise Collection</h1>
        <p className="poise-description">
          The new collection is the synthesis of harmonious elements of playful elegance.
        </p>
        <Link to="/collections/poise" className="poise-link">Explore New Collection</Link>
      </div>
    </div>
  );
};

export default Poise;
