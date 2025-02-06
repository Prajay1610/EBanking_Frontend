import axios from "axios";
import { createUrl } from "../utils";
import { toast } from 'react-toastify';

export const addNewBank = async(reqbody)=>{
    const url = createUrl('bank/add');
    console.log("reqbody"+JSON.stringify(reqbody));
    const headers = {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
    try {
        const response = await axios.post(url,reqbody,{headers});
        console.log("resp data"+JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        toast.error('Error occured while adding new bank');
    }
}


export const getAllBankManagersFromUser=async(reqbody)=>{
    const url = createUrl('admin/getAllBankManagersFromUser');
    const headers = {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
    try {
        const response = await axios.get(url,{headers});
        console.log("resp data"+JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        toast.error('Error occured while fetching bank managers');
    }
}

// Function to add a new admin
export const addNewUser = async (reqBody) => {
    console.log("reqBody", reqBody);
  const url = createUrl('api/auth/register');
  const headers = {
    "Content-Type": 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`
}
  try {
    const response = await axios.post(url, reqBody,{headers});
    return response.data;
  } catch (error) {
    console.error("Error while adding admin:", error);
    throw error; 
  }

}

export const getAllBankManagers = async () => {
  const url = createUrl('admin/allBankManager');
  const headers = {
    "Content-Type": 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`
}
  try {
    const response = await axios.get(url,{headers});
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while retrieving bank managers:", error);
    throw error; 
  }


}

export const getAllBanks = async () => {
  const url = createUrl('admin/allBanks');
  const headers = {
    "Content-Type": 'application/json',
    "Authorization": `Bearer ${localStorage.getItem('token')}`
}
  try {
    const response = await axios.get(url,{headers});
    return response.data;
  } catch (error) {
    console.error("Error while retrieving banks:", error);
    throw error; 
  }
}


export const toggleManagerStatus = async (managerId) => {
  const url = createUrl(`admin/toggleManagerStatus/${managerId}`);
  try {
    const response = await axios.patch(
      url, 
      {}, 
      {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`, // Add JWT token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while toggling bank manager status:", error);
    throw error; 
  }
}