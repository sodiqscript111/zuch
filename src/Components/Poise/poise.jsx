// src/components/Poise.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import headerOnePic from '../../assets/headerpicone.jpg'; // Static first image
import './poise.css';

const Poise = () => {
  // Lazy-load subsequent images
  const [lazyImages, setLazyImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const [headerTwoPic, headerThreePic, headerFourPic] = await Promise.all([
        import('../../assets/headerpictwo.jpg'),
        import('../../assets/headerpicthree.jpg'),
        import('../../assets/headerpicfour.jpg'),
      ]);
      setLazyImages([
        headerTwoPic.default,
        headerThreePic.default,
        headerFourPic.default,
      ]);
    };
    loadImages();
  }, []);

  // Memoize images array
  const images = useMemo(() => [
    headerOnePic,
    ...(lazyImages.length ? lazyImages : [headerOnePic, headerOnePic, headerOnePic]), // Fallback
  ], [lazyImages]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`poise-collection-container image-${currentImageIndex}`}>
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