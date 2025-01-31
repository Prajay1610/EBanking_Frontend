import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
const ViewAllBankCustomers = () => {
  let navigate = useNavigate();
  const [allCustomer, setAllCustomer] = useState([]);
  const [customerName, setCustomerNumber] = useState("");
  const [tempCustomerName, setTempCustomerName] = useState("");

  // Mock data for testing
  const mockCustomers = [
    {
      id: 1,
      name: "John Doe",
      bank: { name: "Global Bank" },
      email: "john.doe@example.com",
      gender: "Male",
      contact: "1234567890",
      street: "123 Main St",
      city: "New York",
      pincode: "10001",
      isAccountLinked: "Yes",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      bank: { name: "National Bank" },
      email: "jane.smith@example.com",
      gender: "Female",
      contact: "9876543210",
      street: "456 Elm St",
      city: "Los Angeles",
      pincode: "90001",
      isAccountLinked: "No",
      status: "Deactivated",
    },
    {
      id: 3,
      name: "Alice Johnson",
      bank: { name: "City Bank" },
      email: "alice.johnson@example.com",
      gender: "Female",
      contact: "5678901234",
      street: "789 Oak St",
      city: "Chicago",
      pincode: "60601",
      isAccountLinked: "Yes",
      status: "Active",
    },
  ];

  // Simulate fetching data from the backend
  useEffect(() => {
    setAllCustomer(mockCustomers); // Use mock data for testing
  }, []);

  const searchBankCustomersByName = (e) => {
    e.preventDefault();
    setCustomerNumber(tempCustomerName);
    // Filter mock data based on customer name
    const filteredCustomers = mockCustomers.filter((customer) =>
      customer.name.toLowerCase().includes(tempCustomerName.toLowerCase())
    );
    setAllCustomer(filteredCustomers);
  };

  const viewAccountDetails = (customer) => {
    navigate("/customer/bank/account/detail", { state: customer });
  };

  const activateUser = (userId) => {
    toast.success("User activated successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const deactivateUser = (userId) => {
    toast.error("User deactivated successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
    <Header/>
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="mt-2">
        <div
          className="card form-card ms-5 me-5 mb-5"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #544892",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="card-header text-center"
            style={{
              backgroundColor: "#544892",
              color: "#ffffff",
              borderBottom: "1px solid #544892",
              borderRadius: "10px 10px 0 0",
            }}
          >
            <h2>All Bank Customers</h2>
          </div>
          <div
            className="card-body"
            style={{
              overflowY: "auto",
            }}
          >
            <div className="row mb-3">
              <div className="col">
                <form className="row g-3 align-items-center">
                  <div className="col-auto">
                    <label>
                      <b>Customer Name</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter customer name..."
                      onChange={(e) => setTempCustomerName(e.target.value)}
                      value={tempCustomerName}
                      required
                      style={{ border: "1px solid #544892" }}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ backgroundColor: "#544892", border: "none" }}
                      onClick={searchBankCustomersByName}
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="table-responsive mt-2">
              <table className="table table-hover text-center">
                <thead
                  className="table-bordered"
                  style={{ backgroundColor: "#544892", color: "#ffffff" }}
                >
                  <tr>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Bank Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Street</th>
                    <th scope="col">City</th>
                    <th scope="col">Pincode</th>
                    <th scope="col">Account Details</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allCustomer.map((customer) => (
                    <tr key={customer.id} style={{ backgroundColor: "#f8f9fa" }}>
                      <td>
                        <b>{customer.name}</b>
                      </td>
                      <td>
                        <b>{customer.bank.name}</b>
                      </td>
                      <td>
                        <b>{customer.email}</b>
                      </td>
                      <td>
                        <b>{customer.gender}</b>
                      </td>
                      <td>
                        <b>{customer.contact}</b>
                      </td>
                      <td>
                        <b>{customer.street}</b>
                      </td>
                      <td>
                        <b>{customer.city}</b>
                      </td>
                      <td>
                        <b>{customer.pincode}</b>
                      </td>
                      <td>
                        {customer.isAccountLinked === "Yes" ? (
                          <button
                            onClick={() => viewAccountDetails(customer)}
                            className="btn btn-sm btn-primary"
                            style={{ backgroundColor: "#544892", border: "none" }}
                          >
                            View Account
                          </button>
                        ) : (
                          <b className="text-danger">NOT LINKED</b>
                        )}
                      </td>
                      <td>
                        <b>{customer.status}</b>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
<Footer/>
    </>
    
  );
};

export default ViewAllBankCustomers;