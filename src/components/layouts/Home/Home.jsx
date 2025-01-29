import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import '../../../App.css';
import Header from '../Header/Header';
import Jumbotron from '../Jumbotron';
import Footer from '../Footer/Footer';
import Homeinformation from '../Homeinformation/Homeinformation';

const Home = () => {

  return (
    <>
    <Header/>
     <Jumbotron/>
     <Homeinformation/>
     <Footer/>
     
    </>
   
  );
}

export default Home
