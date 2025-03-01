// src/components/Slider.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./slider.css";

const Slider = () => {
  const collections = [
    { image: "https://i.ibb.co/NsHKvHh/Whats-App-Image-2025-01-13-at-12-35-01-PM-1.jpg", name: "Poise Collection", id: "poisecollection" },
    { image: "https://i.ibb.co/y2wMWJD/NUDE-COVER-1.jpg", name: "Nude Collection", id: "nudecollection" },
    { image: "https://i.ibb.co/GQsGsYKV/Lumin-Bradley-Cover-1.jpg", name: "Lumin Collection", id: "lumincolection" },
    { image: "https://i.ibb.co/XfggfzMS/COVER-PICTURE-2.jpg", name: "Custom Native", id: "customnative" },
    { image: "https://i.ibb.co/GvL5BBT8/BT-02-80-000.jpg", name: "Beach Time Collection", id: "beachtimecollection" },
  ];

  return (
    <div id="app">
      <h1 className="heading">Our Collections</h1>
      <Swiper
        slidesPerView={3} // Show 3 slides at once
        spaceBetween={10}
        slidesOffsetAfter={50} // Peek the next slide slightly
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 1, // 1 slide on small mobile screens
            slidesOffsetAfter: 30,
          },
          768: {
            slidesPerView: 3, // 3 slides on desktop
            slidesOffsetAfter: 50,
          },
        }}
      >
        {collections.map((collection, index) => (
          <SwiperSlide key={index} className="collection-slide">
            <Link to={`/shopall/${collection.id}`} className="collection-link">
              <div className="collection-content">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="collection-image"
                />
                <div className="collection-text">
                  <h3>{collection.name}</h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;