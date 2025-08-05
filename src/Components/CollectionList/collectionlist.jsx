// src/components/CategoryList.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./collectionList.css";

const CategoryList = () => {
  // Define categories with slugs, collection IDs, and hardcoded image URLs
  const categories = [
    {
      name: "Custom Wear",
      slug: "custom-wear",
      collectionIds: ["customnative", "zuchclassics"],
      imageUrl: "https://i.ibb.co/LX8ndTV9/NBZ-WHITE-80k.jpg", // Replace with your URL
    },
    {
      name: "Classic Wear",
      slug: "classic-wear",
      collectionIds: ["lumincolection", "poisecollection", "amorcollection"],
      imageUrl: "https://i.ibb.co/kVFp7P6F/Lumin-Collection-Cover-2.jpg", // Replace with your URL
    },
    {
      name: "Casual Wear",
      slug: "casual-wear",
      collectionIds: ["nudecolection", "streetvouge", "beachtimecollection"],
      imageUrl: "https://i.ibb.co/6kF9vNj/NUDE-COVER-1.jpg", // Replace with your URL
    },
  ];

  return (
    <div id="category-section">
      <h1 className="category-heading"></h1>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <Link to={`/shopall/${category.slug}`} className="category-link">
              <div className="category-card-content">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="category-image"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { 
                    console.log(`Image failed for ${category.name}: ${category.imageUrl}`);
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