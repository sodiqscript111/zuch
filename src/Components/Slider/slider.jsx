// src/components/Slider.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { ProductContext } from "../../context/productContext";
import "./slider.css";

const Slider = () => {
  const { collections, loading } = useContext(ProductContext);

  if (loading) {
    return (
      <div id="app">
        <h1 className="heading">Our Collections</h1>
        <div className="skeleton-slider">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="skeleton-slide">
              <div className="skeleton-image"></div>
              <div className="skeleton-text"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id="app">
      <h1 className="heading">Our Collections</h1>
      <Swiper
        slidesPerView={3} // Default to 3, adjusts dynamically with breakpoints
        spaceBetween={10}
        slidesOffsetAfter={50}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1, slidesOffsetAfter: 30 },
          768: { slidesPerView: Math.min(collections.length, 3), slidesOffsetAfter: 50 }, // Max 3, or fewer if less collections
        }}
      >
        {collections.length > 0 ? (
          collections.map((collection, index) => (
            <SwiperSlide key={index} className="collection-slide">
              <Link to={`/shopall/${collection.id}`} className="collection-link">
                <div className="collection-content">
                  <img
                    src={collection.image || "https://via.placeholder.com/150"}
                    alt={collection.name}
                    className="collection-image"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                  />
                  <div className="collection-text">
                    <h3>{collection.name}</h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="no-collections">No collections available.</div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;