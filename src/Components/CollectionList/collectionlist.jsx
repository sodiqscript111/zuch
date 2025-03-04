// src/components/CategoryList.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/productContext"; // Updated case
import "./collectionList.css"; // Updated CSS file name

const CategoryList = () => {
  const { collections, products, loading: contextLoading } = useContext(ProductContext);
  const [categoryImages, setCategoryImages] = useState({});
  const [imageLoading, setImageLoading] = useState(true);

  // Define categories with slugs and collection IDs
  const categories = [
    {
      name: "Custom Wear",
      slug: "custom-wear",
      collectionIds: ["customnative", "zuchclassics"],
    },
    {
      name: "Classic Wear",
      slug: "classic-wear",
      collectionIds: ["lumincolection", "poisecollection", "amor"],
    },
    {
      name: "Casual Wear",
      slug: "casual-wear",
      collectionIds: ["nudecolection", "streetvouge", "beachtime"],
    },
  ];

  useEffect(() => {
    const assignCategoryImages = () => {
      try {
        const images = {};
        for (const category of categories) {
          let imageUrl = "https://placehold.co/150x150"; // Default fallback
          for (const colId of category.collectionIds) {
            const product = products.find(p => p.collectionId === colId);
            if (product && product.imageUrl) {
              imageUrl = Array.isArray(product.imageUrl) && product.imageUrl.length > 0
                ? product.imageUrl[0]
                : product.imageUrl;
              console.log(`Assigned image for ${category.name} from ${colId}:`, imageUrl);
              break; // Use first valid image
            }
          }
          images[category.slug] = imageUrl;
          console.log(`Set image for ${category.name}: ${imageUrl}`);
        }
        setCategoryImages(images);
      } catch (error) {
        console.error("Error assigning category images:", error);
      } finally {
        setImageLoading(false);
      }
    };

    if (!contextLoading && collections.length > 0 && products.length > 0) {
      console.log("Collections:", collections.map(c => c.id));
      console.log("Products available:", products.length);
      assignCategoryImages();
    }
  }, [collections, products, contextLoading]);

  if (contextLoading || imageLoading) {
    return (
      <div id="category-section">
        <h1 className="category-heading">Our Category</h1>
        <div className="category-grid">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="category-skeleton">
              <div className="category-skeleton-image"></div>
              <div className="category-skeleton-text"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  console.log("Category Images:", categoryImages);

  return (
    <div id="category-section">
      <h1 className="category-heading">Our Cotegories</h1>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <Link to={`/shopall/${category.slug}`} className="category-link">
              <div className="category-card-content">
                <img
                  src={categoryImages[category.slug] || "https://placehold.co/150x150"}
                  alt={category.name}
                  className="category-image"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { 
                    console.log(`Image failed for ${category.name}:`, categoryImages[category.slug]);
                    e.target.src = "https://placehold.co/150x150"; 
                  }}
                />
                <div className="category-title">
                  <h3>{category.name}</h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;