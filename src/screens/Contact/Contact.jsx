import * as React from 'react';
import Header from '../../components/layouts/Header/Header';
import Footer from '../../components/layouts/Footer/Footer';
import Contactinformation from '../Contactinformation/Contactinformation';
import ContactJumbotron from './ContactJumbotron';


const Contact = () => {

  return (
    <>
    <Header/>
    <ContactJumbotron/>
     <Contactinformation/>
     <Footer/>
     
    </>
   
  );
}

export default Contact;