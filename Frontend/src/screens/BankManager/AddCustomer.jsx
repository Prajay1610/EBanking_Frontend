import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import { addCustomer, addImage } from "../../services/customerService";

const AddCustomer = () => {
  const bankId = localStorage.getItem("bankId") || 1;

  const [customer, setCustomer] = useState({
    fname: "",
    lname: "",
    email: "",
    phoneNo: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
    accountType: "",
    role: "CUSTOMER",
    bankId: bankId,
  });
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  // Handle form input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Validate all the required inputs
  const validateInputs = () => {
    if (!customer.fname.trim()) {
      toast.error("First Name is required!");
      return false;
    }
    if (!customer.lname.trim()) {
      toast.error("Last Name is required!");
      return false;
    }
    if (!customer.email.trim()) {
      toast.error("Email is required!");
      return false;
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(customer.email)
    ) {
      toast.error("Please enter a valid email address!");
      return false;
    }
    if (!customer.phoneNo.trim()) {
      toast.error("Phone number is required!");
      return false;
    }
    if (!/^\d{10}$/.test(customer.phoneNo)) {
      toast.error("Phone number must be 10 digits!");
      return false;
    }

    if (!customer.gender) {
      toast.error("Please select a gender!");
      return false;
    }
    if (!customer.address.trim()) {
      toast.error("Address is required!");
      return false;
    }

    if (!customer.password) {
      toast.error("Password is required!");
      return false;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        customer.password
      )
    ) {
      toast.error(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character."
      );
      return false;
    }

    if (!customer.confirmPassword) {
      toast.error("Conform password is required!");
      return false;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        customer.confirmPassword
      )
    ) {
      toast.error(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character."
      );
      return false;
    }
    if (customer.password !== customer.confirmPassword) {
      toast.error("Password and Confirm Password do not match.");
      return;
    }

    if (!customer.accountType.trim()) {
      toast.error("Account Type is required!");
      return false;
    }

    return true;
  };

  const saveCustomer = async (e) => {
    e.preventDefault();
    // Validate inputs before proceeding
    if (!validateInputs()) {
      return; // Stop form submission if validation fails
    }

    try {
      const response = await addCustomer(customer);
      console.log(response);
      const userId = response.id; // Assuming the backend returns the user ID

      if (profileImage) {
        await addImage(userId, profileImage);
        toast.success("Customer added successfully with profile image!");
      } else {
        toast.success("Customer added successfully!");
      }

      navigate("/ViewAllBankCustomers");
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error("Failed to add customer. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center min-vh-100 mt-2 mb-2">
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
            <h5 className="card-title">Add Customer</h5>
          </div>
          <div
            className="card-body text-color"
            style={{ backgroundColor: "#d6d0f2" }}
          >
            <form className="row g-3" onSubmit={saveCustomer}>
              {/* Form fields */}
              <div className="col-md-6 mb-3">
                <label htmlFor="fname" className="form-label">
                  <b>First Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fname"
                  name="fname"
                  onChange={handleInput}
                  value={customer.fname}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lname" className="form-label">
                  <b>Last Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lname"
                  name="lname"
                  onChange={handleInput}
                  value={customer.lname}
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
                  value={customer.email}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="phoneNo" className="form-label">
                  <b>Phone No</b>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  onChange={handleInput}
                  value={customer.phoneNo}
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
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHERS">Others</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="address" className="form-label">
                  <b>Address</b>
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  rows="1"
                  onChange={handleInput}
                  value={customer.address}
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
                <label htmlFor="confirmPassword" className="form-label">
                  <b>Confirm Password</b>
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleInput}
                  value={customer.confirmPassword}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="accountType" className="form-label">
                  <b>Account Type</b>
                </label>
                <select
                  name="accountType"
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Account Type</option>
                  <option value="SAVINGS">Savings</option>
                  <option value="CURRENT">Current</option>
                </select>
              </div>
              {/* Profile Image Upload Field */}
              <div className="col-md-6 mb-3">
                <label htmlFor="profileImage" className="form-label">
                  <b>Profile Image</b>
                </label>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="form-control"
                  onChange={handleFileChange}
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
                  Add Customer
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

export default AddCustomer;
