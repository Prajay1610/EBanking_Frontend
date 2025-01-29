import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, register } from "../services/user";
import MyImage from "./bg1.png";
const AddBank = () => {
  const [bankName, setBankName] = useState("");
  const [bankEmail, setBankEmail] = useState("");
  const [bankManager, setBankManager] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [bankPhoneNo, setBankPhoneNo] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [bankCountry, setBankCountry] = useState("");
  const [bankCurrency, setBankCurrency] = useState("");
  const [bankWebsite, setBankWebsite] = useState("");
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
        <h2 className="nanunito-standardfont mt-1"> Add Bank</h2>
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
                    <label className="form-label">Bank Name</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setBankName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label className="form-label">Bank Code</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setBankCode(e.target.value)
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label className="form-label">Bank email</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setBankEmail(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="col">
                    <label className="form-label">Bank Manager</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setBankManager(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col">
                    <label className="form-label">Bank Phone No</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setBankPhoneNo(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="col">
                    <label className="form-label">Bank Address</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setBankAddress(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
                

                <div className="row">
                  <div className="col">
                    <label className="form-label">Bank Website</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setBankWebsite(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>

                  <div className="col">
                    <label className="form-label">Bank Currency</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setBankCurrency(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col">
                    <label className="form-label">Bank Country</label>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        onChange={(e) => {
                          setBankCountry(e.target.value);
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
                  Add Bank
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddBank;
