import { useState } from "react"
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login, register } from "../../services/user";
//Currently not in useS
const Register = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [phoneno,setPhoneno] = useState('');
    const [confirmpassword,setConfirmPassword]=useState('')


    const reqBody = {
      firstName,
      lastName,
      email,
      password,
      phone:phoneno,
    }
   
  
    async function onRegister(){
        console.log('On register called')
        if(firstName==""){
          toast.error('Please enter firstName')
        }
        else if(email==""){
          toast.error('Please enter email')
        }
        else if(password==""){
          toast.error('Please enter password')
        }
        else if(phoneno==""){
          toast.error('Please enter password')
        }
        else if(password==""){
          toast.error('Please enter password')
        }
        else if(confirmpassword==""){
          toast.error('Please enter confirm password')
        }
        else if(password!=confirmpassword){
          toast.error(`Passwords doesn't Match`)
        }
        else{
         try {
          const response = await register(reqBody);
      
          if(response.status=="error"){
            toast.error(`error occured!`)
          }
          else{
            toast.success(`User Registered Successfully!`);
            // return redirect('/home')
          }
         } catch (error) {
          toast.error(error)
         }
         
          
        }
    }
  return (
    
    <div>
        <div className="heading d-flex flex-row justify-content-center mb-0 mt-5">
        <h2 className="nanunito-standardfont mt-1">Register</h2>
      </div>
       <section className="vh-80 mt-5">
   <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6 animate__animated animate__bounceInLeft">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 animate__animated animate__bounceInRight">
        <form>
         
         <div className="row">
          <div className="col">
          <label className="form-label" >First Name</label>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="text"  className="form-control form-control-lg"
            
            onChange={(e)=>{
              setFirstName(e.target.value)
            }}  
            
            />
          
          </div>
          </div>
          <div className="col">
          <label className="form-label">Last Name</label>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="text"  className="form-control form-control-lg" 
             onChange={(e)=>{
              setLastName(e.target.value)
            }}  
            />
          
          </div>
          </div>
         </div>

         <div className="row">
          <div className="col">
          <label className="form-label" >Email address</label>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email"  className="form-control form-control-lg"
            
            onChange={(e)=>{
              setEmail(e.target.value)
            }}  
            
            />
          
          </div>
          </div>
          <div className="col">
          <label className="form-label">Phone</label>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="number" className="form-control form-control-lg" 
             onChange={(e)=>{
              setPhoneno(e.target.value)
            }}  
            />
          
          </div>
          </div>

         </div>


         <div className="row">
          <div className="col">
          <label className="form-label" >Password</label>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="password"  className="form-control form-control-lg"
            
            onChange={(e)=>{
              setPassword(e.target.value)
            }}  
            
            />
          
          </div>
          </div>
          <div className="col">
          <label className="form-label">Confirm Password</label>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="password"className="form-control form-control-lg" 
             onChange={(e)=>{
              setConfirmPassword(e.target.value)
            }}  
            />
          
          </div>
          </div>

         </div>



       
          <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" 
          onClick={onRegister}
          >Register</button>
        </form>
      </div>
    </div>
  </div>
    </section>
    </div>
  )
}

export default Register
