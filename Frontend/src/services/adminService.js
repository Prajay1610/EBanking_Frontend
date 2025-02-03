import axios from "axios";
import { createUrl } from "../utils";
import { toast } from 'react-toastify';

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
  const url = createUrl('Admin/allBankManager');
  try {
    const response = await axios.get(url);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while retrieving bank managers:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}