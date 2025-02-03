import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import { addNewBank, getAllBankManagers, getAllBankManagersFromUser } from "../../services/adminService";

const AddBankForm = () => {
  const [bankUsers, setBankUsers] = useState([]);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

 const [managers,setBankManagers]=useState([]);

  const [bank, setBank] = useState({
    bankName:"",
    phone:"",
    address:"",
    bankIfsc:"",
    bankEmail:"",
    bankWebsite:"",
    bankCountry:"India",
    bankManagerId:"",
  });

  useEffect(()=>{
    const fetchBankManagers = async () => {
      const managers = await getAllBankManagersFromUser(); 
      setBankManagers(managers);
    };
    fetchBankManagers();

    console.log("Bank Managers: ",managers);
  },[]);

  const handleInput = (e) => {
    setBank({ ...bank, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addNewBank(bank);
    try {
      if(result){
        toast.success("Bank added successfully");
        setBank({
          bankName:"",
          phone:"",
          address:"",
          bankIfsc:"",
          bankEmail:"",
          bankWebsite:"",
          bankCountry:"India",
          bankManagerId:"",
        });
        navigate("/addBank");
      }
      else{
        toast.error("Error occured while adding bank");
      }
    } catch (error) {
      toast.error("An unexpected error occured!");
    }
  };

 

  return (
   <>
   <Header/>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card form-card border-color custom-bg" style={{ width: "50rem" }}>
        <div className="card-header  custom-bg-text text-center" style={{ backgroundColor: "#534891", color: "white", padding: "10px", textAlign: "center", borderRadius: "8px 8px 0 0" }}>
          <h5 className="card-title">Add Bank</h5>
        </div>
        <div className="card-body text-color" style={{backgroundColor: "#d6d0f2"}}>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6 mb-3">
              <label htmlFor="name" className="form-label">
                <b>Bank Name</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="bankName"
                onChange={handleInput}
                value={bank.bankName}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="code" className="form-label">
                <b>IFSC Code</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="code"
                name="bankIfsc"
                onChange={handleInput}
                value={bank.bankIfsc}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                <b>Bank Manager</b>
              </label>
              <select name="bankManagerId" onChange={handleInput} className="form-control">
                <option value="">Select Bank Manager</option>
                {managers.map((manager) => {
                  return <option key={manager.id} value={manager.id}>{manager.fname +" "+manager.lname}</option>;
                })}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="website" className="form-label">
                <b>Website</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="website"
                name="bankWebsite"
                onChange={handleInput}
                value={bank.bankWebsite}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="address" className="form-label">
                <b>Bank Address</b>
              </label>
              <textarea
                className="form-control"
                id="address"
                name="address"
                rows="3"
                onChange={handleInput}
                value={bank.address}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="quantity" className="form-label">
                <b>Bank Email</b>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="bankEmail"
                onChange={handleInput}
                value={bank.bankEmail}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                <b>Phone Number</b>
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneNumber"
                name="phone"
                onChange={handleInput}
                value={bank.phone}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="country" className="form-label">
                <b>Country</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                onChange={handleInput}
                value={bank.bankCountry}
                disabled={true}
              />
            </div>

           
            <div className="d-flex align-items-center justify-content-center">
              <button
                type="submit"
                className="btn btn-primary bg-color custom-bg-text col-md-4"
                style={{ backgroundColor: "#534891", color: "white", padding: "10px", textAlign: "center"}}
              >
                Register Bank
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default AddBankForm;
