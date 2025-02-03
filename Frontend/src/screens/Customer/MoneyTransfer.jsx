import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";

const MoneyTransfer = () => {
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  let navigate = useNavigate();

  const accounts = [
    { type: "Savings" },
    //{ type: "Current" },
  ];

  const [customer, setCustomer] = useState({
    fromAccno: "",
    toAccno: "",
    ifsc: "",
    amount: "",
    purpose: "",
    isSameBank: false, // State to track checkbox
  });

  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    ifscCode: "SBI00089019",
  });

  useEffect(() => {
    // Assuming the JWT contains the bank details (can decode it or retrieve it via API)
    if (admin_jwtToken) {
      const decodedToken = JSON.parse(atob(admin_jwtToken.split(".")[1])); // Decoding JWT token
      const bankInfo = {
        bankName: decodedToken.bankName, // Assuming the bank name is in the token
        ifscCode: decodedToken.ifscCode, // Assuming the IFSC code is in the token
      };
      setBankDetails(bankInfo); // Set the bank details from JWT token
    }
  }, [admin_jwtToken]);

  const handleInput = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setCustomer((prevState) => ({
      ...prevState,
      isSameBank: !prevState.isSameBank,
      ifsc: prevState.isSameBank ? "" : bankDetails.ifscCode, // Auto-populate IFSC if checked
    }));
  };

  const saveCustomer = (e) => {
    fetch("http://localhost:8080/api/bank/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(customer),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          } else {
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      });
    e.preventDefault();
  };

  return (
    <>
      <Header />

      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="card form-card border-color custom-bg"
          style={{ width: "50rem" }}
        >
          <div
            className="card form-card border-color custom-bg"
            style={{ width: "50rem" }}
          >
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
                  {accounts.map((account, index) => (
                    <tr key={index}>
                      <td>1090987890</td>
                      <td>State bank of India</td>
                      <td>{account.type}</td>

                      <td>
                        <Link
                          to=""
                          className="btn btn-secondary"
                          style={{ backgroundColor: "#413C69" }}
                        >
                          Use Account
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <br />
          <br />
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
                <label htmlFor="fromAccno" className="form-label">
                  <b>From Account Number</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="fromAccno"
                  name="fromAccno"
                  onChange={handleInput}
                  min={0}
                  value={customer.fromAccno}
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
                  name="toAccno"
                  onChange={handleInput}
                  value={customer.toAccno}
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
                    checked={customer.isSameBank}
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
                  value={customer.ifsc}
                  disabled={customer.isSameBank} // Disable if "Same Bank" checkbox is checked
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
                  value={customer.amount}
                />
              </div>

              {/* Purpose Field */}
              <div className="col-md-6 mb-3">
                <label htmlFor="purpose" className="form-label">
                  <b>Purpose</b>
                </label>
                <textarea
                  className="form-control"
                  id="purpose"
                  name="purpose"
                  rows="2"
                  onChange={handleInput}
                  value={customer.purpose}
                />
              </div>

              {/* Transfer Button */}
              <div className="d-flex align-items-center justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success bg-color custom-bg-text col-md-4"
                  onClick={saveCustomer}
                  style={{
                    backgroundColor: "#534891",
                    color: "white",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  Transfer
                </button>
                <ToastContainer />
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
