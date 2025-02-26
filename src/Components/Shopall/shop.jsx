import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Navbar from "../Navbar/navbar"; // Adjust path based on your structure
import "./shop.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        console.log("Fetching all products from Firestore...");
        const collectionsRef = collection(db, "collections");
        const collectionsSnapshot = await getDocs(collectionsRef);
        console.log("Collections snapshot size:", collectionsSnapshot.size);

        if (collectionsSnapshot.empty) {
          console.log("No collections found.");
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
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

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
      <Navbar /> {/* Add Navbar here */}
      <h1 className="all-products-title">All Products</h1>
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
                <p className="product-price">${item.price.toFixed(2)}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default AllProducts;