import React from "react";

import Footer from "../../components/layouts/Footer/Footer";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Header from "../../components/layouts/Header/Header";

const CustomerProfile = () => {
  // Sample data for transactions
  const transactions = [
    {
      date: "15-Dec-2024",
      description: "Online Shopping",
      amount: "-Rs. 100.00",
      type: "Debit",
    },
    {
      date: "12-Dec-2024",
      description: "Salary Credit",
      amount: "+Rs. 2000.00",
      type: "Credit",
    },
    {
      date: "10-Dec-2024",
      description: "Electricity Bill",
      amount: "- Rs. 75.00",
      type: "Debit",
    },
  ];

  const accounts = [
    { type: "Savings" },
    //{ type: "Current" },
  ];

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-lg">
              <div
                className="card-header text-white"
                style={{ backgroundColor: "#534891" }}
              >
                <h4 className="mb-0">Customer Profile</h4>
              </div>
              <div className="card-body">
                {/* Customer Overview */}
                <div className="text-center mb-4">
                  <img
                    src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-businessman-in-formal-suit-thinking-png-image_9194103.png"
                    alt="Customer Avatar"
                    className="rounded-circle img-thumbnail"
                    width="150"
                  />
                  <h5 className="mt-3">Shubham The Great</h5>
                  <p className="text-muted">shubhamkakde622@gmail.com</p>
                </div>

                {/* Banking Information and Nominee Details */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6>Personal Details</h6>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Gender:</strong> Male
                      </li>

                      <li className="list-group-item">
                        <strong>Last Login:</strong> 14-Dec-2024
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h6>Contact Details</h6>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Address :</strong> Pune,Maharsahtra
                      </li>
                      <li className="list-group-item">
                        <strong>Contact No:</strong> 9809875673
                      </li>
                    </ul>
                  </div>
                </div>

                {/* View Accounts Section */}
                <br></br>
                <h6>Your Accounts</h6>
                <div className="table-responsive mb-4">
                  <table
                    className="table table-striped table-hover"
                    style={{ backgroundColor: "#9d96e0" }}
                  >
                    <thead className="table-primary">
                      <tr>
                        <th>Account No.</th>
                        <th>Bank Name</th>
                        <th>Account Type</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((account, index) => (
                        <tr key={index}>
                          <td>1090987890</td>
                          <td>State bank of India</td>
                          <td>{account.type}</td>

                          <td>
                            <Link
                              to="/ViewSpecificAccountDetails"
                              className="btn btn-secondary"
                              style={{ backgroundColor: "#413C69" }}
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Recent Transactions */}
                <h6>Recent Transactions</h6>
                <div className="table-responsive">
                  <table
                    className="table table-striped table-hover"
                    style={{ backgroundColor: "#D6D0F2" }}
                  >
                    <thead className="table-primary">
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.date}</td>
                          <td>{transaction.description}</td>
                          <td
                            className={
                              transaction.type === "Credit"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {transaction.amount}
                          </td>
                          <td>{transaction.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Buttons with Link for Navigation */}
                <div className="text-center mt-4">
                  <Link
                    to="/edit-profile"
                    className="btn btn-primary mx-2"
                    style={{ backgroundColor: "#8533ff" }}
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/transactions"
                    className="btn btn-secondary mx-2"
                    style={{ backgroundColor: "#413C69" }}
                  >
                    View Transactions
                  </Link>
                  <Link to="/logout" className="btn btn-danger mx-2">
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerProfile;
