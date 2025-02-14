import React from 'react';
import './comingsoon.css'; // Import the CSS file

const ComingSoon = () => {
  const images = [
    "https://i.ibb.co/mc6hSTy/Whats-App-Image-2025-01-13-at-12-35-01-PM.jpg",
    "https://i.ibb.co/61HgGV6/Whats-App-Image-2025-01-13-at-12-35-00-PM-1.jpg",
    "https://i.ibb.co/NsHKvHh/Whats-App-Image-2025-01-13-at-12-35-01-PM-1.jpg",
    "https://i.ibb.co/QJbzDtB/Whats-App-Image-2025-01-13-at-12-35-01-PM-3.jpg"
  ];

  const handlePreOrderClick = () => {
    window.location.href = "https://www.instagram.com/zuch_collection/";
  };

  return (
    <div className="coming-soon-container">
      {/* Image Carousel at the Top */}
      <div className="carousel">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Clothing ${index + 1}`}
          />
        ))}
      </div>

      {/* Text Below the Image */}
      <h1>Coming Soon</h1>
      <p>We're working hard to bring you something amazing. Stay tuned!</p>

      {/* Pre-Order Button */}
      <button className="pre-order-button" onClick={handlePreOrderClick}>
        Pre-Order Now
      </button>
    </div>
  );
};

export default ComingSoon;