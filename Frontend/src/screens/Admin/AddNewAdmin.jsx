import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import { addNewUser } from "../../services/adminService";

const AddNewAdmin = () => {
  const navigate = useNavigate();

  // State to manage admin form data
  const [admin, setAdmin] = useState({
    fname: "",
    lname: "",
    email: "",
    phoneNo: "",
    gender: "",
    password: "",
    address: "",
    website: "",
    isActive: true,
    role: "ADMIN",
  });

  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validate inputs
  const validateInputs = () => {
    if (!admin.fname.trim()) {
      toast.error("First Name is required!");
      return false;
    }
    if (!admin.lname.trim()) {
      toast.error("Last Name is required!");
      return false;
    }
    if (!admin.email.trim()) {
      toast.error("Email is required!");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(admin.email)) {
      toast.error("Please enter a valid email address!");
      return false;
    }
    if (!admin.phoneNo.trim()) {
      toast.error("Phone number is required!");
      return false;
    }
    if (!/^\d{10}$/.test(admin.phoneNo)) {
      toast.error("Phone number must be 10 digits!");
      return false;
    }

    if (!admin.gender) {
      toast.error("Please select a gender!");
      return false;
    }

    if (!admin.password) {
      toast.error("Password is required!");
      return false;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        admin.password
      )
    ) {
      toast.error(
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character."
      );
      return false;
    }
    if (!admin.address.trim()) {
      toast.error("Address is required!");
      return false;
    }
    if (!admin.website.trim()) {
      toast.error("Website is required!");
      return false;
    }

    if (!/^www\.[a-zA-Z0-9-]+\.com$/.test(admin.website)) {
      toast.error("Website must be in the format 'www.test.com'!");
      return false;
    }

    return true;
  };

  // Handle form submission
  const saveAdmin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate inputs before proceeding
    if (!validateInputs()) {
      return; // Stop form submission if validation fails
    }

    try {
      // Call the addNewAdmin service to send data to the backend
      const response = await addNewUser(admin);

      if (response) {
        toast.success("Admin added successfully!");
        setAdmin({
          fname: "",
          lname: "",
          email: "",
          phoneNo: "",
          gender: "",
          password: "",
          address: "",
          website: "",
          isActive: true,
          role: "ADMIN",
        });
        navigate("/addNewAdmin"); // Redirect to the admins list page after successful addition
      } else {
        toast.error("Failed to add admin. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
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
            <h5 className="card-title">Add Admin</h5>
          </div>
          <div
            className="card-body text-color"
            style={{ backgroundColor: "#d6d0f2" }}
          >
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
                  type="text"
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
                  value={admin.gender}
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHERS">Other</option>
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

              <div className="col-md-6 mb-3">
                <label htmlFor="website" className="form-label">
                  <b>Website</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  name="website"
                  onChange={handleInput}
                  value={admin.website}
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
                  Add Admin
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

export default AddNewAdmin;
