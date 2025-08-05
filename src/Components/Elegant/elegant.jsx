// src/components/Elegant.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/productContext"; // Correct import path
import "./elegant.css";

const Elegant = () => {
  const { products, loading } = useContext(ProductContext);

  // Filter products for poise collection
  const poiseProducts = products
    .filter((product) => product.collectionId === "poisecollection")
    .map((item) => ({
      id: item.id,
      name: item.name || "Unknown",
      price: typeof item.price === "number" ? item.price : parseFloat(item.price) || 0,
      imageUrl: Array.isArray(item.imageUrl) && item.imageUrl.length > 0 ? item.imageUrl[0] : item.imageUrl || "https://via.placeholder.com/300",
    }));

  if (loading) {
    return (
      <div className="elegant-container-elegant">
        <h1>Poise Collection</h1>
        <div className="product-grid-elegant">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="skeleton-product-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-meta">
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
    <div className="elegant-container-elegant">
      <h1>Poise Collection</h1>
      <div className="product-grid-elegant">
        {poiseProducts.length > 0 ? (
          poiseProducts.map((item) => (
            <Link
              to={`/product/poisecollection/${item.id}`}
              key={item.id}
              className="product-card-container-elegant"
            >
              <figure className="product-card-elegant">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    className="product-image-elegant"
                    decoding="async"
                  />
                ) : (
                  <div className="no-image-placeholder">No Image Available</div>
                )}
                <figcaption className="figcaption-elegant">
                  <div className="product-meta-elegant">
                    <span className="product-name-elegant">{item.name}</span>
                  </div>
                  <div className="product-cost-elegant">
                    <data>
                      {typeof item.price === "number" && !isNaN(item.price)
                        ? `₦${item.price.toLocaleString("en-NG", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                        : "Price Unavailable"}
                    </data>
                  </div>
                </figcaption>
              </figure>
            </Link>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <div className="see-all-elegant">
        <Link to="/clothes">See All</Link>
      </div>
    </div>
  );
};

export default Elegant;