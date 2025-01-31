import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";

const AddNewAdmin = () => {

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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender:"",
    age: "",
    password: "",
    address: "",
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
          <h5 className="card-title">Add Admin</h5>
        </div>
        <div className="card-body text-color" style={{backgroundColor: "#d6d0f2"}}>
          <form className="row g-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                <b>First Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                onChange={handleInput}
                value={customer.firstName}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="code" className="form-label">
                <b>Last Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                onChange={handleInput}
                value={customer.lastName}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="code" className="form-label">
                <b>Email</b>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={handleInput}
                value={customer.email}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="website" className="form-label">
                <b>Phone No</b>
              </label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                className="form-control"
                id="phone"
                name="phone"
                onChange={handleInput}
                value={customer.phone}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="address" className="form-label">
                <b>Gender</b>
              </label>
              <select name="userId" onChange={handleInput} className="form-control">
                
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
               
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="quantity" className="form-label">
                <b>Age</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="age"
                name="age"
                onChange={handleInput}
                value={customer.age}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label">
                <b>Password</b>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleInput}
                value={customer.password}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="address" className="form-label">
                <b>Address</b>
              </label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                rows="3"
                onChange={handleInput}
                value={customer.address}
              />
            </div>

           
            <div className="d-flex align-items-center justify-content-center">
              <button
                type="submit"
                className="btn btn-primary bg-color custom-bg-text col-md-4"
                onClick={saveCustomer}
                style={{ backgroundColor: "#534891", color: "white", padding: "10px", textAlign: "center"}}
              >
                Add Admin
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

export default AddNewAdmin;
