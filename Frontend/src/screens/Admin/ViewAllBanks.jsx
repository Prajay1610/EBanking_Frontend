import { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
const ViewAllBanks = () => {
  const location = useLocation();
  const customer = location.state;

  let navigate = useNavigate();
  const [allBanks, setAllBanks] = useState([]);
  const bank = JSON.parse(sessionStorage.getItem("active-bank"));

  let jwtToken;

  let adminToken = sessionStorage.getItem("admin-jwtToken");
  let bankToken = sessionStorage.getItem("bank-jwtToken");
  let customerToken = sessionStorage.getItem("customer-jwtToken");

  if (adminToken) {
    jwtToken = adminToken;
  } else if (bankToken) {
    jwtToken = bankToken;
  } else if (customerToken) {
    jwtToken = customerToken;
  }

  // Function to retrieve all transactions for the customer
  const retrieveAllBanks = async () => {
    // Sample data for transactions
    const sampleBanks = {
        banks: [
          {
            bankId: "BANK001",
            name: "State Bank of India",
            ifsc: "SBIN0001234",
            address: "Nariman Point, Mumbai, Maharashtra, India",
            phone: "+91 22 2202 1234",
            email: "contact@sbi.co.in",
            website: "https://www.sbi.co.in",
            country: "India"
          },
          {
            bankId: "BANK002",
            name: "HDFC Bank",
            ifsc: "HDFC0005678",
            address: "Kamala Mills, Lower Parel, Mumbai, Maharashtra, India",
            phone: "+91 22 6160 6161",
            email: "support@hdfcbank.com",
            website: "https://www.hdfcbank.com",
            country: "India"
          },
          {
            bankId: "BANK003",
            name: "ICICI Bank",
            ifsc: "ICIC0007890",
            address: "Bandra Kurla Complex, Mumbai, Maharashtra, India",
            phone: "+91 22 3366 7777",
            email: "customercare@icicibank.com",
            website: "https://www.icicibank.com",
            country: "India"
          },
          {
            bankId: "BANK004",
            name: "Punjab National Bank",
            ifsc: "PUNB0012345",
            address: "Dwarka, New Delhi, India",
            phone: "+91 11 2371 7777",
            email: "help@pnb.co.in",
            website: "https://www.pnbindia.in",
            country: "India"
          },
          {
            bankId: "BANK005",
            name: "Axis Bank",
            ifsc: "UTIB0004321",
            address: "Worli, Mumbai, Maharashtra, India",
            phone: "+91 22 2425 2525",
            email: "customer.service@axisbank.com",
            website: "https://www.axisbank.com",
            country: "India"
          }
        ]
      };
      
      

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return sampleBanks;
  };

  useEffect(() => {
    const getAllBanks = async () => {
      const fetchedBanks = await retrieveAllBanks();
      if (fetchedBanks) {
        setAllBanks(fetchedBanks.banks);
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
     <div style={{ backgroundColor: "white", minHeight: "100vh", padding: "20px" }}>
 
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
                     <b>{bank.name}</b>
                   </td>
                   <td>
                     <b>{bank.ifsc}</b>
                   </td>
                   <td>
                     <b>{bank.address}</b>
                   </td>
                   <td>
                     <b>{bank.phone}</b>
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
     <Footer/>
    </>
   
  );
};

export default ViewAllBanks;