// src/components/Shopall/shop.jsx
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import { ProductContext } from "../../context/productContext";
import "./shop.css";

const AllProducts = () => {
  const { collectionId } = useParams();
  const { products, loading } = useContext(ProductContext);

  const categoryMap = {
    "custom-wear": ["customnative", "zuchclassics"],
    "classic-wear": ["lumincolection", "poisecollection", "amorcollection"],
    "casual-wear": ["nudecolection", "streetvouge", "beachtimecollection"],
  };

  const filteredProducts = collectionId
    ? categoryMap[collectionId]
      ? products.filter(product =>
          categoryMap[collectionId].includes(product.collectionId)
        )
      : products.filter(product => product.collectionId === collectionId)
    : products;

  if (loading) {
    return (
      <div className="all-products-page">
        <Navbar />
        <h1 className="all-products-title">
          {collectionId
            ? `${collectionId
                .replace(/-/g, " ")
                .replace(/\b\w/g, c => c.toUpperCase())}`
            : "All Products"}
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
        {collectionId
          ? `${collectionId
              .replace(/-/g, " ")
              .replace(/\b\w/g, c => c.toUpperCase())}`
          : "All Products"}
      </h1>
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-products">No products available.</p>
        ) : (
          filteredProducts.map(item => {
            const slashedPrice = item.price * 1.2; // 20% higher
            return (
              <Link
                key={`${item.collectionId}-${item.id}`}
                to={`/product/${item.collectionId}/${item.id}`}
                className="product-item"
              >
                <img
                  src={item.imageUrl || "https://placehold.co/300"}
                  alt={item.name}
                  className="product-img"
                  loading="lazy"
                  decoding="async"
                  onError={e => {
                    e.target.src = "https://placehold.co/300";
                  }}
                />
                <div className="product-info">
                  <h2 className="product-name">{item.name}</h2>
                  <p className="product-price">
                    <span className="slashed-price">
                      ₦{slashedPrice.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <span className="current-price">
                      ₦{item.price.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllProducts;
