import React from 'react';
import { Link } from 'react-router-dom';
import './elegant.css';

const Elegant = () => {
    const products = [
        { id: 1, name: 'Product 1', price: 29.99, imageUrl: 'https://i.ibb.co/mc6hSTy/Whats-App-Image-2025-01-13-at-12-35-01-PM.jpg' },
        { id: 2, name: 'Product 2', price: 39.99, imageUrl: 'https://i.ibb.co/61HgGV6/Whats-App-Image-2025-01-13-at-12-35-00-PM-1.jpg' },
        { id: 3, name: 'Product 3', price: 19.99, imageUrl: 'https://i.ibb.co/QmV14qf/Whats-App-Image-2025-01-13-at-12-35-00-PM.jpg' },
        { id: 4, name: 'Product 4', price: 49.99, imageUrl: 'https://i.ibb.co/QmV14qf/Whats-App-Image-2025-01-13-at-12-35-00-PM.jpg' },
    ];

    return (
        <div className="elegant-container-elegant">
            <h1 className='heading-elegant'> Elegant Collection</h1>
            <div className="product-grid-elegant">
                {products.map((item) => (
                    <div className="product-card-container-elegant" key={item.id}>
                        <figure className="product-card-elegant">
                            <button title="View larger">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    loading="lazy"
                                    className="product-image-elegant"
                                />
                            </button>
                            <figcaption className='figcaption-elegant'>
                                <div className="product-meta-elegant">
                                    <Link to={`/product/${item.id}`} className="product-name-elegant">
                                        {item.name}
                                    </Link>
                                </div>
                                <div className="product-cost-elegant">
                                    <data money>${item.price}</data>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                ))}
            </div>
            <div className="see-all-elegant">
                <Link to="/products">See All</Link>
            </div>
        </div>
    );
};

export default Elegant;
