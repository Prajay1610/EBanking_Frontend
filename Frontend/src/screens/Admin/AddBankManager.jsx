import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import { addNewBankManager, addNewUser } from "../../services/adminService"; // Import the service function

const AddBankManager = () => {
  // State to manage form inputs
  const [bank, setBank] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    address: "",
  });

  // Function to handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setBank((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const saveBank = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate required fields
    if (
      !bank.firstName ||
      !bank.lastName ||
      !bank.email ||
      !bank.phone ||
      !bank.gender ||
      !bank.password ||
      !bank.address
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Prepare request body
    const reqBody = {
      fname: bank.firstName,
      lname: bank.lastName,
      email: bank.email,
      phoneNo: bank.phone,
      gender: bank.gender,
      password: bank.password,
      address: bank.address,
      role: "BANKMANAGER",
      isActive: true,
    };

    try {
      // Call the service function to add a new bank manager
      await addNewUser(reqBody);

      // Show success message
      toast.success("Bank Manager added successfully!");

      // Clear the form fields by resetting the state
      setBank({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        password: "",
        address: "",
      });
    } catch (error) {
      // Handle errors (already handled in the service function)
      console.error("Error while adding bank manager:", error);
    }
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
            className="card-header custom-bg-text text-center"
            style={{
              backgroundColor: "#534891",
              color: "white",
              padding: "10px",
              textAlign: "center",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <h5 className="card-title">Add Bank Manager</h5>
          </div>
          <div className="card-body text-color" style={{ backgroundColor: "#d6d0f2" }}>
            <form className="row g-3" onSubmit={saveBank}>
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">
                  <b>First Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={handleInput}
                  value={bank.firstName}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={handleInput}
                  value={bank.lastName}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">
                  <b>Email</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleInput}
                  value={bank.email}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">
                  <b>Phone No</b>
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  className="form-control"
                  id="phone"
                  name="phone"
                  onChange={handleInput}
                  value={bank.phone}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="gender" className="form-label">
                  <b>Gender</b>
                </label>
                <select
                  name="gender"
                  onChange={handleInput}
                  className="form-control"
                  value={bank.gender}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
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
                  value={bank.password}
                  required
                />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="address" className="form-label">
                  <b>Address</b>
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  rows="3"
                  onChange={handleInput}
                  value={bank.address}
                  required
                />
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary bg-color custom-bg-text col-md-4"
                  style={{
                    backgroundColor: "#534891",
                    color: "white",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  Register Bank Manager
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

export default AddBankManager;