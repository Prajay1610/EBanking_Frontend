import axios from "axios";
import { createUrl } from "../utils";
import { toast } from 'react-toastify';

export const addNewAdmin = async(reqbody)=>{
    const url = createUrl('api/auth/register')

    try {
        const response = await axios.post(url,reqbody);
        console.log("resp data"+JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        toast.error('Error occured while adding new admin');
    }
}