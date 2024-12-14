import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import '../../../App.css';

const Home = () => {

  let data = [
    {'OrderID': 10248, 'CustomerID': 'VINET', 'ShipCountry': 'France'},
    {'OrderID': 10249, 'CustomerID': 'TOMSP', 'ShipCountry': 'Germany'},
    {'OrderID': 10250, 'CustomerID': 'HANAR', 'ShipCountry': 'Brazil'},
    {'OrderID': 10251, 'CustomerID': 'VICTE', 'ShipCountry': 'France'}
  ];
  return (
    <div>
      SYncfusion test




     
        
    return <GridComponent dataSource={data}>
        <ColumnsDirective>
            <ColumnDirective field='OrderID' headerText='Order ID'/>
            <ColumnDirective field='CustomerID' headerText='Customer ID' />
            <ColumnDirective field='ShipCountry' headerText='Ship Country' />
        </ColumnsDirective>
    </GridComponent>

export default App;

    </div>
  )
}

export default Home
