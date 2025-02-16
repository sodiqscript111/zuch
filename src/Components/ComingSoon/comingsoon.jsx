import React, { useRef, useEffect } from "react";
import "./comingsoon.css"; // Import the CSS file

const ComingSoon = () => {
  const images = [
    "https://i.ibb.co/mc6hSTy/Whats-App-Image-2025-01-13-at-12-35-01-PM.jpg",
    "https://i.ibb.co/61HgGV6/Whats-App-Image-2025-01-13-at-12-35-00-PM-1.jpg",
    "https://i.ibb.co/NsHKvHh/Whats-App-Image-2025-01-13-at-12-35-01-PM-1.jpg",
    "https://i.ibb.co/QJbzDtB/Whats-App-Image-2025-01-13-at-12-35-01-PM-3.jpg",
    "https://i.ibb.co/SXqz6s6K/image2.jpg",
    "https://i.ibb.co/gbZ0LrP4/image3.jpg",
    "https://i.ibb.co/VYM60vnJ/image4.jpg",
  ];

  const carouselRef = useRef(null);
  const carouselInnerRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const carouselInner = carouselInnerRef.current;
    if (!carousel || !carouselInner) return;

    let scrollSpeed = 1; // Adjust speed as needed
    let requestId;

    const scrollCarousel = () => {
      carousel.scrollLeft += scrollSpeed;

      if (carousel.scrollLeft >= carouselInner.scrollWidth / 2) {
        carousel.scrollLeft = 0;
      }

      requestId = requestAnimationFrame(scrollCarousel);
    };

    carousel.scrollLeft = 0;
    requestId = requestAnimationFrame(scrollCarousel);

    return () => cancelAnimationFrame(requestId);
  }, []);

  const handlePreOrderClick = () => {
    window.location.href = "https://www.instagram.com/zuch_collection/";
  };

  return (
    <div className="coming-soon-container">
      <img
        src="https://i.ibb.co/1JQZ15Nx/logo.png"
        alt="Brand Logo"
        className="logo"
      />

      {/* Image Carousel */}
      <div className="carousel" ref={carouselRef}>
        <div className="carousel-inner" ref={carouselInnerRef}>
          {[...images, ...images].map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index + 1}`} />
          ))}
        </div>
      </div>

      <h1>Coming Soon</h1>
      <p>We're working hard to bring you something amazing. Stay tuned!</p>

      <button className="pre-order-button" onClick={handlePreOrderClick}>
        Pre-Order Now
      </button>
    </div>
  );
};

export default ComingSoon;
