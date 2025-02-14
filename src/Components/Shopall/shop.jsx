import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../Navbar/navbar"
import './shop.css'; // Add your styling here
import ProductDetail from '../Product/product'; // Import ProductDetail component
import shopData from '../../ShopData'; // Make sure this path is correct

const Allclothes = () => {
  return (
    <section className="all-clothes">
        <Navbar/>
      <header>
        <h3 className="allhead">All Clothes</h3>
      </header>
      <div className="all-clothes-grid">
        {shopData.map((product) => (
          <ProductDetail 
            key={product.id} 
            id={product.id}
            name={product.name}
            price={product.price}
            options={product.options} 
          />
        ))}
      </div>
    </section>
  );
};

export default Allclothes;
