import { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
const ViewBankManagers = () => {
  const location = useLocation();
  const customer = location.state;

  let navigate = useNavigate();
  const [allManagers, setAllManagers] = useState([]);
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
  const retrieveAllTransactions = async () => {
    // Sample data for transactions
    const sampleManagers = {
        bankManagers: [
          {
            managerId: "MGR001",
            name: "Alice Johnson",
            bank: { name: "Global Trust Bank" },
            email: "alice.johnson@globaltrust.com",
            gender: "Female",
            contact: "+1 555-1234",
            address: "1234 Elm Street, Springfield, USA",
          },
          {
            managerId: "MGR002",
            name: "Robert Smith",
            bank: { name: "National Finance Bank" },
            email: "robert.smith@nationalfinance.com",
            gender: "Male",
            contact: "+1 555-5678",
            address: "5678 Oak Avenue, Metropolis, USA",
          },
          {
            managerId: "MGR003",
            name: "Sophia Williams",
            bank: { name: "Unity Bank" },
            email: "sophia.williams@unitybank.com",
            gender: "Female",
            contact: "+1 555-9101",
            address: "9101 Maple Drive, Gotham, USA",
          },
        ],
      };
      

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return sampleManagers;
  };

  useEffect(() => {
    const getAllManagers = async () => {
      const managers = await retrieveAllTransactions();
      if (managers) {
        setAllManagers(managers.bankManagers);
      }
    };

    getAllManagers();
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
       <h2>Bank Managers</h2>
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
               <th scope="col">Manager Name</th>
               <th scope="col">Bank Name</th>
               <th scope="col">Email</th>
               <th scope="col">Gender</th>
               <th scope="col">Contact</th>
              
               <th scope="col">Address</th>
             </tr>
           </thead>
           <tbody>
             {allManagers.map((manager) => {
               return (
                 <tr
                //    key={manager.managerId}
                   style={{
                     borderBottom: "1px solidrgb(147, 130, 242)",
                   }}
                 >
                   <td>
                     <b>{manager.name}</b>
                   </td>
                   <td>
                     <b>{manager.bank.name}</b>
                   </td>
                   <td>
                     <b>{manager.email}</b>
                   </td>
                   <td>
                     <b>{manager.gender}</b>
                   </td>
                   <td>
                     <b>{manager.contact}</b>
                   </td>
                  
                   <td>
                     <b>{manager.address}</b>
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

export default ViewBankManagers;