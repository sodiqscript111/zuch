// src/components/Dapper.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./dapper.css";

const Dapper = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = [];

        // Reference to the products subcollection inside lumincolection
        const productsRef = collection(db, "collections", "lumincolection", "products");
        const productsSnapshot = await getDocs(productsRef);

        console.log("📌 Firestore Documents Retrieved:", productsSnapshot.docs.map(doc => doc.id));

        if (productsSnapshot.empty) {
          console.warn("⚠️ No products found in lumincolection > products");
          console.log("Firestore path checked:", "collections/lumincolection/products");
          setLoading(false);
          return;
        }

        productsSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("🛍️ Product Data:", data);

          const priceRaw = data.price;
          const price = typeof priceRaw === "number" && !isNaN(priceRaw)
            ? priceRaw
            : parseFloat(priceRaw) && !isNaN(parseFloat(priceRaw))
            ? parseFloat(priceRaw)
            : 0; // Default to 0 if invalid

          const image = Array.isArray(data.imageUrl) && data.imageUrl.length > 0
            ? data.imageUrl[0]
            : data.imageUrl || "";

          fetchedProducts.push({
            id: doc.id,
            name: data.name || "Unknown",
            price, // Store as number
            imageUrl: image,
          });
        });

        console.log("✅ Processed Products:", fetchedProducts);
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="dapper-container-dapper">
      <h1>Lumin Collection</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="product-grid-dapper">
          {products.length > 0 ? (
            products.map((item) => (
              <Link
                to={`/product/lumincolection/${item.id}`}
                key={item.id}
                className="poise-product-card-container" // Consider updating to "product-card-container-dapper" for consistency
              >
                <figure className="product-card-dapper">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      className="product-image-dapper"
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
      )}
      <div className="see-all-dapper">
        <Link to="/clothes">See All</Link>
      </div>
    </div>
  );
};

export default Dapper;