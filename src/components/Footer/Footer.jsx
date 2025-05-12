// src/components/Footer.jsx
import React, { useState } from "react";
import "./Footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  const [visibleSection, setVisibleSection] = useState(null);

  const toggleSection = (section) => {
    setVisibleSection(prev => (prev === section ? null : section));
  };

  return (
    <footer className={`footer-container ${visibleSection ? "footer-expanded" : ""}`}>

      <div className="footer-stars">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="star" />
        ))}
      </div>

      <div className="h-full flex flex-col justify-center items-center relative">
        <div className="footer-top-text">Explore the Recipes</div>

        <div className="footer-links">
          <Link to="/">
            <span>Home</span>
          </Link>
          <span onClick={() => toggleSection("contact")} style={{ cursor: "pointer" }}>
            Contact
          </span>
          <span onClick={() => toggleSection("about")} style={{ cursor: "pointer" }}>
            About
          </span>
        </div>

        {visibleSection === "contact" && (
          <div className="footer-info-text">
            <p>Developed By Sharayu Sambhaji Tambvekar.</p>
            <p>Email: tambvekarsharayu@gmail.com</p>
            <p>Phone: +123-456-7890</p>
          </div>
        )}

        {visibleSection === "about" && (
          <div className="footer-info-text">
            <p>RecipeFinder is your go-to place for easy and tasty recipes.</p>
            <p>Just enter the ingredients you have, and we’ll show you what you can cook.</p>
            <p>It’s perfect for busy people, beginners, or anyone who loves food.</p>
            <p>You can also save your favorite recipes and watch helpful cooking videos.</p>
            <p>We make cooking fun, simple, and stress-free — right from your kitchen!</p>
          </div>
        )}

        <div className="footer-bottom-text">
          RecipeFinder. All rights reserved © {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
