import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "../../../index.css";
import logo from "./logoSecureBank.png";
const Header = () => {

  const role = "customer"; // Change this dynamically from authentication


  const isLoggedIn = true; //toggle this to check

  return (
    <div>
      {/* Top List Section */}
      {/* <div>
        <ul className="toplist">
          <li>Personal</li>
          <li>Business</li>
          <li>Corporate</li>
        </ul>
      </div> */}

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
              {isLoggedIn && role === "admin" && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/addNewAdmin"
                    >
                      Add New Admin
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/addBankManager"
                    >
                      Add Bank Manager
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/addBank"
                    >
                      Add Bank
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/ViewManagers"
                    >
                      View Bank Managers
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/ViewAllBanks"
                    >
                      View Banks
                    </Link>
                  </li>
                </>
              )}

              {isLoggedIn && role === "bank_manager" && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/addCustomer"
                    >
                      Add Customer
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/ViewAllBankAccounts"
                    >
                      Bank Accounts
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/ViewAllBankCustomers"
                    >
                      Bank Customers
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/bank/transactions"
                    >
                      Customer Transactions
                    </Link>
                  </li>
                </>
              )}

              {isLoggedIn && role === "customer" && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/MoneyTransfer"
                    >
                      Money Transfer
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/customerProfile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/transactions"
                    >
                      Transaction History
                    </Link>
                  </li>
                </>
              )}

              {role === "customer" && isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/About"
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-black nunito-standardfont"
                      to="/Contact"
                    >
                      Contact Us
                    </Link>
                  </li>
                </>
              )}

              {/* Common Links for All Users
              <li className="nav-item">
                <Link className="nav-link nunito-standardfont" to="/accounts">
                  Accounts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="/loans">
                  Loans
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black nunito-standardfont" to="/transactions">
                  Transactions
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black nunito-standardfont" to="/customerProfile">
                  Profile
                </Link>
              </li> */}

              {/* Login Button */}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link to="/" className="text-black nunito-standardfont">
                    {isLoggedIn && (
                      <button className="btn btn-danger text-white">
                        Logout
                      </button>
                    )}
                    {!isLoggedIn && (
                      <button className="btn btn-danger text-white">
                        Login
                      </button>
                    )}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
