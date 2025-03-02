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
        const collectionsList = collectionsSnapshot.docs.map(doc => ({
          id: doc.id,
          name: `${doc.id.replace(/collection/i, '').replace(/^\w/, c => c.toUpperCase())} Collection`,
        }));

        const productsList = [];
        for (const doc of collectionsSnapshot.docs) {
          const productsRef = collection(db, "collections", doc.id, "products");
          const productsSnapshot = await getDocs(productsRef);
          productsSnapshot.forEach(productDoc => {
            const data = productDoc.data();
            productsList.push({
              id: productDoc.id,
              collectionId: doc.id,
              name: data.name || "Unknown",
              price: data.price || 0,
              imageUrl: Array.isArray(data.imageUrl) && data.imageUrl.length > 0
                ? data.imageUrl[0]
                : data.imageUrl || "https://via.placeholder.com/150",
            });
          });
        }

        setProducts(productsList);
        setCollections(collectionsList);
        localStorage.setItem("allProductsCache", JSON.stringify(productsList));
        localStorage.setItem("collectionsCache", JSON.stringify(collectionsList));
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