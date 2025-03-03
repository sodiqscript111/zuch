// src/context/ProductContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const cachedProducts = localStorage.getItem("allProductsCache");
        const cachedCollections = localStorage.getItem("collectionsCache");

        if (cachedProducts && cachedCollections) {
          setProducts(JSON.parse(cachedProducts));
          setCollections(JSON.parse(cachedCollections));
          setLoading(false);
          return;
        }

        console.log("Fetching all data from Firestore...");
        const collectionsRef = collection(db, "collections");
        const collectionsSnapshot = await getDocs(collectionsRef);

        if (collectionsSnapshot.empty) {
          console.log("No collections found in Firestore.");
          setCollections([]);
          setProducts([]);
          setLoading(false);
          return;
        }

        const productsList = [];
        let defaultImage = "https://placehold.co/150"; // Final fallback

        // Fetch all products first to find a valid image
        for (const doc of collectionsSnapshot.docs) {
          const collectionId = doc.id;
          const productsRef = collection(db, "collections", collectionId, "products");
          const productsSnapshot = await getDocs(productsRef);

          productsSnapshot.forEach(productDoc => {
            const data = productDoc.data();
            const imageUrl = Array.isArray(data.imageUrl) && data.imageUrl.length > 0
              ? data.imageUrl[0]
              : data.imageUrl;
            productsList.push({
              id: productDoc.id,
              collectionId: collectionId,
              name: data.name || "Unknown",
              price: data.price || 0,
              imageUrl: imageUrl || "https://placehold.co/150",
            });
            // Set defaultImage if we find a valid one
            if (imageUrl && !defaultImage.startsWith("https://placehold.co")) {
              defaultImage = imageUrl;
              console.log(`Found valid product image for fallback: ${defaultImage}`);
            }
          });
        }

        // Build collections with default image
        const collectionsData = collectionsSnapshot.docs.map(doc => {
          const collectionId = doc.id;
          return {
            id: collectionId,
            name: `${collectionId.replace(/collection/i, '').replace(/^\w/, c => c.toUpperCase())} Collection`,
            image: defaultImage, // Use a valid product image as default
          };
        });

        console.log("Fetched Collections:", collectionsData);
        console.log("Fetched Products:", productsList);
        console.log("Default Image Used:", defaultImage);

        setCollections(collectionsData);
        setProducts(productsList);
        localStorage.setItem("allProductsCache", JSON.stringify(productsList));
        localStorage.setItem("collectionsCache", JSON.stringify(collectionsData));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <ProductContext.Provider value={{ products, collections, loading }}>
      {children}
    </ProductContext.Provider>
  );
};