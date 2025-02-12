import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "../../../index.css";
import logo from "./logoSecureBank.png";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const jwtToken = localStorage.getItem("token");
  let role = null;
  let userName = null; // To store the user's name
  let isLoggedIn = false;

  if (jwtToken) {
    try {
      const decodedToken = jwtDecode(jwtToken);
      

     
      if (decodedToken.role && Array.isArray(decodedToken.role)) {
        role = decodedToken.role[0]; 
      }
      userName = decodedToken.name || "User"; 

      const currentTime = Math.floor(Date.now() / 1000); 
      isLoggedIn = decodedToken.exp > currentTime; 
    } catch (error) {
      localStorage.removeItem("token"); 
    }
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top bg-navbar">
        <div className="container-fluid custom-navbar">
          <a className="navbar-brand text-black" href="/home">
            <img
              src={logo}
              style={{
                width: "auto",
                height: "35px",
              }}
              className="main-logo"
              alt="Logo"
            />
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
          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto custom-navlinks">
              {/* Role-Based Navigation */}
              {isLoggedIn && role === "ROLE_ADMIN" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/addNewAdmin">
                      Add New Admin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/addBankManager">
                      Add Bank Manager
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/addBank">
                      Add Bank
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/ViewManagers">
                      View Bank Managers
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/ViewAllBanks">
                      View Banks
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && role === "ROLE_BANKMANAGER" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/addCustomer">
                      Add Customer
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/ViewAllBankAccounts">
                      Bank Accounts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/ViewAllBankCustomers">
                      Bank Customers
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/bank/transactions">
                      Customer Transactions
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && role === "ROLE_CUSTOMER" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/MoneyTransfer">
                      Money Transfer
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/customerProfile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/customer/transactions">
                      Transaction History
                    </Link>
                  </li>
                </>
              )}
              {/* Common Links for All Users */}
              {role !== "ROLE_BANKMANAGER" && role !== "ROLE_ADMIN" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/About">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active text-black nunito-standardfont" to="/Contact">
                      Contact Us
                    </Link>
                  </li>
                </>
              )}
              {/* User Info and Logout Button */}
              <li className="nav-item d-flex align-items-center">
                {isLoggedIn ? (
                  <>
                    <span
  className="fw-bold px-3 py-2 rounded me-3"
  style={{
    backgroundColor: "#6A5ACD", 
    color: "white", 
    border: "1px solid #534891",
    textShadow: "0.5px 0.5px 1px rgba(0, 0, 0, 0.2)", 
    borderRadius: "8px", 
    fontFamily: "'Nunito', sans-serif", 
  }}
>
  {userName} ({role?.replace("ROLE_", "")})
</span>
                    <button
                      className="btn btn-danger text-white"
                      onClick={() => {
                        localStorage.removeItem("token"); // Remove token on logout
                        window.location.href = "/"; // Redirect to login page
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/" className="btn btn-success text-white">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;