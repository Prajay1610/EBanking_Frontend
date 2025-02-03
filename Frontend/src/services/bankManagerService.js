import axios from "axios";
import { createUrl } from "../utils";
import { toast } from "react-toastify";

export const getAllBankAccounts = async (managerId) => {
    const url = createUrl(`bankAccount/all/${managerId}`);
    try {
        const response = await axios.get(url);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        toast.error("Error while retrieving bank accounts:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};


export const getBankAccountDetails = async (accountId) => {
    const url = createUrl(`bankAccount/${accountId}`);
    try {
        const response = await axios.get(url);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        toast.error("Error while retrieving bank account details:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}

export const depositFunds=async(reqbody)=>{
    const url = createUrl(`transaction/deposit`);
    try {
        const response = await axios.post(url,reqbody);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        throw error; 
    }
}
export const withdrawFunds=async(reqbody)=>{
    const url = createUrl(`transaction/withdraw`);
    try {
        const response = await axios.post(url,reqbody);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}


export const viewAllBankCustomers=async(bankManagerId)=>{
    const url = createUrl(`bank/allCustomers/${bankManagerId}`);
    try {
        const response = await axios.get(url);
        console.log("response", response.data);
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}