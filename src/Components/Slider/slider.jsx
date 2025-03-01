import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import "./slider.css";

const Slider = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        console.log("Fetching collections from Firestore...");
        const collectionsRef = collection(db, "collections");
        const collectionsSnapshot = await getDocs(collectionsRef);

        if (collectionsSnapshot.empty) {
          console.log("No collections found in Firestore.");
          setCollections([]);
          setLoading(false);
          return;
        }

        const collectionsData = await Promise.all(
          collectionsSnapshot.docs.map(async (doc) => {
            const collectionId = doc.id;
            // Fetch a representative image from the first product in the collection
            const productsRef = collection(db, "collections", collectionId, "products");
            const productsSnapshot = await getDocs(productsRef);
            const firstProduct = productsSnapshot.docs[0]?.data();
            const imageUrl =
              firstProduct?.imageUrl && Array.isArray(firstProduct.imageUrl)
                ? firstProduct.imageUrl[0]
                : firstProduct?.imageUrl || "https://via.placeholder.com/300";

            console.log(`Collection: ${collectionId}, Image: ${imageUrl}, Products: ${productsSnapshot.size}`);
            return {
              id: collectionId,
              name: `${collectionId.replace(/collection/i, '').replace(/^\w/, c => c.toUpperCase())} `, // Capitalize and format name
              image: imageUrl,
            };
          })
        );

        console.log("Fetched collections:", collectionsData);
        setCollections(collectionsData);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return <div>Loading collections...</div>;
  }

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
          320: {
            slidesPerView: 1,
            slidesOffsetAfter: 30,
          },
          768: {
            slidesPerView: 3,
            slidesOffsetAfter: 50,
          },
        }}
      >
        {collections.length > 0 ? (
          collections.map((collection, index) => (
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