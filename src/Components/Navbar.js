import React from "react";
import Logo from "../assets/Gator-Aid-Logo.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <div className ="navbar">
        <div className="leftSide">
            <img src={Logo} />
            </div>
        <div className="rightSide">
            <Link to="/"> Home </Link>
            <Link to="/Resources"> Resources </Link>
            <Link to="/Timer"> Timer </Link>
            <Link to="/Music"> Music </Link>
        </div>
    </div>
  );
}

export default Navbar