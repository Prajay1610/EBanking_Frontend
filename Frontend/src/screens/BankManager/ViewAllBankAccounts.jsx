import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import {
  getAllBankAccounts,
  lockAccount,
  unlockAccount,
} from "../../services/bankManagerService";
import { jwtDecode } from "jwt-decode";

const ViewAllBankAccounts = () => {
  const token = localStorage.getItem("token");
  const bankId = jwtDecode(token).bankId;

  let navigate = useNavigate();
  const [allAccounts, setAllAccounts] = useState([]); // Filtered list
  const [originalAccounts, setOriginalAccounts] = useState([]); // Full list (unchanged)
  const [tempAccountNumber, setTempAccountNumber] = useState("");
  const [loading, setLoading] = useState(true);

  const [managerId, setManagerId] = useState(bankId);

  const lockAccountVar = async (accountId) => {
    const response = await lockAccount(accountId);
    if (response) {
      fetchAllBankAccounts();
    }
  };

  const unlockAccountVar = async (userId) => {
    const response = await unlockAccount(userId);
    if (response) {
      fetchAllBankAccounts();
    }
  };

  const fetchAllBankAccounts = async () => {
    try {
      setLoading(true);
      const response = await getAllBankAccounts(managerId);
      if (response) {
        setOriginalAccounts(response); // Store original data
        setAllAccounts(response); // Display full list initially
      }
    } catch (error) {
      toast.error(
        "Failed to fetch bank accounts. Please try again later: " + error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBankAccounts();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setTempAccountNumber(searchValue);

    if (searchValue.trim() === "") {
      setAllAccounts(originalAccounts); // Reset when search is empty
    } else {
      const filteredAccounts = originalAccounts.filter((account) =>
        String(account?.accountId ?? "").includes(searchValue)
      );
      setAllAccounts(filteredAccounts);
    }
  };

  const viewAccountDetails = (accountId) => {
    navigate(`/ManageBankAccount/${accountId}`);
  };

  return (
    <>
      <Header />
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
            <div className="card-body" style={{ overflowY: "auto" }}>
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
                        onChange={handleSearchChange}
                        value={tempAccountNumber}
                        required
                        style={{ border: "1px solid #544892" }}
                      />
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
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                      <th scope="col">Complete Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAccounts.map((account, index) => (
                      <tr key={index} style={{ backgroundColor: "#f8f9fa" }}>
                        <td>
                          <b>{account.customerName}</b>
                        </td>
                        <td>
                          <b>{account.bankName}</b>
                        </td>
                        <td>
                          <b>{account.accountId}</b>
                        </td>
                        <td>
                          <b>{account.ifscCode}</b>
                        </td>
                        <td>
                          <b>{account.accountType}</b>
                        </td>
                        <td>
                          {account.status === "ACTIVE" ? (
                            <b className="text-success">Active</b>
                          ) : (
                            <b className="text-danger">Locked</b>
                          )}
                        </td>
                        <td>
                          {account.status === "ACTIVE" ? (
                            <button
                              className="btn btn-sm btn-danger mx-2"
                              onClick={() => lockAccountVar(account.accountId)}
                            >
                              Lock
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() =>
                                unlockAccountVar(account.accountId)
                              }
                            >
                              Unlock
                            </button>
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              viewAccountDetails(account.accountId)
                            }
                            className="btn btn-sm btn-primary"
                            style={{
                              backgroundColor: "#544892",
                              border: "none",
                            }}
                          >
                            Manage Account
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {allAccounts.length === 0 && (
                  <p className="text-center mt-3">
                    No accounts found. Try another search.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewAllBankAccounts;
