import { createUrl } from "../utils";
import axios from "axios";


export const getAllTransactions = async (customerId) => {
    try { 
        const url = createUrl(`customer/transactions/customer/${customerId}`);
        const headers = {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
        console.log("called url",url)
        const response = await axios.get(url,{headers});
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};

export const addCustomer = async (customer) => {
    try {
        const url = createUrl('api/auth/register');
        const headers = {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
        const response = await axios.post(url, customer,{headers});
        return response.data;
    } catch (error) {
        console.error('Error adding customer:', error);
        throw error;
    }
}

export const getAllSpecificAccountTransactions = async (accountId) => {
  try {
      const url = createUrl(`customer/transactions/${accountId}`);
      const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
      const response = await axios.get(url,{headers});
      return response.data;
  } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
  }
};

export const addImage = async (userId, file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const url = createUrl(`api/auth/${userId}/upload-profile-image`);
      const headers = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
      const response = await axios.post(url, formData, headers);
  
      // Ensure the backend response contains a `success` field
      if (!response.data) {
        throw new Error(response.data.message || "Image upload failed.");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };


  
  export const transferMoney=async(reqbody)=>{
    try {
        const url = createUrl('transfer');
        const headers = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
        const response =await axios.post(url,reqbody,{headers});
        return response.data;
    } catch (error) {
        console.error('Error transferring money:', error);
        throw error;
    }
  }

  

  export const getCustomerData=async(customerId)=>{

    try {
      const url = createUrl(`customer/${customerId}`);
      const headers = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
      const response =await axios.get(url,{headers});
      

      return response.data;
  } catch (error) {
      console.error('Error while feching customer', error);
      throw error;
  }
  }


  export const getCustomerAccountData=async(customerId)=>{

    try {
      const url = createUrl(`customer/allAccounts/${customerId}`);
      const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
      const response =await axios.get(url,{headers});
      console.log(response)

      return response.data;
  } catch (error) {
      console.error('Error while feching customer Accounts', error);
      throw error;
  }
  }



  export const getAccountStatement = async (reqbody) => {
    try {
        // Fetch all transactions for the given account ID
        const allTransactions = await getAllSpecificAccountTransactions(reqbody.accountId);

        // Convert date string (YYYY-MM-DD) to timestamp (start of the day)
        const convertToTimestamp = (dateStr) => new Date(dateStr).setHours(0, 0, 0, 0);

        console.log("Fetched transactions:", allTransactions);

        // Calculate start and end timestamps for filtering
        const startDateTimestamp = convertToTimestamp(reqbody.startDate);
        const endDateTimestamp = convertToTimestamp(reqbody.endDate) + 86400000 - 1; // End of the day

        // Filter transactions within the date range
        const filteredTransactions = allTransactions.filter(transaction => {
            const transactionDate = new Date(Number(transaction.transactionTime)).setHours(0, 0, 0, 0);
            return transactionDate >= startDateTimestamp && transactionDate <= endDateTimestamp;
        });

        // Transform the filtered transactions into the required format
        const transformedTransactions = filteredTransactions.map(transaction => {
            return {
                transactionId: transaction.transactionId,
                type: transaction.type , // Normalize type
                amount: transaction.amount,
                transactionTime: transaction.transactionTime,
            };
        });

        // Return the final response in the required format
        return transformedTransactions;
    } catch (error) {
        console.error("Error fetching account statement:", error);
        return {
            transactions: []
        };
    }

};



