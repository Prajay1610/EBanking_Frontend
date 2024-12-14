import axios from 'axios'
import {createUrl} from '../utils'
import { toast } from 'react-toastify';

export const login = async(email,password)=>{
    const url = createUrl('user/login');
    const reqbody = {
        email,
        password
    }
    try {
        const response = await axios.post(url,reqbody)
    
        return response.data;
    } catch (err) {
        toast.error(`Error ${err}`)
    }

    
}

export const register = async(reqbody)=>{
    const url = createUrl('user/register')

    try {
        const response = await axios.post(url,reqbody);

        return response.data;
    } catch (error) {
        toast.error('Error occured')
    }
}

