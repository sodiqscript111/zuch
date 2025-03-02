// src/components/Shopall/shop.jsx
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import { ProductContext } from "../../context/productContext"; // Fixed case sensitivity
import "./shop.css";

const AllProducts = () => {
  const { collectionId } = useParams();
  const { products, loading } = useContext(ProductContext);

  const filteredProducts = collectionId
    ? products.filter(product => product.collectionId === collectionId)
    : products;

  // Debug: Log products to check imageUrl structure
  console.log("Filtered Products:", filteredProducts);

  if (loading) {
    return (
      <div className="all-products-page">
        <Navbar />
        <h1 className="all-products-title">
          {collectionId ? `${collectionId.replace(/collection/i, '').replace(/^\w/, c => c.toUpperCase())} Collection` : "All Products"}
        </h1>
        <div className="products-grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="skeleton-product">
              <div className="skeleton-image"></div>
              <div className="skeleton-info">
                <div className="skeleton-name"></div>
                <div className="skeleton-price"></div>
              </div>
            </div>
          ))}
        </div>
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
        {filteredProducts.length === 0 ? (
          <p className="no-products">No products available.</p>
        ) : (
          filteredProducts.map((item) => (
            <Link
              key={`${item.collectionId}-${item.id}`}
              to={`/product/${item.collectionId}/${item.id}`}
              className="product-item"
            >
              <img
                src={typeof item.imageUrl === "string" ? item.imageUrl : item.imageUrl[0] || "https://via.placeholder.com/300"}
                alt={item.name}
                className="product-img"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }} // Fallback if image fails
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