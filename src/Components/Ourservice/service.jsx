// src/components/ServiceCards.jsx
import React from "react";
import "./serviceCards.css";

const ServiceCards = () => {
  const services = [
    {
      title: "Bespoke Outfits & Styling",
      description: "Custom designs allowing clients to commission one-of-a-kind pieces or modify existing designs to their preferences.",
    },
    {
      title: "Designs & Collections",
      description: "Offering classes on fashion trends, craftsmanship, or styling, and personalized fits for garments, ensuring each piece is perfectly suited to the customer’s measurements.",
    },
    {
      title: "Personal Styling & Advisory",
      description: "Personalized appointments and styling to curate outfits based on individual tastes, body types, and lifestyle. We have consultation sessions for clients looking to be intentional about their styles.",
    },
  ];

  return (
    <div className="services-container">
      <h1 className="services-heading">ZUCH SERVICES</h1>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h2 className="service-title">{service.title}</h2>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;