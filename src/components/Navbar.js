import React from "react";
import logo from "../img/logo.jpg";

const Navbar = () => {
  return (
    <nav className="nav z-depth-1">
      <div className="container">
        <img src={logo} alt="Weather App Logo" />
      </div>
    </nav>
  );
};

export default Navbar;
