import { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import { getAllBanks } from "../../services/adminService";
import { toast } from "react-toastify";
const ViewAllBanks = () => {
  const [allBanks, setAllBanks] = useState([]);
  // Function to retrieve all transactions for the customer
  const retrieveAllBanks = async () => {
    // Sample data for transactions
    const sampleBanks = await getAllBanks();
    if (sampleBanks) {
      return sampleBanks;
    } else {
      toast.error("Error occured while fetching banks");
    }
  };

  useEffect(() => {
    const getAllBanks = async () => {
      const fetchedBanks = await retrieveAllBanks();
      if (fetchedBanks) {
        setAllBanks(fetchedBanks);
      }
    };

    getAllBanks();
  }, []);

  // Function to format epoch time to a readable date
  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: "white",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <div className="mt-2">
          <div
            className="card form-card ms-5 me-5 mb-5 border-color"
            style={{
              height: "45rem",
              backgroundColor: "white",
              border: "1px solidrgb(78, 63, 192)",
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
              <h3>All Banks</h3>
            </div>
            <div
              className="card-body"
              style={{
                overflowY: "auto",
              }}
            >
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
                      <th scope="col">Bank Name</th>
                      <th scope="col">IFSC</th>
                      <th scope="col">Address</th>
                      <th scope="col">Phone No</th>
                      <th scope="col">Email</th>
                      <th scope="col">Website</th>
                      <th scope="col">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBanks.map((bank) => {
                      return (
                        <tr
                          //    key={manager.managerId}
                          style={{
                            borderBottom: "1px solidrgb(147, 130, 242)",
                          }}
                        >
                          <td>
                            <b>{bank.bankName}</b>
                          </td>
                          <td>
                            <b>{bank.bankIfsc}</b>
                          </td>
                          <td>
                            <b>{bank.address}</b>
                          </td>
                          <td>
                            <b>{bank.phoneNo}</b>
                          </td>
                          <td>
                            <b>{bank.email}</b>
                          </td>

                          <td>
                            <b>{bank.website}</b>
                          </td>
                          <td>
                            <b>{bank.country}</b>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewAllBanks;
