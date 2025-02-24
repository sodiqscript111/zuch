import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./poisecollection.css"; // Use dedicated poise-collection.css

const PoiseCollection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = [];

                // Reference to the products subcollection inside poisecollection
                const productsRef = collection(db, "collections", "poisecollection", "products");
                const productsSnapshot = await getDocs(productsRef);

                console.log("📌 Firestore Documents Retrieved:", productsSnapshot.docs.map(doc => doc.id));

                if (productsSnapshot.empty) {
                    console.warn("⚠️ No products found in poisecollection > products");
                    console.log("Firestore path checked:", "collections/poisecollection/products");
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

                    fetchedProducts.push({
                        id: doc.id, // Use Firestore doc ID
                        name: data.name || "Unknown",
                        price: data.price || "N/A",
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
        <div className="poise-container">
            <h1>Poise Collection</h1>
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="poise-product-grid">
                    {products.length > 0 ? (
                        products.map((item) => (
                            <Link 
                                to={`/product/${item.id}`} // Links to ProductDetail with Firestore ID
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
                                                {item.price !== "N/A" ? `$${item.price}` : "Price Unavailable"}
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
            <div className="poise-see-all">
                <Link to="/clothes">See All</Link>
            </div>
        </div>
    );
};

export default PoiseCollection;