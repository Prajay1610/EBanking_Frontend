import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";

const MoneyTransfer = () => {

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  // const retrieveAllBankUsers = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8080/api/user/fetch/bank/managers",
  //       {
  //         headers: {
  //           Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching bank managers:", error);
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   const getAllBankUsers = async () => {
  //     const allBankUsers = await retrieveAllBankUsers();
  //     if (allBankUsers) {
  //       setBankUsers(allBankUsers.users);
  //     }
  //   };

  //   getAllBankUsers();
  // }, []);

  const [customer, setCustomer] = useState({
    accno: "",
    ifsc: "",
    amount: "",
    purpose: "",
  });

  const handleInput = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
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
          <h5 className="card-title">Transfer Money</h5>
        </div>
        <div className="card-body text-color" style={{backgroundColor: "#d6d0f2"}}>
          <form className="row g-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="accno" className="form-label">
                <b>Account Number</b>
              </label>
              <input
                type="number"
                className="form-control"
                id="accno"
                name="accno"
                onChange={handleInput}
                value={customer.accno}
              />
            </div>

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
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="code" className="form-label">
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

            <div className="col-md-6 mb-3">
              <label htmlFor="purpose" className="form-label">
                <b>Purpose</b>
              </label>
              <textarea
                className="form-control"
                id="purpose"
                name="purpose"
                rows="3"
                onChange={handleInput}
                value={customer.purpose}
              />
            </div>

            <div className="d-flex align-items-center justify-content-center">
              <button
                type="submit"
                className="btn btn-success bg-color custom-bg-text col-md-4"
                onClick={saveCustomer}
                style={{ backgroundColor: "#534891", color: "white", padding: "10px", textAlign: "center"}}
              >
               Transfer
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default MoneyTransfer;
