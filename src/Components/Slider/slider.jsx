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
  const [categoryImages, setCategoryImages] = useState({});
  const [imageLoading, setImageLoading] = useState(true);

  // Define categories with slugs and all collection IDs
  const categories = [
    {
      name: "Custom Wear",
      slug: "custom-wear",
      collectionIds: ["customnative", "zuchclassics"],
    },
    {
      name: "Classic Wear",
      slug: "classic-wear",
      collectionIds: ["lumincolection", "poisecollection", "amor"],
    },
    {
      name: "Casual Wear",
      slug: "casual-wear",
      collectionIds: ["nudecolection", "streetvouge", "beachtime"],
    },
  ];

  useEffect(() => {
    const fetchCategoryImages = async () => {
      try {
        const images = {};
        for (const category of categories) {
          let imageUrl = "https://placehold.co/150"; // Default fallback
          for (const colId of category.collectionIds) {
            const productsRef = collection(db, "collections", colId, "products");
            const productsSnapshot = await getDocs(productsRef);

            console.log(`Collection ${colId}, Product Count: ${productsSnapshot.size}`);

            if (!productsSnapshot.empty) {
              const firstProduct = productsSnapshot.docs[0].data();
              console.log(`First Product for ${colId}:`, firstProduct);
              imageUrl = Array.isArray(firstProduct.imageUrl) && firstProduct.imageUrl.length > 0
                ? firstProduct.imageUrl[0]
                : firstProduct.imageUrl || imageUrl;
              if (imageUrl !== "https://placehold.co/150") break;
            }
          }
          images[category.slug] = imageUrl;
          console.log(`Set image for ${category.name}: ${imageUrl}`);
        }
        setCategoryImages(images);
      } catch (error) {
        console.error("Error fetching category images:", error);
      } finally {
        setImageLoading(false);
      }
    };

    if (!contextLoading && collections.length > 0) {
      fetchCategoryImages();
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

  console.log("Category Images:", categoryImages);

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
          768: { slidesPerView: 3, slidesOffsetAfter: 50 },
        }}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index} className="collection-slide">
            <Link to={`/shopall/${category.slug}`} className="collection-link">
              <div className="collection-content">
                <img
                  src={categoryImages[category.slug] || "https://placehold.co/150"}
                  alt={category.name}
                  className="collection-image"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { 
                    console.log(`Image failed for ${category.name}:`, categoryImages[category.slug]);
                    e.target.src = "https://placehold.co/150"; 
                  }}
                />
                <div className="collection-text">
                  <h3>{category.name}</h3>
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