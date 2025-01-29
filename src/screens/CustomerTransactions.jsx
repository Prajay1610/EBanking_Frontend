import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../components/layouts/Header/Header";
import Footer from "../components/layouts/Footer/Footer";
const ViewCustomerTransactions = () => {
  const location = useLocation();
  const customer = location.state;

  let navigate = useNavigate();
  const [allTransactions, setAllTransactions] = useState([]);
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
    const sampleTransactions = {
      bankTransactions: [
        {
          transactionId: "123456",
          bank: { name: "Sample Bank 1" },
          user: { name: "John Doe" },
          bankAccount: { number: "1234567890" },
          type: "Account Transfer",
          amount: 1000,
          destinationBankAccount: {
            bank: { name: "Sample Bank 2" },
            number: "0987654321",
          },
          narration: "Sample Transfer",
          transactionTime: "1633072800000", // Epoch time
        },
        {
          transactionId: "654321",
          bank: { name: "Sample Bank 1" },
          user: { name: "John Doe" },
          bankAccount: { number: "1234567890" },
          type: "Withdrawal",
          amount: 500,
          destinationBankAccount: null,
          narration: "Sample Withdrawal",
          transactionTime: "1633076400000", // Epoch time
        },
      ],
    };

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return sampleTransactions;
  };

  useEffect(() => {
    const getAllTransactions = async () => {
      const transactions = await retrieveAllTransactions();
      if (transactions) {
        setAllTransactions(transactions.bankTransactions);
      }
    };

    getAllTransactions();
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
       <h2>Customer Transactions</h2>
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
               <th scope="col">Transaction Id</th>
               <th scope="col">Source Bank</th>
               <th scope="col">Customer Name</th>
               <th scope="col">Source Account</th>
               <th scope="col">Transaction Type</th>
               <th scope="col">Amount</th>
               <th scope="col">Recipient Bank</th>
               <th scope="col">Recipient Account</th>
               <th scope="col">Narration</th>
               <th scope="col">Transaction Time</th>
             </tr>
           </thead>
           <tbody>
             {allTransactions.map((transaction) => {
               return (
                 <tr
                   key={transaction.transactionId}
                   style={{
                     borderBottom: "1px solidrgb(147, 130, 242)",
                   }}
                 >
                   <td>
                     <b>{transaction.transactionId}</b>
                   </td>
                   <td>
                     <b>{transaction.bank.name}</b>
                   </td>
                   <td>
                     <b>{transaction.user.name}</b>
                   </td>
                   <td>
                     <b>{transaction.bankAccount.number}</b>
                   </td>
                   <td>
                     <b>{transaction.type}</b>
                   </td>
                   <td>
                     <b>{transaction.amount}</b>
                   </td>
                   <td>
                     {(() => {
                       if (transaction.type === "Account Transfer") {
                         return (
                           <b>
                             {transaction.destinationBankAccount.bank.name}
                           </b>
                         );
                       } else {
                         return <b>---</b>;
                       }
                     })()}
                   </td>
                   <td>
                     {(() => {
                       if (transaction.type === "Account Transfer") {
                         return (
                           <b>
                             {transaction.destinationBankAccount.number}
                           </b>
                         );
                       } else {
                         return <b>---</b>;
                       }
                     })()}
                   </td>
                   <td>
                     <b>{transaction.narration}</b>
                   </td>
                   <td>
                     <b>
                       {formatDateFromEpoch(transaction.transactionTime)}
                     </b>
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

export default ViewCustomerTransactions;