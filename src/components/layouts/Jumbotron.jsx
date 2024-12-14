import React from "react";

import "./Jumbotron.css";
import Header from "./Header/Header";

function Jumbotron() {
  return (
    <>
    <Header/>
       <div className="jumbotron-container">
    <div className="curvy-image-container">
      <div className="text-overlay animate__animated animate__bounceInDown">
        <h1>Your Banking, Your Way</h1>
        <p>Experience the future of banking with us.</p>
        <a className="btn btn-danger">Explore</a>
      </div>
    </div>
  </div>
    </>
   
  );
}

export default Jumbotron;
