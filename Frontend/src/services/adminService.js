import axios from "axios";
import { createUrl } from "../utils";
import { toast } from 'react-toastify';

// Function to add a new admin
export const addNewAdmin = async (reqBody) => {
    console.log("reqBody", reqBody);
  const url = createUrl('api/auth/register');
  try {
    const response = await axios.post(url, reqBody);
    return response.data;
  } catch (error) {
    console.error("Error while adding admin:", error);
    toast.error('An error occurred while adding the new admin.');
    throw error; // Re-throw the error for further handling if needed
  }
};