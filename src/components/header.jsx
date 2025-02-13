import React from "react";
import './style/header.css';
import headerBg from "../images/headerBg.jpg";


const Header = () => {
  return (
    <header className="header">
      <img src={headerBg} alt="Header Background" className="header-img" />
      <div className="header-content">
        <h3>New Arrival</h3>
        <h1>Discover Our New Collection</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
             Ut elit tellus, luctus nec ullamcorper mattis.</p>
        <button className="cta-button">BUY Now</button>
      </div>
    </header>
  );
};

export default Header;
