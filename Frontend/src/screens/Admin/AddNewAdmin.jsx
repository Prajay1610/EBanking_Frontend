import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import { addNewAdmin } from "../../services/adminService";

const AddNewAdmin = () => {

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  

  const [admin, setAdmin] = useState({
    fname: "",
    lname: "",
    email: "",
    phoneNo: "",
    gender:"",
    password: "",
    address: "",
    role:"ADMIN",
    isActive:true,
  });

  const handleInput = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const saveAdmin = async (e) => {
    e.preventDefault(); // Prevents default form submission
    console.log("called!")
    try {
      console.log(admin);
      const result = await addNewAdmin(admin); // Only one API call here
  
      if (result) {
        toast.success("Admin added successfully");
        navigate("/"); // Navigate only after success
      } else {
        toast.error("Admin not added!");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
      toast.error("An error occurred!");
    }
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
          <form className="row g-3" onSubmit={saveAdmin}>
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                <b>First Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="fname"
                onChange={handleInput}
                value={admin.fname}
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
                name="lname"
                onChange={handleInput}
                value={admin.lname}
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
                value={admin.email}
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
                name="phoneNo"
                onChange={handleInput}
                value={admin.phoneNo}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="gender" className="form-label">
                <b>Gender</b>
              </label>
              <select
                id="gender"
                name="gender"
                value={admin.gender} // Binds state value
                onChange={handleInput}
                className="form-control"
                required // Ensures selection is required before form submission
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHERS">Other</option>
              </select>
            </div>


            {/* <div className="col-md-6 mb-3">
              <label htmlFor="quantity" className="form-label">
                <b>Age</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="age"
                name="age"
                onChange={handleInput}
                value={admin.age}
              />
            </div> */}

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
                value={admin.password}
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
                value={admin.address}
              />
            </div>

           
            <div className="d-flex align-items-center justify-content-center">
              <button
                type="submit"
                className="btn btn-primary bg-color custom-bg-text col-md-4"
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
