import React from 'react'
import './Header.css';
import '../../../index.css';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div>
      <div>
       <ul className='toplist'>
       <li>Personal</li>
        <li>Business</li>
        <li>Coroporate</li>
       </ul>

      </div>
    <nav className="navbar navbar-expand-lg  sticky-top">
      <div className="container-fluid custom-navbar ">
        <a className="navbar-brand text-black" href="/home">
         {/* <img src="logo.png" className='main-logo'></img> */}
         Logo Here
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon custom-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto custom-navlinks">
            <li className="nav-item custom-navlinks ">
              <a className="nav-link active text-black nunito-standardfont" href="/home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link nunito-standardfont" href="/about">
                Accounts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black" href="#loans">
                Loans
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black nunito-standardfont" href="#transactions">
                Transactions
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black nunito-standardfont" href="/customerProfile">
               Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="text-black nunito-standardfont" href="#contact">
               <button className='btn btn-danger '><Link to='/' className='text-white'>Login</Link></button>
              </a>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default Header;
