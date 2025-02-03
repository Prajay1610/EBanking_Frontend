import React from "react";

import Footer from "../../components/layouts/Footer/Footer";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Header from "../../components/layouts/Header/Header";

const ViewSpecificAccountDetails = () => {
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
                <h4 className="mb-0">Account Details</h4>
              </div>
              <div className="card-body">
                {/* Customer Overview */}

                {/* Banking Information and Nominee Details */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <br />

                    <ul className="list-group list-group-flush">
                      <br />
                      <li className="list-group-item">
                        <i>
                          <b>Personal Details:</b>
                        </i>
                      </li>
                      <li className="list-group-item">
                        <strong>Customer Name :</strong> User1
                      </li>
                      <li className="list-group-item">
                        <strong>Customer Email :</strong> User1@gmail.com
                      </li>
                      <li className="list-group-item">
                        <strong>Gender :</strong> Male
                      </li>
                      <li className="list-group-item">
                        <strong>Phone No :</strong> 9876447560
                      </li>
                      <li className="list-group-item">
                        <strong>Address : </strong>Pune,Maharashtra
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6" text-center>
                    <br />

                    <ul className="list-group list-group-flush">
                      <br />
                      <li className="list-group-item">
                        <i>
                          <b>Account Details:</b>
                        </i>
                      </li>
                      <li className="list-group-item">
                        <strong>Bank Name : </strong>State Bank of India
                      </li>
                      <li className="list-group-item">
                        <strong>Ifsc code : </strong>1034123412
                      </li>

                      <li className="list-group-item">
                        <strong>Account No : </strong>1034123412
                      </li>

                      <li className="list-group-item">
                        <strong>Balance : </strong>1034123412
                      </li>

                      <li className="list-group-item">
                        <strong>Account Type : </strong>Savings
                      </li>

                      <li className="list-group-item">
                        <strong>Status : </strong>Active
                      </li>

                      <li className="list-group-item">
                        <strong>Created On : </strong>12/12/2024
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Recent Transactions */}
                <h6>Recent Transactions</h6>
                <div className="table-responsive">
                  <table
                    className="table table-striped table-hover"
                    style={{ backgroundColor: "#9d96e0" }}
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default ViewSpecificAccountDetails;
