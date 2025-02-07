import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import {
  getCustomerAccountData,
  transferMoney,
} from "../../services/customerService";
const {jwtDecode} = require("jwt-decode");

const MoneyTransfer = () => {

  const accounts = [
    { type: "Savings" },
    //{ type: "Current" },
  ];

  const [customerId, setCustomerId] = useState(jwtDecode(localStorage.getItem('token')).customerId); 


  const [account, setAccount] = useState({
    fromAcccountNo: "",
    toAcccountNo: "",
    ifsc: "",
    amount: "",
    description: "",
    isSameBank: false, // State to track checkbox
  });

  const [accountsData, setAccountsData] = useState([]); // State for customer data
  const [loading, setLoading] = useState(true); // State for loading
  const [editAble, setIsEditAble] = useState(true);

  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    ifscCode: "SBI0000789",
  });

  const handleInput = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setAccount((prevState) => ({
      ...prevState,
      isSameBank: !prevState.isSameBank,
      ifsc: prevState.isSameBank ? "" : bankDetails.ifscCode, // Auto-populate IFSC if checked
    }));
  };

  const handleUseAccount = (accountNo) => {
    // Function to use account
    return () => {
      setAccount((prevState) => ({
        ...prevState,
        fromAcccountNo: accountNo,
      }));

      setIsEditAble(false);
    };
  };

  const validateAccountDetails = (account) => {
    let isValid = true; // Start with the assumption that everything is valid

    // Validate From Account Number
    // if (!account.fromAcccountNo || isNaN(account.fromAcccountNo)) {
    //   toast.error("From Account Number is required and must be numeric!");
    //   isValid = false;
    // } else if (!/^\d{6}$/.test(account.fromAcccountNo)) {
    //   toast.error("Please enter a valid From Account Number (6 digits)!");
    //   isValid = false;
    // }

    // Validate To Account Number
    if (isValid && (!account.toAcccountNo || isNaN(account.toAcccountNo))) {
      toast.error("To Account Number is required and must be numeric!");
      isValid = false;
    } else if (isValid && !/^\d{6}$/.test(account.toAcccountNo)) {
      toast.error("Please enter a valid To Account Number (6 digits)!");
      isValid = false;
    }

    // Validate if From and To Account Numbers are different
    if (isValid && account.fromAcccountNo === account.toAcccountNo) {
      toast.error(
        "From Account Number and To Account Number cannot be the same!"
      );
      isValid = false;
    }

    // Validate IFSC Code
    if (isValid && (!account.ifsc || !account.ifsc.trim())) {
      toast.error("IFSC code is required!");
      isValid = false;
    } else if (isValid && !/^[A-Z]{4}[0-9A-Za-z]{7}$/.test(account.ifsc)) {
      toast.error("Invalid IFSC Code! It must be 11 characters long, starting with 4 uppercase letters followed by 7 alphanumeric characters.");
      isValid = false;
    }

    // Validate Amount
    if (
      isValid &&
      (!account.amount || isNaN(account.amount) || account.amount <= 0)
    ) {
      toast.error("Please enter a valid Amount greater than 0!");
      isValid = false;
    }

    // Validate Purpose
    if (isValid && (!account.description || !account.description.trim())) {
      toast.error("Purpose is required!");
      isValid = false;
    } else if (isValid && account.description.length === 0) {
      toast.error("Purpose must be specified!");
      isValid = false;
    }

    return isValid; // Return true only if all validations pass
  };

  const handleTransfer = async (e) => {
    e.preventDefault();

    // Validate inputs before proceeding
    if (!validateAccountDetails(account)) {
      return; // Stop form submission if validation fails
    }

    const { fromAcccountNo, toAcccountNo, ifsc, amount, description } = account;
    console.log("req body" + JSON.stringify(account));
    if (!fromAcccountNo || !toAcccountNo || !ifsc || !amount || !description) {
      toast.error("Please fill all the fields.");
      return;
    }

    try {
      const response = await transferMoney(account);
      console.log(response);
      toast.success("Money transferred successfully!");
      setAccount({
        fromAcccountNo: "",
        toAcccountNo: "",
        ifsc: "",
        amount: "",
        description: "",
        isSameBank: false,
      });

      setIsEditAble(true); // Reset edit state
    } catch (error) {
      console.error("Error transferring money:", error);
      // toast.error("Error transferring money. Please try again.");
    }
  };

  const fetchAccountData = async () => {
    try {
      const data = await getCustomerAccountData(customerId);
      console.log("data" + data);

      if (data) {
        setAccountsData(data || []);
      }
    } catch (error) {
      toast.error("Error fetching customer data. Please try again.");
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <>
      <Header />

      <div className="d-flex flex-column align-items-center min-vh-100">
        {/* Card for Account Details */}
        <div
          className="card form-card border-color custom-bg my-3"
          style={{ width: "50rem" }}
        >
          <div
            className="card-header custom-bg-text text-center"
            style={{
              backgroundColor: "#534891",
              color: "white",
              padding: "10px",
              textAlign: "center",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <h5 className="card-title">Account Details</h5>
          </div>
          <div className="card-body" style={{ backgroundColor: "#d6d0f2" }}>
            <div className="table-responsive">
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
                  {accountsData.map((account, index) => (
                    <tr key={index}>
                      <td>{account.accountId}</td>
                      <td>{account.bankName}</td>
                      <td>{account.accountType}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={handleUseAccount(account.accountId)}
                        >
                          Use Account
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Card for Transfer Money */}
        <div
          className="card form-card border-color custom-bg my-3"
          style={{ width: "50rem" }}
        >
          <div
            className="card-header custom-bg-text text-center"
            style={{
              backgroundColor: "#534891",
              color: "white",
              padding: "10px",
              textAlign: "center",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <h5 className="card-title">Transfer Money</h5>
          </div>
          <div
            className="card-body text-color"
            style={{ backgroundColor: "#d6d0f2" }}
          >
            <form className="row g-3">
              {/* From Account Number Field */}
              <div className="col-md-6 mb-3">
                <label htmlFor="fromAcccountNo" className="form-label">
                  <b>From Account Number</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="fromAcccountNo"
                  name="fromAcccountNo"
                  onChange={handleInput}
                  min={0}
                  value={account.fromAcccountNo}
                  disabled={!editAble}
                />
              </div>

              {/* To Account Number Field */}
              <div className="col-md-6 mb-3">
                <label htmlFor="toAccno" className="form-label">
                  <b>To Account Number</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="toAccno"
                  name="toAcccountNo"
                  onChange={handleInput}
                  value={account.toAcccountNo}
                  min={0}
                />
              </div>

              {/* Same Bank Checkbox */}
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <b>Same Bank?</b>
                </label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={account.isSameBank}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="isSameBank">
                    Check if same bank
                  </label>
                </div>
              </div>

              {/* IFSC Field */}
              <div className="col-md-6 mb-3">
                <label htmlFor="ifsc" className="form-label">
                  <b>IFSC</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ifsc"
                  name="ifsc"
                  onChange={handleInput}
                  value={account.ifsc}
                  disabled={account.isSameBank} // Disable if "Same Bank" checkbox is checked
                />
              </div>

              {/* Amount Field */}
              <div className="col-md-6 mb-3">
                <label htmlFor="amount" className="form-label">
                  <b>Amount</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  onChange={handleInput}
                  value={account.amount}
                />
              </div>

              {/* Description Field */}
              <div className="col-md-6 mb-3">
                <label htmlFor="description" className="form-label">
                  <b>Purpose</b>
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="2"
                  onChange={handleInput}
                  value={account.description}
                />
              </div>

              {/* Transfer Button */}
              <div className="d-flex align-items-center justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success bg-color custom-bg-text col-md-4"
                  onClick={handleTransfer}
                  style={{
                    backgroundColor: "#534891",
                    color: "white",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MoneyTransfer;
