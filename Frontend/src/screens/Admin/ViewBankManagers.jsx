import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import { getAllBankManagers, toggleManagerStatus } from "../../services/adminService"; // Import the service function
import { toast } from "react-toastify";

const ViewBankManagers = () => {
  const location = useLocation();
  const customer = location.state;
  const navigate = useNavigate();

  // State to manage bank managers and loading state
  const [allManagers, setAllManagers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for UI feedback

  // Retrieve JWT token from session storage
  // let adminToken = sessionStorage.getItem("admin-jwtToken");
  // let bankToken = sessionStorage.getItem("bank-jwtToken");
  // let customerToken = sessionStorage.getItem("customer-jwtToken");

  // let jwtToken;
  // if (adminToken) {
  //   jwtToken = adminToken;
  // } else if (bankToken) {
  //   jwtToken = bankToken;
  // } else if (customerToken) {
  //   jwtToken = customerToken;
  // }

  // Function to fetch all bank managers from the backend
  const fetchAllManagers = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const response = await getAllBankManagers(); // Pass the JWT token if required by the API
      if (response) {
        console.log("Bank managers:", response.bankManagers);
        setAllManagers(response); // Update state with the retrieved data
      }
    } catch (error) {
      console.error("Error fetching bank managers:", error);
      alert("Failed to load bank managers. Please try again later.");
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleManagerStatusToggle = async (managerId) => {
    try {
      const response = await toggleManagerStatus(managerId);
      if (response) {
       toast.success("BankManager Status Changed Successfully");
        fetchAllManagers();
      }
    } catch (error) {
      console.error("Error making bank manager InActive:", error);
      alert("Failed to make bank manager InActive. Please try again later.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllManagers();
  }, []);

  // Function to format epoch time to a readable date
  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    return date.toLocaleString(); // Adjust the format as needed
  };

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "white", minHeight: "100vh", padding: "20px" }}>
        <div className="mt-2">
          <div
            className="card form-card ms-5 me-5 mb-5 border-color"
            style={{
              height: "45rem",
              backgroundColor: "white",
              border: "1px solid rgb(78, 63, 192)",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="card-header text-center"
              style={{
                backgroundColor: "#544892",
                color: "white",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                padding: "15px",
              }}
            >
              <h2>Bank Managers</h2>
            </div>
            <div
              className="card-body"
              style={{
                overflowY: "auto",
              }}
            >
              {loading ? (
                <div className="text-center mt-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive mt-3">
                  <table
                    className="table table-hover text-center"
                    style={{
                      backgroundColor: "white",
                      color: "#493D9E",
                    }}
                  >
                    <thead
                      className="table-bordered"
                      style={{
                        backgroundColor: "#544892",
                        color: "white",
                      }}
                    >
                      <tr>
                        <th scope="col">Manager Name</th>
                        <th scope="col">Bank Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allManagers.length > 0 ? (
                        allManagers.map((manager, index) => (
                          <tr
                            key={index}
                            style={{
                              borderBottom: "1px solid rgb(147, 130, 242)",
                            }}
                          >
                            <td>
                              <b>{manager.bankManagerName}</b>
                            </td>
                            <td>
                              <b>{manager.bankName || "N/A"}</b>
                            </td>
                            <td>
                              <b>{manager.email}</b>
                            </td>
                            <td>
                              <b>{manager.gender}</b>
                            </td>
                            <td>
                              <b>{manager.contactNo}</b>
                            </td>
                            <td>
                              <b>{manager.address}</b>
                            </td>
                            <td>{manager.isActive==true?(<b className="text-success">Active</b>):(<b className="text-danger">InActive</b>)}</td>
                            <td>
                      {manager.isActive === true ? (
                          <button
                            className="btn btn-sm btn-danger mx-2"                        
                            onClick={()=>handleManagerStatusToggle(manager.managerId)}
                          >
                           Deactivate Manager
                          </button>
                        ) : (
                          <button 
                          className="btn btn-sm btn-success"   
                          onClick={()=>handleManagerStatusToggle(manager.managerId)}
                        >
                         Activate Manager
                        </button>
                        )}
                      </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No bank managers found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewBankManagers;