// src/components/ServiceCards.jsx
import React from "react";
import TailorIcon from "@mui/icons-material/ContentCut"; // For Bespoke Outfits & Styling (scissors)
import DesignIcon from "@mui/icons-material/Brush"; // For Designs & Collections (brush/pencil)
import StyleIcon from "@mui/icons-material/PersonOutline"; // For Personal Styling & Advisory (person)
import "./serviceCards.css";

const ServiceCards = () => {
  const services = [
    {
      title: "Bespoke Outfits & Styling",
      description: "Custom designs allowing clients to commission one-of-a-kind pieces or modify existing designs to their preferences.",
      icon: <TailorIcon className="service-icon" />,
    },
    {
      title: "Designs & Collections",
      description: "Offering classes on fashion trends, craftsmanship, or styling, and personalized fits for garments, ensuring each piece is perfectly suited to the customer’s measurements.",
      icon: <DesignIcon className="service-icon" />,
    },
    {
      title: "Personal Styling & Advisory",
      description: "Personalized appointments and styling to curate outfits based on individual tastes, body types, and lifestyle. We have consultation sessions for clients looking to be intentional about their styles.",
      icon: <StyleIcon className="service-icon" />,
    },
  ];

  return (
    <div className="service-wrapper">
      <h1 className="service-main-title">ZUCH SERVICES</h1>
      <div className="service-card-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card-item">
            {service.icon}
            <h2 className="service-card-title">{service.title}</h2>
            <p className="service-card-desc">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCards;