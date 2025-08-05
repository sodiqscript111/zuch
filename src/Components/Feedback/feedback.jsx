// src/components/ClientFeedback.jsx
import React from "react";
import "./feedback.css";

const ClientFeedback = () => {
  const feedback = [
    {
      name: "Chukwudi Eze",
      review: "The craftsmanship is unmatched. My custom kaftan fits like a dream and turns heads at every event!",
    },
    {
      name: "Fatima Adebayo",
      review: "I love how Zuch blends tradition with modernity. The styling advice transformed my wardrobe into something truly unique.",
    },
  ];

  return (
    <div className="feedback-container">
      <h1 className="feedback-heading">CLIENT FEEDBACK</h1>
      <div className="feedback-grid">
        {feedback.map((item, index) => (
          <div key={index} className="feedback-card">
            <div className="feedback-avatar">
              <span>{item.name[0]}</span> {/* Initial as avatar */}
            </div>
            <p className="feedback-review">"{item.review}"</p>
            <h3 className="feedback-name">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientFeedback;