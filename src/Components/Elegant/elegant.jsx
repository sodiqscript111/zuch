import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./elegant.css";

const Elegant = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = [];

        const productsRef = collection(db, "collections", "customnative", "products");
        const productsSnapshot = await getDocs(productsRef);

        console.log("📌 Firestore Documents Retrieved:", productsSnapshot.docs.map(doc => doc.id));

        if (productsSnapshot.empty) {
          console.warn("⚠️ No products found in customnative > products");
          console.log("Firestore path checked:", "collections/customnative/products");
          setLoading(false);
          return;
        }

        productsSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("🛍️ Product Data:", data);

          const image = Array.isArray(data.imageUrls) && data.imageUrls.length > 0
            ? data.imageUrls[0]
            : Array.isArray(data.imageUrl) && data.imageUrl.length > 0
            ? data.imageUrl[0]
            : data.imageUrl || data.image || "";

          const priceRaw = data.price;
          const price = typeof priceRaw === "number" && !isNaN(priceRaw)
            ? priceRaw
            : parseFloat(priceRaw) && !isNaN(parseFloat(priceRaw))
            ? parseFloat(priceRaw)
            : "N/A";

          fetchedProducts.push({
            id: doc.id,
            name: data.name || "Unknown",
            price,
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
    <div className="elegant-container-elegant">
      <h1>Custom Native Collection</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="product-grid-elegant">
          {products.length > 0 ? (
            products.map((item) => (
              <Link
                to={`/product/customnative/${item.id}`}
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
                          ? `₦${item.price.toFixed(2)}`
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
      <div className="see-all-elegant">
        <Link to="/clothes">See All</Link>
      </div>
    </div>
  );
};

export default Elegant;