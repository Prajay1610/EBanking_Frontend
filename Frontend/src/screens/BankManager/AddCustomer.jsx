import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";

const AddCustomer = () => {
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  const navigate = useNavigate();

  // State for customer data
  const [customer, setCustomer] = useState({
    password: "",
    email: "",
    fname: "",
    lname: "",
    role: "CUSTOMER", // Default role
    isActive: true,
    gender: "", // MALE, FEMALE, OTHER
    phoneNo: "",
    address: "",
    profileImage: "", // This will store the image URL after upload
  });

  const [file, setFile] = useState(null); // File object for profile image

  // Handle input changes
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Upload profile image to the backend
  const uploadProfileImage = async (userId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const url = `http://localhost:8080/api/users/${userId}/upload-profile-image`;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${admin_jwtToken}`,
        },
      });

      if (response.data.success) {
        return response.data.profileImageUrl; // Return the image URL from the backend
      } else {
        throw new Error(response.data.message || "Failed to upload profile image.");
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      throw error;
    }
  };

  // Save customer details
  const saveCustomer = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Register the customer
      const registerResponse = await axios.post(
        "http://localhost:8080/api/bank/register",
        customer,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin_jwtToken}`,
          },
        }
      );

      const { success, message, userId } = registerResponse.data;

      if (success) {
        toast.success(message, {
          position: "top-center",
          autoClose: 2000,
        });

        // Step 2: Upload profile image if a file is selected
        if (file) {
          const profileImageUrl = await uploadProfileImage(userId, file);

          // Update the customer object with the profile image URL
          setCustomer((prevCustomer) => ({
            ...prevCustomer,
            profileImage: profileImageUrl,
          }));

          // Optionally, send another request to update the profile image URL in the backend
          await axios.put(
            `http://localhost:8080/api/users/${userId}`,
            { profileImage: profileImageUrl },
            {
              headers: {
                Authorization: `Bearer ${admin_jwtToken}`,
              },
            }
          );
        }

        // Redirect to the customers list or dashboard
        setTimeout(() => {
          navigate("/customers");
        }, 2000);
      } else {
        toast.error(message || "Failed to register customer.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error registering customer:", error);
      toast.error("It seems the server is down.", {
        position: "top-center",
        autoClose: 2000,
      });
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
          <div className="card-body text-color" style={{ backgroundColor: "#d6d0f2" }}>
            <form className="row g-3">
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
                  required
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
                  value={customer.email}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="phoneNo" className="form-label">
                  <b>Phone No</b>
                </label>
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  className="form-control"
                  id="phoneNo"
                  name="phoneNo"
                  onChange={handleInput}
                  value={customer.phoneNo}
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
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
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
                  required
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
                  required
                />
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
                  onClick={saveCustomer}
                  style={{
                    backgroundColor: "#534891",
                    color: "white",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  Add Customer
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

export default AddCustomer;