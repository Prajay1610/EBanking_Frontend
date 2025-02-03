import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";

const ViewAllBankAccounts = () => {
  let navigate = useNavigate();
  const [allAccounts, setAccounts] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [tempAccountNumber, setTempAccountNumber] = useState("");

  // Mock data for testing
  const mockAccounts = [
    {
      user: { name: "John Doe" },
      bank: { name: "Global Bank" },
      number: "1234567890",
      ifscCode: "GLB0001234",
      type: "Savings",
      status: "Open",
    },
    {
      user: { name: "Jane Smith" },
      bank: { name: "National Bank" },
      number: "9876543210",
      ifscCode: "NTB0005678",
      type: "Current",
      status: "Lock",
    },
    {
      user: { name: "Alice Johnson" },
      bank: { name: "City Bank" },
      number: "5678901234",
      ifscCode: "CTB0009101",
      type: "Savings",
      status: "Open",
    },
  ];

  // Simulate fetching data from the backend
  useEffect(() => {
    setAccounts(mockAccounts); // Use mock data for testing
  }, []);

  const searchBankAccountsByAccountNumber = (e) => {
    e.preventDefault();
    setAccountNumber(tempAccountNumber);
    // Filter mock data based on account number
    const filteredAccounts = mockAccounts.filter((account) =>
      account.number.includes(tempAccountNumber)
    );
    setAccounts(filteredAccounts);
  };

  const viewAccountDetails = (customer) => {
    navigate("/customer/bank/account/detail", { state: customer });
  };

  const viewAccountStatement = (customer) => {
    navigate("/customer/bank/account/statement", { state: customer });
  };

  const openAccount = (accountId) => {
    toast.success("Account opened successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const lockAccount = (accountId) => {
    toast.error("Account locked successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (

    <>
    <Header/>
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="mt-2">
        <div
          className="card form-card ms-5 me-5 mb-5"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #544892",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="card-header text-center"
            style={{
              backgroundColor: "#544892",
              color: "#ffffff",
              borderBottom: "1px solid #544892",
              borderRadius: "10px 10px 0 0",
            }}
          >
            <h2>All Bank Accounts</h2>
          </div>
          <div
            className="card-body"
            style={{
              overflowY: "auto",
            }}
          >
            <div className="row mb-3">
              <div className="col">
                <form className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label>
                      <b>Account Number</b>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter account no..."
                      onChange={(e) => setTempAccountNumber(e.target.value)}
                      value={tempAccountNumber}
                      required
                      style={{ border: "1px solid #544892" }}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg mt-3"
                      style={{ backgroundColor: "#544892", border: "none" }}
                      onClick={searchBankAccountsByAccountNumber}
        
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="table-responsive mt-2">
              <table className="table table-hover text-center">
                <thead
                  className="table-bordered"
                  style={{ backgroundColor: "#544892", color: "#ffffff" }}
                >
                  <tr>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Bank Name</th>
                    <th scope="col">Account No.</th>
                    <th scope="col">Ifsc Code</th>
                    <th scope="col">Account Type</th>
                    <th scope="col">Complete Detail</th>
                    <th scope="col">Status</th>
                    <th scope="col">Statement</th>
                  </tr>
                </thead>
                <tbody>
                  {allAccounts.map((account, index) => (
                    <tr key={index} style={{ backgroundColor: "#f8f9fa" }}>
                      <td>
                        <b>{account.user.name}</b>
                      </td>
                      <td>
                        <b>{account.bank.name}</b>
                      </td>
                      <td>
                        <b>{account.number}</b>
                      </td>
                      <td>
                        <b>{account.ifscCode}</b>
                      </td>
                      <td>
                        <b>{account.type}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => viewAccountDetails(account.user)}
                          className="btn btn-sm btn-primary"
                          style={{ backgroundColor: "#544892", border: "none" }}
                        >
                          View Detail
                        </button>
                      </td>
                      <td>
                        <b>{account.status}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => viewAccountStatement(account.user)}
                          className="btn btn-sm btn-primary"
                          style={{ backgroundColor: "#544892", border: "none" }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    <Footer/>
    </>
    
  );
};

export default ViewAllBankAccounts;