// src/pages/Home.js
import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to CoLive Connect</h1>
        <p>Find your perfect roommate match based on compatibility and lifestyle preferences</p>
        <div className="hero-buttons">
          <a href="/register" className="cta-button primary">Get Started</a>
          <a href="/login" className="cta-button secondary">Sign In</a>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Why Choose CoLive Connect?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🎯 Smart Matching</h3>
            <p>Our advanced compatibility algorithm matches you with roommates based on lifestyle, habits, and preferences.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Safe Connections</h3>
            <p>Connect with potential roommates through our secure messaging system after mutual acceptance.</p>
          </div>
          <div className="feature-card">
            <h3>🏠 Verified Profiles</h3>
            <p>Detailed compatibility profiles help you make informed decisions about your living situation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


