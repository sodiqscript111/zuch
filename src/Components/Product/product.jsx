// ProductDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './product.css';

const ProductDetail = () => {
    const { id } = useParams(); // Extract the product ID from the URL

    // Example data: You might fetch this from an API or database
    const products = [
        { id: 1, name: 'Product 1', price: 29.99, description: 'Elegant and stylish.', imageUrl: 'https://i.ibb.co/mc6hSTy/Whats-App-Image-2025-01-13-at-12-35-01-PM.jpg', colors: ['Red', 'Blue'], sizes: ['S', 'M', 'L'] },
        { id: 2, name: 'Product 2', price: 39.99, description: 'Casual and comfortable.', imageUrl: 'https://i.ibb.co/61HgGV6/Whats-App-Image-2025-01-13-at-12-35-00-PM-1.jpg', colors: ['Green', 'Black'], sizes: ['M', 'L'] },
        { id: 3, name: 'Product 3', price: 19.99, description: 'Perfect for any occasion.', imageUrl: 'https://i.ibb.co/QmV14qf/Whats-App-Image-2025-01-13-at-12-35-00-PM.jpg', colors: ['White', 'Yellow'], sizes: ['S', 'XL'] },
        { id: 4, name: 'Product 4', price: 49.99, description: 'Luxurious and modern.', imageUrl: 'https://i.ibb.co/QmV14qf/Whats-App-Image-2025-01-13-at-12-35-00-PM.jpg', colors: ['Purple', 'Gray'], sizes: ['S', 'M', 'L', 'XL'] },
    ];

    // Find the product by its ID
    const product = products.find((item) => item.id === parseInt(id));

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-image">
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-detail-info">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>Price: <strong>${product.price}</strong></p>

                <div className="product-options">
                    <div className="colors">
                        <label>Colors:</label>
                        <div className="color-options">
                            {product.colors.map((color, index) => (
                                <button key={index} className="color-button">{color}</button>
                            ))}
                        </div>
                    </div>
                    <div className="sizes">
                        <label>Sizes:</label>
                        <div className="size-options">
                            {product.sizes.map((size, index) => (
                                <button key={index} className="size-button">{size}</button>
                            ))}
                        </div>
                    </div>
                </div>

                <button className="add-to-cart-button">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetail;
