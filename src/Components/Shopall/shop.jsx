// src/components/Shopall/shop.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Navbar from "../Navbar/navbar";
import "./shop.css";

const AllProducts = () => {
  const { collectionId } = useParams(); // Get collectionId from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(`Fetching products${collectionId ? ` for collection: ${collectionId}` : " for all collections"}...`);
        
        if (collectionId) {
          // Fetch products from a specific collection
          const productsSubCollection = collection(db, "collections", collectionId, "products");
          const productsSnapshot = await getDocs(productsSubCollection);
          console.log("Products snapshot size for", collectionId, ":", productsSnapshot.size);

          if (productsSnapshot.empty) {
            console.log(`No products found in ${collectionId}.`);
            setProducts([]);
            setLoading(false);
            return;
          }

          const productsList = productsSnapshot.docs.map((doc) => {
            const data = doc.data();
            const price = typeof data.price === "number" ? data.price : parseFloat(data.price) || 0;
            const popularity = typeof data.popularity === "number"
              ? data.popularity
              : parseInt(data.popularity || data["popularity "]) || 0;
            return {
              id: doc.id,
              collectionId: collectionId,
              name: data.name || "Unnamed Product",
              price,
              imageUrl: data.imageUrl && Array.isArray(data.imageUrl)
                ? data.imageUrl
                : data.imageurl && Array.isArray(data.imageurl)
                ? data.imageurl
                : ["https://via.placeholder.com/300"],
              popularity,
            };
          });

          console.log("Fetched products:", productsList);
          setProducts(productsList);
        } else {
          // Fetch all products (default behavior)
          const collectionsRef = collection(db, "collections");
          const collectionsSnapshot = await getDocs(collectionsRef);
          console.log("Collections snapshot size:", collectionsSnapshot.size);

          if (collectionsSnapshot.empty) {
            console.log("No collections found.");
            setProducts([]);
            setLoading(false);
            return;
          }

          const allProducts = [];
          for (const collectionDoc of collectionsSnapshot.docs) {
            const productsSubCollection = collection(db, "collections", collectionDoc.id, "products");
            const productsSnapshot = await getDocs(productsSubCollection);
            console.log("Products snapshot size for", collectionDoc.id, ":", productsSnapshot.size);

            const productsList = productsSnapshot.docs.map((doc) => {
              const data = doc.data();
              const price = typeof data.price === "number" ? data.price : parseFloat(data.price) || 0;
              const popularity = typeof data.popularity === "number"
                ? data.popularity
                : parseInt(data.popularity || data["popularity "]) || 0;
              return {
                id: doc.id,
                collectionId: collectionDoc.id,
                name: data.name || "Unnamed Product",
                price,
                imageUrl: data.imageUrl && Array.isArray(data.imageUrl)
                  ? data.imageUrl
                  : data.imageurl && Array.isArray(data.imageurl)
                  ? data.imageurl
                  : ["https://via.placeholder.com/300"],
                popularity,
              };
            });
            allProducts.push(...productsList);
          }

          console.log("All fetched products:", allProducts);
          setProducts(allProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collectionId]); // Re-run when collectionId changes

  if (loading) {
    return (
      <div className="all-products-page">
        <Navbar />
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="all-products-page">
      <Navbar />
      <h1 className="all-products-title">
        {collectionId ? `${collectionId.replace(/collection/i, '').replace(/^\w/, c => c.toUpperCase())} Collection` : "All Products"}
      </h1>
      <div className="products-grid">
        {products.length === 0 ? (
          <p className="no-products">No products available.</p>
        ) : (
          products.map((item) => (
            <Link
              key={`${item.collectionId}-${item.id}`}
              to={`/product/${item.collectionId}/${item.id}`}
              className="product-item"
            >
              <img
                src={item.imageUrl[0]}
                alt={item.name}
                className="product-img"
                loading="lazy"
              />
              <div className="product-info">
                <h2 className="product-name">{item.name}</h2>
                <p className="product-price">₦{item.price.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;