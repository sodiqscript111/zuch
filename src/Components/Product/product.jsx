import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import './product.css';
import { CartContext } from '../../context/cart';

const ProductDetail = () => {
  const { id } = useParams(); // Extract the product ID from the URL
  const { addItemToCart } = useContext(CartContext); // Access `addItemToCart` from context
  const [selectedColor, setSelectedColor] = useState(null);
  const [customSize, setCustomSize] = useState({
    chest: '',
    waist: '',
    hips: '',
    length: '',
  });
  const [selectedStandardSize, setSelectedStandardSize] = useState(null);
  const [isCustomSize, setIsCustomSize] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      description: 'Elegant and stylish.',
      imageUrl: 'https://i.ibb.co/mc6hSTy/Whats-App-Image-2025-01-13-at-12-35-01-PM.jpg',
      colors: ['Red', 'Blue'],
      standardSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      id: 2,
      name: 'Product 2',
      price: 39.99,
      description: 'Casual and comfortable.',
      imageUrl: 'https://i.ibb.co/61HgGV6/Whats-App-Image-2025-01-13-at-12-35-00-PM-1.jpg',
      colors: ['Green', 'Black'],
      standardSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
  ];

  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedColor) {
      alert('Please select a color.');
      return;
    }

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
      imageUrl: product.imageUrl,
      quantity: 1,
      options: {
        color: selectedColor,
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
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>
            Price: <strong>${product.price}</strong>
          </p>

          <div className="product-options">
            <div className="colors">
              <label>Colors:</label>
              <div className="color-options">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

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
                <label>Custom Measurements:</label>
                <div className="custom-size-inputs">
                  <input
                    type="number"
                    name="chest"
                    placeholder="Chest (in cm)"
                    value={customSize.chest}
                    onChange={handleCustomSizeChange}
                  />
                  <input
                    type="number"
                    name="waist"
                    placeholder="Waist (in cm)"
                    value={customSize.waist}
                    onChange={handleCustomSizeChange}
                  />
                  <input
                    type="number"
                    name="hips"
                    placeholder="Hips (in cm)"
                    value={customSize.hips}
                    onChange={handleCustomSizeChange}
                  />
                  <input
                    type="number"
                    name="length"
                    placeholder="Length (in cm)"
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