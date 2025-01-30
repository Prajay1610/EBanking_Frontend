import logo from './logo.svg';
import './App.css';
import Header from './components/layouts/Header/Header';
import Footer from './components/layouts/Footer/Footer';
import Jumbotron from './components/layouts/Jumbotron';
import Home from './components/layouts/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
// Toastify imports
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './screens/Register';
import CustomerProfile from './screens/CustomerProfile';

import ViewCustomerTransactions from './screens/CustomerTransactions';

import AddBank from './screens/AddBank';
import AddBankManager from './screens/AddBankManager';
import AddCustomer from './screens/AddCustomer';
import AddNewAdmin from './screens/AddNewAdmin';
import ViewBankManagers from './screens/ViewBankManagers';
import ViewAllBankAccounts from './screens/ViewAllBankAccounts';
import ViewAllBankCustomers from './screens/ViewAllBankCustomer';
import ViewBankAccount from './screens/ViewBankAccount';


function App() {
  return(
    <>
    
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          {/* <Route path='/about' element={}/> */}
          <Route path='/register' element={<Register/>}/>
          <Route path='/customerProfile' element={<CustomerProfile/>}/>

          <Route path="/transactions" element={<ViewCustomerTransactions/>}/>
          

          <Route path='/AddBank' element={<AddBank/>}/>
          <Route path='/AddBankManager' element={<AddBankManager/>}/>
          <Route path='/AddCustomer' element={<AddCustomer/>}/>
          <Route path='/AddNewAdmin' element={<AddNewAdmin/>}/>
          <Route path='/ViewManagers' element={<ViewBankManagers/>}/>








          <Route path='/ViewAllBankAccounts' element={<ViewAllBankAccounts/>}/>

          <Route path='/ViewAllBankCustomers' element={<ViewAllBankCustomers/>}/>
          
          <Route path='/customer/bank/account/detail' element={<ViewBankAccount/>}/>
        </Routes>
    

       {/* toast container */}
       <ToastContainer 
       position="top-center"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick
       rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover
       theme="light"
      transition={Bounce}
       />
    </>
  );
}

export default App;
