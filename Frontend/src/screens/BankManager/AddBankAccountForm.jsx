import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
const AddBankAccountForm = () => {
  const [bankUsers, setBankUsers] = useState([]);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  let navigate = useNavigate();
  const retrieveAllBankUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/user/fetch/bank/managers",
        {
          headers: {
            Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching bank managers:", error);
      throw error;
    }
  };
  // useEffect(() => {
  //   const getAllBankUsers = async () => {
  //     const allBankUsers = await retrieveAllBankUsers();
  //     if (allBankUsers) {
  //       setBankUsers(allBankUsers.users);
  //     }
  //   };
  //   getAllBankUsers();
  // }, []);
  const [bank, setBank] = useState({
    name: "",
    code: "",
    customerName: "",
    phoneNumber: "",
    email: "",
    ifscCode: "",
    accountNo: "",
    AccountType: "",
  });
  const handleInput = (e) => {
    setBank({ ...bank, [e.target.name]: e.target.value });
  };
  const saveBank = (e) => {
    fetch("http://localhost:8080/api/bank/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(bank),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          console.log(res);
          if (res.success) {
            console.log("Got the success response");
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
            }, 1000); // Redirect after 3 seconds
          } else {
            console.log("Didn't got success response");
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
            }, 1000); // Redirect after 3 seconds
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
        }, 1000); // Redirect after 3 seconds
      });
    e.preventDefault();
  };
  return (
   <>
   <Header/>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card form-card border-color custom-bg" style={{ width: "50rem" }}>
        <div className="card-header  custom-bg-text text-center" style={{ backgroundColor: "#534891", color: "white", padding: "10px", textAlign: "center", borderRadius: "8px 8px 0 0" }}>
          <h5 className="card-title">Add Bank Account</h5>
        </div>
        <div className="card-body text-color" style={{backgroundColor: "#d6d0f2"}}>
          <form className="row g-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                <b>Bank Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                readOnly
                id="name"
                name="name"
                
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="code" className="form-label">
                <b>Bank Code</b>
              </label>
              <input
                type="number"
                className="form-control"
                id="code"
                name="code"
                readOnly
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">
                <b>Customer Name</b>
              </label>
              <input
                    type="text"
                    className="form-control"
                    id="customerName"
                name="customerName"
                    // value={customer?.bank?.name || "N/A"}
                    readOnly
                  />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                <b>Customer Phone Number</b>
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                // value={customer?.bank?.name || "N/A"}
                readOnly
              />
            </div>

            
            <div className="col-md-6 mb-3">
              <label htmlFor="email" className="form-label">
                <b>Customer Email</b>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                
                // value={customer?.bank?.name || "N/A"}
                readOnly
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="accountNo" className="form-label">
                <b>Account No</b>
              </label>
              <input
              type="number"
                className="form-control"
                id="accountNo"
                name="accountNo"
                rows="3"
                onChange={handleInput}
                value={bank.accountNo}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="ifscCode" className="form-label">
                <b>IFSC Code</b>
              </label>
              <input
                type="number"
                className="form-control"
                id="ifscCode"
                name="ifscCode"
                onChange={handleInput}
                value={bank.ifscCode}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="AccountType" className="form-label">
                <b>Account type</b>
              </label>
              <select name="AccountType" onChange={handleInput} className="form-control">
                
                <option value="">Select Account Type</option>
                <option value="S">Saving</option>
                <option value="c">Current</option>
               
              </select>
            </div>
           
            <div className="d-flex align-items-center justify-content-center">
              <button
                type="submit"
                className="btn btn-primary bg-color custom-bg-text col-md-4"
                onClick={saveBank}
                style={{ backgroundColor: "#534891", color: "white", padding: "10px", textAlign: "center"}}
              >
                Add Bank Account
              </button>
         
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
   </>
  );
};
export default AddBankAccountForm;