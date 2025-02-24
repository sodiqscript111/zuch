import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../Navbar/navbar';
import './product.css';
import { CartContext } from '../../context/cart';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper
import 'swiper/css'; // Swiper base styles
import 'swiper/css/navigation'; // Navigation styles
import 'swiper/css/pagination'; // Pagination styles (optional)
import { Navigation, Pagination } from 'swiper/modules'; // Swiper modules

const ProductDetail = () => {
  const { id } = useParams(); // Extract product ID from URL
  const { addItemToCart } = useContext(CartContext); // Access cart function
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customSize, setCustomSize] = useState({
    chest: '',
    waist: '',
    hips: '',
    length: '',
  });
  const [selectedStandardSize, setSelectedStandardSize] = useState(null);
  const [isCustomSize, setIsCustomSize] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "collections", "customnative", "products", id);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          console.warn("⚠️ Product not found in Firestore:", id);
          setError("Product not found");
          setLoading(false);
          return;
        }

        const data = productSnap.data();
        console.log("🛍️ Product Data:", data);

        // Handle all images from imageUrls or fallback
        const images = Array.isArray(data.imageUrls) && data.imageUrls.length > 0
          ? data.imageUrls
          : Array.isArray(data.imageUrl) && data.imageUrl.length > 0
          ? data.imageUrl
          : data.imageUrl ? [data.imageUrl] // Convert single string to array
          : data.image ? [data.image] : []; // Fallback to empty array

        setProduct({
          id: productSnap.id,
          name: data.name || "Unknown",
          price: data.price || "N/A",
          description: data.description || "No description available",
          imageUrls: images, // Store all images
          standardSizes: data.standardSizes || ["S", "M", "L", "XL"], // Default sizes
        });
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching product:", error);
        setError("Failed to load product details");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (!isCustomSize && !selectedStandardSize) {
      alert('Please select a standard size.');
      return;
    }

    if (isCustomSize && (!customSize.chest || !customSize.waist || !customSize.hips || !customSize.length)) {
      alert('Please fill in all custom size measurements.');
      return;
    }

    addItemToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrls[0], // Use first image for cart
      quantity: 1,
      options: {
        size: isCustomSize ? customSize : selectedStandardSize,
      },
    });
    alert('Product added to cart!');
  };

  const handleCustomSizeChange = (e) => {
    const { name, value } = e.target;
    setCustomSize((prevSize) => ({
      ...prevSize,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail-image">
          <Swiper
            modules={[Navigation, Pagination]} // Enable navigation and pagination
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="product-image-slider"
          >
            {product.imageUrls.length > 0 ? (
              product.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <img src={url} alt={`${product.name} ${index + 1}`} className="swiper-image" />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="no-image-placeholder">No Images Available</div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>
            Price: <strong>${product.price}</strong>
          </p>

          <div className="product-options">
            <div className="size-selection">
              <label>Do you want to customize your size?</label>
              <div className="size-toggle">
                <button
                  className={`toggle-button ${!isCustomSize ? 'active' : ''}`}
                  onClick={() => setIsCustomSize(false)}
                >
                  Standard Sizes
                </button>
                <button
                  className={`toggle-button ${isCustomSize ? 'active' : ''}`}
                  onClick={() => setIsCustomSize(true)}
                >
                  Custom Size
                </button>
              </div>
            </div>

            {!isCustomSize ? (
              <div className="standard-sizes">
                <label>Standard Sizes:</label>
                <div className="size-options">
                  {product.standardSizes.map((size, index) => (
                    <button
                      key={index}
                      className={`size-button ${selectedStandardSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedStandardSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="custom-sizes">
                <label>Custom Measurements (in cm):</label>
                <div className="custom-size-inputs">
                  <input
                    type="number"
                    name="chest"
                    placeholder="Chest"
                    value={customSize.chest}
                    onChange={handleCustomSizeChange}
                  />
                  <input
                    type="number"
                    name="waist"
                    placeholder="Waist"
                    value={customSize.waist}
                    onChange={handleCustomSizeChange}
                  />
                  <input
                    type="number"
                    name="hips"
                    placeholder="Hips"
                    value={customSize.hips}
                    onChange={handleCustomSizeChange}
                  />
                  <input
                    type="number"
                    name="length"
                    placeholder="Length"
                    value={customSize.length}
                    onChange={handleCustomSizeChange}
                  />
                </div>
              </div>
            )}
          </div>

          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;