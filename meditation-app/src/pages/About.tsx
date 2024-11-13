import React from 'react';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <div className="about-content">
        <p className="about-description">
          At Calmanaut, our mission is to guide you on your journey to mindfulness and personal growth.
          Whether you are looking to cultivate inner peace, track your meditation progress, or explore
          a library of resources, we are here to help you thrive.
        </p>
        <p className="about-highlight">
          Our platform is designed with your well-being in mind, offering tools and features to empower
          you on your path to self-discovery.
        </p>
      </div>
      <div className="about-theme">
        <div className="color-box green-box">Peace</div>
        <div className="color-box orange-box">Balance</div>
        <div className="color-box red-box">Resilience</div>
      </div>
    </div>
  );
};

export default About;
