import React from 'react';
import './newclothes.css'; 

import { Link } from 'react-router-dom';

const Newclothes = ({ shopData }) => {
  return (
    <section className="most-popular">
      <header>
        <h3>
          Most Popular
          <Link to="/shop">
            <span>See All </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill='black'
              width={20}
              className="icon-arrow-thick-right-circle"
            >
              <circle cx="12" cy="12" r="10" className="secondary" color='white' />
              <path
                className="primary"
                fill='white'
                d="M12 14H7a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h5V8a1 1 0 0 1 1.7-.7l4 4a1 1 0 0 1 0 1.4l-4 4A1 1 0 0 1 12 16v-2z"
              />
            </svg>
          </Link>
        </h3>
      </header>
      <div className="most-popular-scroller">
        {shopData.map((item) => (
          <div className="product-card-container" key={item.id}>
            <figure className="product-card">
              <button title="View larger">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="product-image"
                />
              </button>
              <figcaption>
                <div className="product-meta">
                  <Link to={`/product/${item.id}`} className="product-name">
                    {item.name}
                  </Link>
                 
                </div>
                <div className="product-cost">
                  <data money>${item.price}</data>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Newclothes;
