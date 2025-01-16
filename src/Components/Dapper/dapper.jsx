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
            <h1>Dapper Collection</h1>
            <div className="product-grid-dapper">
                {products.map((item) => (
                    <Link
                        to={`/product/${item.id}`}
                        key={item.id}
                        className="product-card-container-dapper"
                    >
                        <figure className="product-card-dapper">
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                loading="lazy"
                                className="product-image-dapper"
                            />
                            <figcaption>
                                <div className="product-meta-dapper">
                                    <span className="product-name-dapper">{item.name}</span>
                                </div>
                                <div className="product-cost-dapper">
                                    <data money>${item.price}</data>
                                </div>
                            </figcaption>
                        </figure>
                    </Link>
                ))}
            </div>
            <div className="see-all-dapper">
                <Link to="/clothes">See All</Link>
            </div>
        </div>
    );
};

export default Dapper;
