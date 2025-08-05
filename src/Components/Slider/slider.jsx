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
  // Hardcoded collections with image URLs
  const collections = [
    { id: "streetvouge", name: "Street Vogue Collection", imageUrl: "https://i.ibb.co/8CPLg8y/IMG-3660.jpg" },
    { id: "ray", name: "Ray Collection", imageUrl: "https://i.imghippo.com/files/vLxN1087MI.jpg" },
    { id: "CityAce", name: "City Ace", imageUrl: "https://i.imghippo.com/files/IsT9437GV.jpg" },
    { id: "nobles", name: "Neutral Nobles", imageUrl: "https://i.imghippo.com/files/OCXO9377avY.jpg" },
    { id: "beachtimecollection", name: "Beach Time Collection", imageUrl: "https://i.ibb.co/DgtPw0XD/BT-02-80-000.jpg" },
    { id: "customnative", name: "Custom Native Collection", imageUrl: "https://i.ibb.co/XfggfzMS/COVER-PICTURE-2.jpg" },
    { id:  "amorcollection", name: "Amor Collection", imageUrl: "https://i.ibb.co/XxspVB9f/AMOR-COLLECTION-COVER-1.jpg" },
    { id: "nudecolection", name: "Nude Collection", imageUrl: "https://i.ibb.co/wr7DsVDT/NUDE-COVER-3.jpg" },
    { id: "zuchclassics", name: "Zuch Classics Collection", imageUrl: "https://i.ibb.co/zWQQj6Fm/IMG-3553.jpg" },
    { id: "poisecollection", name: "Poise Collection", imageUrl: "https://i.ibb.co/xqTxkYw7/POISE-WHITE-100k-1.jpg" },
    { id: "lumincolection", name: "Lumin Collection", imageUrl: "https://i.ibb.co/kVFp7P6F/Lumin-Collection-Cover-2.jpg" },
  ];

  return (
    <div id="app">
      <h1 className="heading">Our Collections</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={40}
        slidesOffsetAfter={50}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1, slidesOffsetAfter: 30 },
          768: { slidesPerView: Math.min(collections.length, 3), slidesOffsetAfter: 50 },
        }}
      >
        {collections.map((collection, index) => (
          <SwiperSlide key={index} className="collection-slide">
            <Link to={`/shopall/${collection.id}`} className="collection-link">
              <div className="collection-content">
                <img
                  src={collection.imageUrl}
                  alt={collection.name}
                  className="collection-image"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { 
                    console.log(`Image failed for ${collection.id}: ${collection.imageUrl}`);
                    e.target.src = "https://placehold.co/150x150"; 
                  }}
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