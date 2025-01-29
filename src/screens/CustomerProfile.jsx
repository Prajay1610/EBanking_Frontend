import React from 'react';
import Header from '../components/layouts/Header/Header';

import Jumbotron from '../components/layouts/Jumbotron';


const CustomerProfile = () => {
 
    //We will fetch data from backend - Sample dta
  const transactions = [
    { date: "15-Dec-2024", description: "Online Shopping", amount: "-Rs. 100.00", type: "Debit" },
    { date: "12-Dec-2024", description: "Salary Credit", amount: "+Rs. 2000.00", type: "Credit" },
    { date: "10-Dec-2024", description: "Electricity Bill", amount: "- Rs. 75.00", type: "Debit" },
  ];

  return (

   <>
    <Header/>
     <div className="container mt-5">

    <div>
        <Header/>
        <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-lg">
          <div className="card-header text-white" style={{ backgroundColor: "#534891" }}>
              <h4 className="mb-0">Customer Profile</h4>
            </div>
            <div className="card-body">
              {/* Customer Overview */}
              <div className="text-center mb-4">
                <img //sample image for google
                  src="https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-businessman-in-formal-suit-thinking-png-image_9194103.png"
                  alt="Customer Avatar"
                  className="rounded-circle img-thumbnail"
                  width="150"
                />
                <h5 className="mt-3">Shubham The great</h5>
                <p className="text-muted">shubhamkakde622@gmail.com</p>
              </div>

             
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6>Banking Information</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Account Type:</strong> Savings
                    </li>
                    <li className="list-group-item">
                      <strong>Account Balance:</strong> Rs 69,469,50.00
                    </li>
                    <li className="list-group-item">
                      <strong>Last Login:</strong> 14-Dec-2024
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h6>Nominee Details</h6>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Name:</strong> Shubham Kakde
                    </li>
                    <li className="list-group-item">
                      <strong>Relation:</strong> Swatah
                    </li>
                  </ul>
                </div>
              </div>

              {/* Recent Transactions from backend */}
              <h6>Recent Transactions</h6>
              <div className="table-responsive">
                <table className="table table-striped table-hover" style={{backgroundColor: "#9d96e0"}}>
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
                            transaction.type === "Credit"  //Conditional rendering if credit - display text in green else in red
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

            
              <div className="text-center mt-4">
                <button className="btn btn-primary mx-2" style={{backgroundColor: "#8533ff"}} >Edit Profile</button>
                <button className="btn btn-secondary mx-2" style={{backgroundColor: "#413C69"}}>View Transactions</button>
                <button className="btn btn-danger mx-2">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

   </>

    </div>
    
  );
};

export default CustomerProfile;

