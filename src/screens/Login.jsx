import { useState } from "react"
import { Link, redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {login} from "../services/user";

const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');


// make an api call using axios
async function onSubmit(){
  console.log('On submit claled')

  if(email==""){
    toast.error('Please enter email')
  }
  else if(password==""){
    toast.error('Please enter password')
  }
  else{
   try {
    const response = await login(email,password);

    if(response.status=="error"){
      toast.error(`error occured!`)
    }
    else{
      toast.success(`Welcome ${response.data.firstName}`);
      localStorage.setItem('token',response.data.token)

      
      console.log('Your token: '+ localStorage.getItem('token'));
     
      return redirect('/home')
    }
   } catch (error) {
    toast.error(error)
   }
   
    
  
  }
}



return (
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

          <div className="d-flex justify-content-space-between align-items-center mb-4">
           
           
            <Link to="/register">Don't Have an account?Register</Link>
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
  )
}

export default Login
