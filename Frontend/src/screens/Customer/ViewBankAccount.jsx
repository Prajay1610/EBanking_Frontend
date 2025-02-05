import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import { depositFunds, getBankAccountDetails, withdrawFunds } from "../../services/bankManagerService";
import { getAccountStatement } from "../../services/customerService";

const ViewBankAccounts = ({accountId}) => {
  let navigate = useNavigate();
  

  const [accountDetails,setAccountDetails]=useState({
    bankName:"",
    ifscCode:"",
    customerEmail:"",
    availableBalance:"",
    accountId:"",
    status:"",
    createdOn:"",
    customerName:""
  });

  const [statementDownloadRequest, setStatementDownloadRequest] = useState({
    startDate: "",
    endDate: "",
  });

  const handleUserInput=(e)=>{
    const { name, value } = e.target;
    setStatementDownloadRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const [amountToDeposit, setAmountToDeposit] = useState(0);
  const [amountToWithdraw, setAmountToWithdraw] = useState(0);
  const getSpecificAccountDetails = async (accountId) => {
    try {
             
              const response = await getBankAccountDetails(accountId); 
              if (response) {
                console.log("Bank Account:", response);
                
                setAccountDetails(response); // Update state with the retrieved data
              }
            } catch (error) {
              console.error("Error fetching bank account:", error);
              alert("Failed to load bank account. Please try again later.");
            } 
  };

  const fetchAccountStatement =async(e)=>{
    e.preventDefault(); 
   const reqbody={
    accountId:accountId,
    startDate:statementDownloadRequest.startDate,
    endDate:statementDownloadRequest.endDate
   }
    try {
      const response = await getAccountStatement(reqbody);
      if (response) {
        console.log("Account Statement:", response);
        // Show success message in toast notification
        toast.success("Account statement downloaded successfully!");
      }
    }
    catch (error) { 
      console.log("Error while fetching account statement:", error);
    }
  }

  const depositAmount = async () => {
    try {

      const reqbody={
        accountNo:accountId,
        amount:amountToDeposit,
      }

      console.log("Deposit reqbody"+JSON.stringify(reqbody));
      const response = await depositFunds(reqbody); 
      if (response) {
        console.log("Amount Deposited resp:", response);
        toast.success("Amount deposited successfully!");
        getSpecificAccountDetails(accountId);
      }
    } catch (error) {
      
      console.error("Error while depositing funds:", error);

      // Extract error message from API response
      let errorMessage = "Failed to deposit funds. Please try again later.";
    
      if (error.response) {
        // Extract error message from API response body
        errorMessage = error.response.data?.error || error.response.data?.message || "Server error occurred.";
      }
    
      // Show error in toast notification
      toast.error(errorMessage);
    
    } 
  };
  const withdrawAmount = async () => {
    try {

      const reqbody={
        accountNo:accountId,
        amount:amountToWithdraw,
      }

      console.log("Withdraw reqbody"+JSON.stringify(reqbody));
      const response = await withdrawFunds(reqbody); 
      if (response) {
        console.log("Amount withdrawal resp:", response);
        toast.success("Amount Withdrawed successfully!");
        getSpecificAccountDetails(accountId);
      }
    } catch (error) {
      console.error("Error while Withdrawing funds:", error);

      // Extract error message from API response
      let errorMessage = "Failed to withdraw funds. Please try again later.";
    
      if (error.response) {
        // Extract error message from API response body
        errorMessage = error.response.data?.error || error.response.data?.message || "Server error occurred.";
      }
    
      // Show error in toast notification
      toast.error(errorMessage);
    } 
  };
 useEffect(()=>{
  
 
  getSpecificAccountDetails(accountId);
 },[]);
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
      <Header />
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
                      type="date"
                      className="form-control"
                      name="startDate"
                      onChange={handleUserInput}
                      value={statementDownloadRequest.startDate}
                      required
                    />    
                  </div>
                  <div className="col-md-4">
                    <label className="form-label custom-primary-text">
                      <b>End Date</b>
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        name="endDate"
                        onChange={handleUserInput}
                        value={statementDownloadRequest.endDate}
                        required
                      />
                  </div>
                  <div className="col-md-4 d-flex align-items-end">
                    <button
                      type="submit"
                      className="btn custom-primary-btn w-100 py-2"
                      onClick={fetchAccountStatement}
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
                      value={accountDetails.bankName}
                      readOnly
                    />
                    <label className="form-label custom-primary-text">
                      <b>Ifsc Code</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={accountDetails.ifscCode}
                      readOnly
                    />
                    <label className="form-label custom-primary-text">
                      <b>Customer Contact</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={accountDetails.customerEmail}
                      readOnly
                    />
                    <label className="form-label custom-primary-text">
                      <b>Available Balance</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={accountDetails.balance}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label custom-primary-text">
                      <b>Bank Account No.</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={accountDetails.accountId}
                      readOnly
                    />
                    <label className="form-label custom-primary-text">
                      <b>Customer Name</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={accountDetails.customerName}
                      readOnly
                    />
                    <label className="form-label custom-primary-text">
                      <b>Creation Date</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={accountDetails.createdOn}
                      readOnly
                    />
                    <label className="form-label custom-primary-text">
                      <b>Account Status</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={accountDetails.status}
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
                        value={amountToDeposit}
                        onChange={(e) => setAmountToDeposit(e.target.value)}
                      />
                      <button
                        className="btn custom-primary-btn w-100"
                        onClick={depositAmount}
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
                        value={amountToWithdraw}
                        onChange={(e) => setAmountToWithdraw(e.target.value)}
                      />
                      <button
                        className="btn custom-primary-btn w-100"
                        onClick={withdrawAmount}
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
      <Footer />
    </>
  );
};

export default ViewBankAccounts;
