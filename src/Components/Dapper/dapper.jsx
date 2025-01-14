import React from 'react';
import { Link } from 'react-router-dom';
import './dapper.css';

const Dapper = () => {
    const products = [
        { id: 1, name: 'Product 1', price: 29.99, imageUrl: 'https://i.ibb.co/QJbzDtB/Whats-App-Image-2025-01-13-at-12-35-01-PM-3.jpg' },
        { id: 2, name: 'Product 2', price: 39.99, imageUrl: 'https://i.ibb.co/FkQ1dz4/Whats-App-Image-2025-01-13-at-12-34-59-PM.jpg' },
        { id: 3, name: 'Product 3', price: 19.99, imageUrl: 'https://i.ibb.co/mtrf85V/Whats-App-Image-2025-01-13-at-12-34-59-PM-2.jpg' },
        { id: 4, name: 'Product 4', price: 49.99, imageUrl: 'https://i.ibb.co/NsHKvHh/Whats-App-Image-2025-01-13-at-12-35-01-PM-1.jpg' },
    ];

    return (
        <div className="dapper-container-dapper">
            <h1>Dapper Component</h1>
            <div className="product-grid-dapper">
                {products.map((item) => (
                    <div className="product-card-container-dapper" key={item.id}>
                        <figure className="product-card-dapper">
                            <button title="View larger">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    loading="lazy"
                                    className="product-image-dapper"
                                />
                            </button>
                            <figcaption>
                                <div className="product-meta-dapper">
                                    <Link to={`/product/${item.id}`} className="product-name-dapper">
                                        {item.name}
                                    </Link>
                                </div>
                                <div className="product-cost-dapper">
                                    <data money>${item.price}</data>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                ))}
            </div>
            <div className="see-all-dapper">
                <Link to="/products">See All</Link>
            </div>
        </div>
    );
};

export default Dapper;
