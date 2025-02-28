// components/Slider.jsx
import React from "react";
import { Link } from "react-router-dom"; // Add Link import
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./slider.css";

const Slider = () => {
  const collections = [
    {
      image: "https://i.ibb.co/NsHKvHh/Whats-App-Image-2025-01-13-at-12-35-01-PM-1.jpg",
      name: "Poise Collection",
    },
    {
      image: "https://i.ibb.co/y2wMWJD/NUDE-COVER-1.jpg",
      name: "Nude Collection",
    },
    {
      image: "https://i.ibb.co/GQsGsYKV/Lumin-Collection-Cover-1.jpg",
      name: "Lumin Collection",
    },
    {
      image: "https://i.ibb.co/XfggfzMS/COVER-PICTURE-2.jpg",
      name: "Custom Native",
    },
    {
      image: "https://i.ibb.co/GvL5BBT8/BT-02-80-000.jpg",
      name: "Beach Time Collection",
    },
    ,
    {
      image: "https://i.ibb.co/2TdktXF/IMG-3663.jpg",
      name: "Street Vouge (Urban)",
    },
    {
      image: "https://i.ibb.co/MDQLDvjt/IMG-3532.jpg",
      name: "Street Vouge (Smart & Classy)",
    },
    {
      image: "https://i.ibb.co/DfPVK57W/IMG-3523.jpg",
      name: "Street Vouge (Casual)",
    },
    {
      image: "https://i.ibb.co/XxspVB9f/AMOR-COLLECTION-COVER-1.jpg",
      name: "Amor",
    },
    {
      image: "https://i.ibb.co/zWQQj6Fm/IMG-3553.jpg",
      name: "Zuch Classic",
    }
  ];

  return (
    <div id="app">
      <h1 className="heading">Our Collections</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          768: { slidesPerView: 3 }, // 3 slides on desktop
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {collections.map((collection, index) => (
          <SwiperSlide key={index} className="collection-slide">
            <div className="collection-content">
              <img
                src={collection.image}
                alt={collection.name}
                className="collection-image"
              />
              <div className="collection-overlay">
                <h3>{collection.name}</h3>
                <Link to="/shopall">
                  <button className="explore-button">Explore Collection</button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;