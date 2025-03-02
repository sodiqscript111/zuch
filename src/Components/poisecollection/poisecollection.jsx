// src/components/PoiseCollection.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/productContext"; // Import ProductContext
import "./poisecollection.css";

const PoiseCollection = () => {
  const { products, loading } = useContext(ProductContext);

  // Filter products for poisecollection
  const poiseProducts = products
    .filter(product => product.collectionId === "poisecollection")
    .map(item => ({
      id: item.id,
      name: item.name || "Unknown",
      price: typeof item.price === "number" ? item.price : parseFloat(item.price) || 0,
      imageUrl: item.imageUrl || "https://via.placeholder.com/300", // Already a string from context
    }));

  if (loading) {
    return (
      <div className="poise-container">
        <h1>Poise Collection</h1>
        <div className="poise-product-grid">
          {[...Array(3)].map((_, index) => ( // Adjust number based on typical items
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
    <div className="poise-container">
      <h1>Poise Collection</h1>
      <div className="poise-product-grid">
        {poiseProducts.length > 0 ? (
          poiseProducts.map((item) => (
            <Link
              to={`/product/poisecollection/${item.id}`}
              key={item.id}
              className="poise-product-card-container"
            >
              <figure className="poise-product-card">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    className="poise-product-image"
                    decoding="async"
                  />
                ) : (
                  <div className="no-image-placeholder">No Image Available</div>
                )}
                <figcaption className="poise-figcaption">
                  <div className="poise-product-meta">
                    <span className="poise-product-name">{item.name}</span>
                  </div>
                  <div className="poise-product-cost">
                    <data>
                      {item.price >= 0
                        ? `₦${item.price.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
      <div className="poise-see-all">
        <Link to="/clothes">See All</Link>
      </div>
    </div>
  );
};

export default PoiseCollection;