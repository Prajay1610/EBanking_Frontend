import axios from "axios";
import { createUrl } from "../utils";
import { toast } from 'react-toastify';






export const addNewBank = async(reqbody)=>{
    const url = createUrl('bank/add');
    console.log("reqbody"+JSON.stringify(reqbody));
    try {
        const response = await axios.post(url,reqbody);
        console.log("resp data"+JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        toast.error('Error occured while adding new bank');
    }
}


export const getAllBankManagersFromUser=async(reqbody)=>{
    const url = createUrl('admin/getAllBankManagersFromUser');
    try {
        const response = await axios.get(url);
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
  try {
    const response = await axios.post(url, reqBody);
    return response.data;
  } catch (error) {
    console.error("Error while adding admin:", error);
    throw error; // Re-throw the error for further handling if needed
  }

}

export const getAllBankManagers = async () => {
  const url = createUrl('admin/allBankManager');
  try {
    const response = await axios.get(url);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while retrieving bank managers:", error);
    throw error; // Re-throw the error for further handling if needed
  }


}
