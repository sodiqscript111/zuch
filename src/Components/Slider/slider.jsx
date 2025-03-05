// src/components/Slider.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { ProductContext } from "../../context/productContext"; // Ensure exact case match
import "./slider.css";

const Slider = () => {
  const { collections, products, loading: contextLoading } = useContext(ProductContext);
  const [collectionImages, setCollectionImages] = useState({});
  const [imageLoading, setImageLoading] = useState(true);

  // Manual renaming map for display (matches Firestore IDs from your data)
  const collectionNameMap = {
    "streetvouge": "Street Vogue Collection",
    "beachtime": "Beach Time Collection",
    "customnative": "Custom Native Collection",
    "amor": "Amor Collection",
    "nudecolection": "Nude Collection",
    "zuchclassics": "Zuch Classics Collection",
    "poisecollection": "Poise Collection",
    "lumincolection": "Lumin Collection",
  };

  useEffect(() => {
    const assignCollectionImages = () => {
      try {
        const images = {};
        for (const collection of collections) {
          // Find first product with this collectionId from products array
          const product = products.find(p => p.collectionId === collection.id);
          let imageUrl = "https://placehold.co/150x150"; // Default fallback
          if (product && product.imageUrl) {
            imageUrl = Array.isArray(product.imageUrl) && product.imageUrl.length > 0
              ? product.imageUrl[0]
              : product.imageUrl;
            console.log(`Assigned image for ${collection.id} from product:`, product);
          } else {
            console.warn(`No product with image found for ${collection.id}`);
          }
          images[collection.id] = imageUrl;
          console.log(`Set image for ${collection.id}: ${imageUrl}`);
        }
        setCollectionImages(images);
      } catch (error) {
        console.error("Error assigning collection images:", error);
      } finally {
        setImageLoading(false);
      }
    };

    if (!contextLoading && collections.length > 0 && products.length > 0) {
      console.log("Collections:", collections.map(c => c.id));
      console.log("Products available:", products.length);
      assignCollectionImages();
    }
  }, [collections, products, contextLoading]);

  if (contextLoading || imageLoading) {
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

  console.log("Collection Images:", collectionImages);

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
                  src={collectionImages[collection.id] || "https://placehold.co/150x150"}
                  alt={collectionNameMap[collection.id] || collection.name}
                  className="collection-image"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { 
                    console.log(`Image failed for ${collection.id}: ${collectionImages[collection.id]}`);
                    e.target.src = "https://placehold.co/150x150"; 
                  }}
                />
                <div className="collection-text">
                  <h3>{collectionNameMap[collection.id] || collection.name}</h3>
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