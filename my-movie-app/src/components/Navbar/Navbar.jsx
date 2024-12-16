import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-links">
        <a href="/" className="nav-link">
          Popular
        </a>
        <a href="/airing-now" className="nav-link">
          Airing Now
        </a>
        <a href="/favorites" className="nav-link">
          My Favorites
        </a>
      </div>
    </div>
  );
};

export default Navbar;
