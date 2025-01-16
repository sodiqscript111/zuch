import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/navbar"
import './shop.css'; // Add your styling here
import shopData from '../../ShopData'; // Make sure this path is correct

const Allclothes = () => {
  return (
    <section className="all-clothes">
        <Navbar/>
      <header>
        <h3 className="allhead">All Clothes</h3>
      </header>
      <div className="all-clothes-grid">
        {shopData.map((item) => (
          <div className="all-product-card-container" key={item.id}>
            <figure className="all-product-card">
              <button title="View larger">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="all-product-image"
                />
              </button>
              <figcaption className="figcaption-all">
                <div className="all-product-meta">
                  <Link to={`/product/${item.id}`} className="all-product-name">
                    {item.name}
                  </Link>
                </div>
                <div className="all-product-cost">
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

export default Allclothes;
