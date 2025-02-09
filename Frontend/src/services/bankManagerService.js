import axios from "axios";
import { createUrl } from "../utils";
import { toast } from "react-toastify";

export const getAllBankAccounts = async (managerId) => {
    const url = createUrl(`bankAccount/all/${managerId}`);
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    try {
        const response = await axios.get(url,{headers});
        return response.data;
    } catch (error) {
        toast.error("Error while retrieving bank accounts:", error);
        throw error; // Re-throw the error for further handling if needed
    }
};


export const getBankAccountDetails = async (accountId) => {
    const url = createUrl(`bankAccount/${accountId}`);
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    try {
        const response = await axios.get(url,{headers});

        return response.data;
    } catch (error) {
        toast.error("Error while retrieving bank account details:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}

export const depositFunds=async(reqbody)=>{
    const url = createUrl(`transaction/deposit`);
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    try {
        const response = await axios.post(url,reqbody,{headers});
        return response.data;
    } catch (error) {
        
        throw error; 
        
    }
}
export const withdrawFunds=async(reqbody)=>{
    const url = createUrl(`transaction/withdraw`);
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    try {
        const response = await axios.post(url,reqbody,{headers});
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}


export const viewAllBankCustomers=async(bankManagerId)=>{
    const url = createUrl(`bank/allCustomers/${bankManagerId}`);
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    try {
        const response = await axios.get(url,{headers});
        return response.data;
    } catch (error) {
        throw error; 
    }
}
export const makeInActive=async(userId)=>{
    
    const url = createUrl(`bank/customer/makeInActive/${userId}`);
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    try {
        const response = await axios.put(url,{},{headers});
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}

export const makeActive=async(userId)=>{
    
    const url = createUrl(`bank/customer/makeActive/${userId}`);
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    try {
        const response = await axios.put(url,{},{headers});
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}


export const lockAccount=async(accountId)=>{
    
    const url = createUrl(`bankAccount/lockAccount/${accountId}`);
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    try {
        const response = await axios.put(url,{},{headers});
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}


export const unlockAccount=async(accountId)=>{
    
    const url = createUrl(`bankAccount/unlockAccount/${accountId}`);
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    try {
        const response = await axios.put(url,{},{headers});
        return response.data;
    } catch (error) {
        throw error; // Re-throw the error for further handling if needed
    }
}
export const getAllBankTransactions = async (managerId) => {
    try { 
        const headers = {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        const url = createUrl(`bank/transactions/allCustomer/${managerId}`);
       
        const response = await axios.get(url,{headers});
        return response.data;
    } catch (error) {
        throw error;
    }
};