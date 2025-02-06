import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import {
  addNewBank,
  getAllBankManagers,
  getAllBankManagersFromUser,
} from "../../services/adminService";

const AddBankForm = () => {
  const [bankUsers, setBankUsers] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  const [managers, setBankManagers] = useState([]);

  const [bank, setBank] = useState({
    bankName: "",
    phone: "",
    address: "",
    bankIfsc: "",
    bankEmail: "",
    bankWebsite: "",
    bankCountry: "India",
    bankManagerId: "",
  });

  useEffect(() => {
    const fetchBankManagers = async () => {
      const managers = await getAllBankManagersFromUser();
      setBankManagers(managers);
    };
    fetchBankManagers();

    console.log("Bank Managers: ", managers);
  }, []);

  const handleInput = (e) => {
    setBank({ ...bank, [e.target.name]: e.target.value });
  };

  // Validate inputs
  const validateInputs = () => {
    if (!bank.bankName.trim()) {
      toast.error("Bank Name is required!");
      return false;
    }
    if (!bank.bankIfsc.trim()) {
      toast.error("IFSC Code is required!");
      return false;
    }

    if (!/^[A-Z]{4}[0-9A-Za-z]{7}$/.test(bank.bankIfsc.trim())) {
      toast.error(
        "Invalid IFSC Code! It must be 11 characters long, starting with 4 uppercase letters followed by 7 alphanumeric characters."
      );
      return false;
    }

    if (!bank.bankManagerId.trim()) {
      toast.error("Please select bank manager !");
      return false;
    }

    if (!bank.bankWebsite.trim()) {
      toast.error("Website is required!");
      return false;
    }
    if (!/^www\.[a-zA-Z0-9-]+\.com$/.test(bank.bankWebsite)) {
      toast.error("Website must be in the format 'www.test.com'!");
      return false;
    }

    if (!bank.address.trim()) {
      toast.error("Address is required!");
      return false;
    }

    if (!bank.bankEmail.trim()) {
      toast.error("Email is required!");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/.test(bank.bankEmail)) {
      toast.error("Please enter a valid email address!");
      return false;
    }
    if (!bank.phone.trim()) {
      toast.error("Phone number is required!");
      return false;
    }
    if (!/^\d{10}$/.test(bank.phone)) {
      toast.error("Phone number must be 10 digits!");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate inputs before proceeding
    if (!validateInputs()) {
      return; // Stop form submission if validation fails
    }
    const result = await addNewBank(bank);
    try {
      if (result) {
        toast.success("Bank added successfully");
        setBank({
          bankName: "",
          phone: "",
          address: "",
          bankIfsc: "",
          bankEmail: "",
          bankWebsite: "",
          bankCountry: "India",
          bankManagerId: "",
        });
        navigate("/addBank");
      } else {
        toast.error("Error occured while adding bank");
      }
    } catch (error) {
      toast.error("An unexpected error occured!");
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
            className="card-header  custom-bg-text text-center"
            style={{
              backgroundColor: "#534891",
              color: "white",
              padding: "10px",
              textAlign: "center",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <h5 className="card-title">Add Bank</h5>
          </div>
          <div
            className="card-body text-color"
            style={{ backgroundColor: "#d6d0f2" }}
          >
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  <b>Bank Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="bankName"
                  onChange={handleInput}
                  value={bank.bankName}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="code" className="form-label">
                  <b>IFSC Code</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="code"
                  name="bankIfsc"
                  onChange={handleInput}
                  value={bank.bankIfsc}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  <b>Bank Manager</b>
                </label>
                <select
                  name="bankManagerId"
                  onChange={handleInput}
                  className="form-control"
                >
                  <option value="">Select Bank Manager</option>
                  {managers.map((manager) => {
                    return (
                      <option key={manager.id} value={manager.id}>
                        {manager.fname + " " + manager.lname}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="website" className="form-label">
                  <b>Website</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  name="bankWebsite"
                  onChange={handleInput}
                  value={bank.bankWebsite}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="address" className="form-label">
                  <b>Bank Address</b>
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  rows="3"
                  onChange={handleInput}
                  value={bank.address}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="quantity" className="form-label">
                  <b>Bank Email</b>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="bankEmail"
                  onChange={handleInput}
                  value={bank.bankEmail}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  <b>Phone Number</b>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNumber"
                  name="phone"
                  onChange={handleInput}
                  value={bank.phone}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="country" className="form-label">
                  <b>Country</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  onChange={handleInput}
                  value={bank.bankCountry}
                  disabled={true}
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
                  Register Bank
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

export default AddBankForm;
