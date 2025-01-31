import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";

const ViewBankAccounts = () => {
  let navigate = useNavigate();
  const [allAccounts, setAccounts] = useState([]);
  // const bank = JSON.parse(sessionStorage.getItem("active-bank"));

  const [accountNumber, setAccountNumber] = useState("");

  const [tempAccountNumber, setTempAccountNumber] = useState("");

  const bank_jwtToken = sessionStorage.getItem("bank-jwtToken");

  const [updateBankAccountStatusRequest, setUpdateBankAccountStatusRequest] =
    useState({
      accountId: "",
      status: "",
    });

 
  const styles = `
  .custom-primary-bg { background-color: #544892; }
  .custom-secondary-bg { background-color: #6c5ba7; }
  .custom-primary-text { color: #544892; }
  .custom-primary-btn { 
    background-color: #544892; 
    color: white;
    border: none;
  }
  .custom-primary-btn:hover {
    background-color: #6c5ba7;
    color: white;
  }
  .form-control:focus {
    border-color: #544892;
    box-shadow: 0 0 0 0.2rem rgba(84, 72, 146, 0.25);
  }
`;
  

  return (
    <>
    <Header/>
    <div className="container-fluid p-4">
      <style>{styles}</style>
      <div className="row g-4">
        {/* Statement Download Section */}
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header custom-primary-bg text-white">
              <h4 className="mb-0">Download Statement</h4>
            </div>
            <div className="card-body">
              <form className="row g-3 align-items-center">
                <div className="col-md-4">
                  <label className="form-label custom-primary-text">
                    <b>Start Date</b>
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="startDate"
                    // onChange={handleUserInput}
                    // value={statementDownloadRequest.startDate}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label custom-primary-text">
                    <b>End Date</b>
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="endDate"
                    // onChange={handleUserInput}
                    // value={statementDownloadRequest.endDate}
                    required
                  />
                </div>
                <div className="col-md-4 d-flex align-items-end">
                  <button
                    type="submit"
                    className="btn custom-primary-btn w-100 py-2"
                    // onClick={downloadStatement}
                  >
                    Download PDF Statement
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Account Details Section */}
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header custom-primary-bg text-white">
              <h4 className="mb-0">Account Details</h4>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {/* ... (keep existing form fields same, just update classes) */}
                <div className="col-md-6">
                  <label className="form-label custom-primary-text">
                    <b>Bank Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // value={customer?.bank?.name || "N/A"}
                    readOnly
                  />
                </div>
                {/* Add similar styling for other form elements */}
              </div>
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="col-lg-4">
          <div className="card shadow">
            <div className="card-header custom-primary-bg text-white">
              <h4 className="mb-0">Quick Actions</h4>
            </div>
            <div className="card-body">
              <div className="d-grid gap-3">
                {/* Deposit Card */}
                <div className="card">
                  <div className="card-header custom-secondary-bg text-white">
                    Deposit Funds
                  </div>
                  <div className="card-body">
                    <input
                      type="number"
                      className="form-control mb-3"
                      placeholder="Enter amount"
                      // value={amountToDeposit}
                      // onChange={(e) => setAmountToDeposit(e.target.value)}
                    />
                    <button 
                      className="btn custom-primary-btn w-100"
                      // onClick={depositAmount}
                    >
                      Deposit
                    </button>
                  </div>
                </div>

                {/* Withdraw Card */}
                <div className="card">
                  <div className="card-header custom-secondary-bg text-white">
                    Withdraw Funds
                  </div>
                  <div className="card-body">
                    <input
                      type="number"
                      className="form-control mb-3"
                      placeholder="Enter amount"
                      // value={amountToWithdraw}
                      // onChange={(e) => setAmountToWithdraw(e.target.value)}
                    />
                    <button 
                      className="btn custom-primary-btn w-100"
                      // onClick={withdrawAmount}
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
    <Footer/>
    </>
    
  );
};

export default ViewBankAccounts;