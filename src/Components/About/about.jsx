// src/components/About.jsx
import React from 'react';
import './about.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About ZUCH</h1>
      <div className="about-content">
        <h2>ZUCH COLLECTION</h2>
        <p>
          At ZUCH COLLECTION, we blend style, quality, and individuality to create fashion that empowers and gives an expression of class & luxury. 
          Our pieces are crafted with care and designed for those who embrace self-expression with confidence.
        </p>
        <p className="tagline">Get Zuched!</p>
      </div>
    </div>
  );
};

export default About;