import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, register } from "../services/user";
import MyImage from "./bg1.png";
const AddCustomer = () => {
  const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [phoneNo,setPhoneNo] = useState('');
    const [age,setAge] = useState('');
    const [address,setAddress] = useState('');
    const [gender,setGender] = useState('');

  // const reqBody = {
  //   firstName,
  //   lastName,
  //   email,
  //   password,
  //   phone: phoneno,
  // };

  return (
    <div>
      <div className="heading d-flex flex-row justify-content-center mb-0 mt-5">
        <h2 className="nanunito-standardfont mt-1"> Add Customer</h2>
      </div>
      <section className="vh-80 mt-5">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6 animate__animated animate__bounceInLeft">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
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
              setPhoneNo(e.target.value)
            }}  
            />
          
          </div>
          </div>

         </div>

                <div className="row">
                  <div className="col">
                    <label className="form-label">Gender</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="col">
                    <label className="form-label">Age</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
                

                <div className="row">
                  <div className="col">
                    <label className="form-label">Password</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="col">
                    <label className="form-label">Address</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
                
               
                

                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg btn-block"
                  // onClick={onRegister}
                >
                  Add Customer
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddCustomer;
