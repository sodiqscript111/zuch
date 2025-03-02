// src/components/Dapper.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/productContext"; // Import ProductContext
import "./dapper.css";

const Dapper = () => {
  const { products, loading } = useContext(ProductContext);

  // Filter products for lumincolection
  const luminProducts = products
    .filter(product => product.collectionId === "lumincolection")
    .map(item => ({
      id: item.id,
      name: item.name || "Unknown",
      price: typeof item.price === "number" ? item.price : parseFloat(item.price) || 0,
      imageUrl: item.imageUrl || "https://via.placeholder.com/300", // Already a string from context
    }));

  if (loading) {
    return (
      <div className="dapper-container-dapper">
        <h1>Lumin Collection</h1>
        <div className="product-grid-dapper">
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
    <div className="dapper-container-dapper">
      <h1>Lumin Collection</h1>
      <div className="product-grid-dapper">
        {luminProducts.length > 0 ? (
          luminProducts.map((item) => (
            <Link
              to={`/product/lumincolection/${item.id}`}
              key={item.id}
              className="poise-product-card-container" // Kept as is, but consider "product-card-container-dapper"
            >
              <figure className="product-card-dapper">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    className="product-image-dapper"
                    decoding="async"
                  />
                ) : (
                  <div className="no-image-placeholder">No Image Available</div>
                )}
                <figcaption>
                  <div className="product-meta-dapper">
                    <span className="product-name-dapper">{item.name}</span>
                  </div>
                  <div className="product-cost-dapper">
                    <data value={item.price}>
                      {typeof item.price === "number" && !isNaN(item.price)
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
      <div className="see-all-dapper">
        <Link to="/clothes">See All</Link>
      </div>
    </div>
  );
};

export default Dapper;