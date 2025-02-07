import { useState } from "react"
import { Link, redirect, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {login} from "../../services/user";
import Header from "../../components/layouts/Header/Header";
const jwtDecode = require('jwt-decode');

const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const navigate=useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const onSubmit = async () => {
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email format');
      return;
    }

    try {
      const response = await login(email, password);
      console.log("Response from backend:", response);
      if (response.status === "error") {
        toast.error('An error occurred!');
      } else {
        console.log("Login successful");
        
        await new Promise((resolve) => {
          localStorage.setItem('token', response.token);
          console.log('Token stored:', localStorage.getItem('token'));
          resolve();
        });
  
       
        navigate('/home');
      }
    } catch (error) {
      console.log('An error occured:'+error.message);
    }
  };



return (
  <>
  <Header/>
    <div>
      <div className="heading d-flex flex-row justify-content-center mb-0 mt-5" >
        <h2 className="nanunito-standardfont mt-1">Login</h2>
      </div>
    <section className="vh-80">
   <div className="container py-5 h-100" >
    <div className="row d-flex align-items-center justify-content-center h-100" style={{backgroundImage:'./bg1.png'}}>
      <div className="col-md-8 col-lg-7 col-xl-6 animate__animated animate__bounceInLeft">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 animate__animated animate__bounceInRight">
        <form>
         
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email" id="form1Example13" className="form-control form-control-lg"
            
            onChange={(e)=>{  
              setEmail(e.target.value)
            }}  
            
            />
            <label className="form-label" >Email address</label>
          </div>

         
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="password" id="form1Example23" className="form-control form-control-lg" 
             onChange={(e)=>{
              setPassword(e.target.value)
            }}  
            />
            <label className="form-label">Password</label>
          </div>

          <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" 
          onClick={onSubmit}
          >Login</button>
        </form>
      </div>
    </div>
  </div>
    </section>
  
    </div>
  </>
  )
}

export default Login
