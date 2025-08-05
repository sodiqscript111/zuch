import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./newclothes.css";

const Newclothes = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from Firestore...");
        const collectionsRef = collection(db, "collections");
        const collectionsSnapshot = await getDocs(collectionsRef);
        console.log("Collections snapshot size:", collectionsSnapshot.size);

        if (collectionsSnapshot.empty) {
          console.log("No documents found in 'collections'.");
          return;
        }

        const allProducts = [];
        for (const collectionDoc of collectionsSnapshot.docs) {
          const productsSubCollection = collection(db, "collections", collectionDoc.id, "products");
          console.log("Fetching sub-collection:", productsSubCollection.path);
          const productsSnapshot = await getDocs(productsSubCollection);
          console.log("Products snapshot size for", collectionDoc.id, ":", productsSnapshot.size);

          const productsList = productsSnapshot.docs.map((doc) => {
            const data = doc.data();
            const price = typeof data.price === "number" ? data.price : parseFloat(data.price) || 0;
            // Handle misnamed 'popularity ' key (with space)
            const popularity = typeof data.popularity === "number" 
              ? data.popularity 
              : parseInt(data.popularity || data["popularity "]) || 0;
            console.log(`Raw data for ${doc.id}:`, JSON.stringify(data, null, 2));
            console.log(`Transformed price for ${doc.id}:`, price);
            console.log(`Transformed popularity for ${doc.id}:`, popularity);
            return {
              id: doc.id,
              collectionId: collectionDoc.id,
              name: data.name || "Unnamed Product",
              price, // Ensured as number
              imageUrl: data.imageUrl && Array.isArray(data.imageUrl) 
                ? data.imageUrl 
                : data.imageurl && Array.isArray(data.imageurl) 
                ? data.imageurl 
                : ["https://via.placeholder.com/300"],
              popularity, // Ensured as number
            };
          });
          allProducts.push(...productsList);
        }

        console.log("All fetched products before sorting:", JSON.stringify(allProducts, null, 2));
        allProducts.sort((a, b) => b.popularity - a.popularity);
        console.log("All fetched products after sorting:", JSON.stringify(allProducts, null, 2));
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <section className="newclothes-container">
      <header className="newclothes-title">
        <Link to="/clothes">
          <h2>
            Most Popular
            <motion.span
              className="see-all-link"
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              See All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width={18}
                className="arrow-icon"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </motion.span>
          </h2>
        </Link>
      </header>
      <div className="newclothes-products">
        {products.length === 0 ? (
          <p className="no-products">No products available. Please check Firestore.</p>
        ) : (
          products.map((item) => (
            <motion.div
              key={`${item.collectionId}-${item.id}`}
              className="newclothes-card"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link to={`/product/${item.collectionId}/${item.id}`} className="card-link">
                <div className="card-image-wrapper">
                  <img
                    src={item.imageUrl[0]}
                    alt={item.name}
                    loading="lazy"
                    className="card-image"
                  />
                  <motion.div
                    className="card-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>View Details</span>
                  </motion.div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-price">${item.price.toFixed(2)}</p>
                  <p className="card-popularity">Popularity: {item.popularity}</p>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Newclothes;