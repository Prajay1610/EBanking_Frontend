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


export const getAllBankManagers=async(reqbody)=>{
    const url = createUrl('admin/getAllBankManagersFromUser');
    try {
        const response = await axios.get(url);
        console.log("resp data"+JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        toast.error('Error occured while fetching bank managers');
    }
}