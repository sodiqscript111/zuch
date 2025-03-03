// src/components/Slider.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { ProductContext } from "../../context/productContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import "./slider.css";

const Slider = () => {
  const { collections, loading: contextLoading } = useContext(ProductContext);
  const [collectionImages, setCollectionImages] = useState({});
  const [imageLoading, setImageLoading] = useState(true);

  // Manual renaming map for collections
  const collectionNameMap = {
    "streetvouge": "Street Vogue Collection",
    "beachtime": "Beach Time Collection",
    "customnative": "Custom Native Collection",
    "amor": "Amor Collection",
    "nudecolection": "Nude Collection",
    "zuchclassics": "Zuch Classics Collection",
    "poise": "Poise Collection",
    "lumincolection": "Lumin Collection",
  };

  useEffect(() => {
    const fetchCollectionImages = async () => {
      try {
        const images = {};
        for (const col of collections) {
          const productsRef = collection(db, "collections", col.id, "products");
          const productsSnapshot = await getDocs(productsRef);

          console.log(`Collection ${col.id}, Product Count: ${productsSnapshot.size}`);

          let imageUrl = "https://placehold.co/150"; // Default fallback
          if (!productsSnapshot.empty) {
            const firstProduct = productsSnapshot.docs[0].data();
            console.log(`First Product for ${col.id}:`, firstProduct);
            imageUrl = Array.isArray(firstProduct.imageUrl) && firstProduct.imageUrl.length > 0
              ? firstProduct.imageUrl[0]
              : firstProduct.imageUrl || "https://placehold.co/150";
          }
          images[col.id] = imageUrl;
          console.log(`Set image for ${col.id}: ${imageUrl}`);
        }
        setCollectionImages(images);
      } catch (error) {
        console.error("Error fetching collection images:", error);
      } finally {
        setImageLoading(false);
      }
    };

    if (!contextLoading && collections.length > 0) {
      fetchCollectionImages();
    }
  }, [collections, contextLoading]);

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

  console.log("Collections from ProductContext:", collections);
  console.log("Collection Images:", collectionImages);

  return (
    <div id="app">
      <h1 className="heading">Our Collections</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
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
        {collections.length > 0 ? (
          collections.map((collection, index) => (
            <SwiperSlide key={index} className="collection-slide">
              <Link to={`/shopall/${collection.id}`} className="collection-link">
                <div className="collection-content">
                  <img
                    src={collectionImages[collection.id] || "https://placehold.co/150"}
                    alt={collection.name}
                    className="collection-image"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { 
                      console.log(`Image failed for ${collection.name}:`, collectionImages[collection.id]);
                      e.target.src = "https://placehold.co/150"; 
                    }}
                  />
                  <div className="collection-text">
                    <h3>{collectionNameMap[collection.id] || collection.name}</h3>
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