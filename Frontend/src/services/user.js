import axios from 'axios'
import {createUrl} from '../utils'
import { toast } from 'react-toastify';

export const login = async(email,password)=>{
    const url = createUrl('api/auth/login');
    const reqbody = {
        email,
        password
    }
   
    try {
        const response = await axios.post(url,reqbody)
        console.log("1. response from backend",response.data)
        return response.data;
    } catch (err) {
        console.log(err)
        toast.error(`Error ${err.response.data.error}`)
    }

    
}

export const register = async(reqbody)=>{
    const url = createUrl('user/register')
     const headers = {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
    try {
        const response = await axios.post(url,reqbody,{headers});

        return response.data;
    } catch (error) {
        toast.error('Error occured')
    }
}

export const getCustomer = async(reqbody)=>{
    
    const url = createUrl('user/profile')
    const headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
    try {
        const response = await axios.get(url,reqbody,{headers});
        return response.data;
        
    } catch (error) {
        toast.error('Error occured')
    }
}



