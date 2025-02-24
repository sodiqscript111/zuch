import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required modules
import { Navigation, Pagination } from "swiper/modules";

import "./slider.css";

const Slider= ()=> {
  const collections = [
    {
      image: "https://i.ibb.co/NsHKvHh/Whats-App-Image-2025-01-13-at-12-35-01-PM-1.jpg",
      name: "Collection One",
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
                <button className="explore-button">Explore Collection</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;