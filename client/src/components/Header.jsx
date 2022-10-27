import React from "react";
import { Link } from "react-router-dom";
import "../static/styles/header.css";

function Header(){
  return(
    <Link to="/" className="heading">
      <div className="logo"></div>
      <div className="mainHeading">
        <h2>RAM SETU Laptop Distribution Yojana!</h2>
      </div>
      <div className="yogi"></div>
    </Link>
  );
}

export default Header;