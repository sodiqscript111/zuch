// src/components/RayCollection.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/productContext";
import "./ray.css"; // updated CSS file name

const RayCollection = () => {
  const { products, loading } = useContext(ProductContext);

  const rayProducts = products
    .filter((product) => product.collectionId === "ray")
    .map((item) => ({
      id: item.id,
      name: item.name || "Unknown",
      price: typeof item.price === "number" ? item.price : parseFloat(item.price) || 0,
      imageUrl: Array.isArray(item.imageUrl) && item.imageUrl.length > 0
        ? item.imageUrl[0]
        : item.imageUrl || "https://via.placeholder.com/300",
    }));

  if (loading) {
    return (
      <div className="ray-container-ray">
        <h1>Ray Collection</h1>
        <div className="product-grid-ray">
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
    <div className="ray-container-ray">
      <h1>Ray Collection</h1>
      <div className="product-grid-ray">
        {rayProducts.length > 0 ? (
          rayProducts.map((item) => (
            <Link
              to={`/product/ray/${item.id}`}
              key={item.id}
              className="product-card-container-ray"
            >
              <figure className="product-card-ray">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    className="product-image-ray"
                    decoding="async"
                  />
                ) : (
                  <div className="no-image-placeholder">No Image Available</div>
                )}
                <figcaption className="figcaption-ray">
                  <div className="product-meta-ray">
                    <span className="product-name-ray">{item.name}</span>
                  </div>
                  <div className="product-cost-ray">
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
      <div className="see-all-ray">
        <Link to="/clothes">See All</Link>
      </div>
    </div>
  );
};

export default RayCollection;
