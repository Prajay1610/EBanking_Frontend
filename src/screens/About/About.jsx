import * as React from 'react';
import Header from '../../components/layouts/Header/Header';
import Footer from '../../components/layouts/Footer/Footer';
import Aboutinformation from '../Aboutinformation/Aboutinformation';
import Aboutjumbotron from './AboutJumbotron';
import CustomerBarChart from './Chart/chart';


const About = () => {

  return (
    <>
    <Header/>
    <Aboutjumbotron/>
     <Aboutinformation/>
     <CustomerBarChart/>
     <Footer/>
     
    </>
   
  );
}

export default About;