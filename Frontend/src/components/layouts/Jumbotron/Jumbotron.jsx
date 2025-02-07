import React from "react";

import "./Jumbotron.css";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

function Jumbotron() {
  return (
    <>
    
       <div className="jumbotron-container">
    <div className="curvy-image-container">
      <div className="text-overlay animate__animated animate__bounceInDown">
        <h1>Your Banking, Your Way</h1>
        <p>Experience the future of banking with us.</p>
        <Link to="/about"><button className="btn btn-danger">Explore</button></Link>
      </div>
    </div>
  </div>

    </>
   
  );
}

export default Jumbotron;
