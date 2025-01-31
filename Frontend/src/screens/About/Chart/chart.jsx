import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data for bank customers per bank
const data = [
  { name: 'Bank A', customers: 4000 },
  { name: 'Bank B', customers: 3000 },
  { name: 'Bank C', customers: 5000 },
  { name: 'Bank D', customers: 2000 },
  { name: 'Bank E', customers: 6000 },
];

const CustomerBarChart = () => {
  return (

<div className="container mb-5" style={{ marginTop: '0', paddingTop: '0' }}>
  <div className="row">

    <div className="col-md-12">

   
      <div className="card shadow-lg border-0 rounded-4 h-100">
        <div className="card-body">

          <div className="row">
         
         
            <div className="col-md-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="customers" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

         
         
            <div className="col-md-6">
              <h3 className="card-title">Join Thousands of Satisfied Customers
               </h3>
               <br></br>
              <p>
              Our banking network is trusted by thousands of customers across the region.
              The numbers speak for themselves.
              </p>
              

              <p>
               Why settle for less when you can experience banking built on trust,
               innovation, and customer-first service? Be part of a growing community 
               that prioritizes your financial needs.
               Choose us today and step into the future of banking with confidence!
              </p>
              <p>
              Join a growing community that values your 
              financial goals as much as you do. Take control of 
              your finances, make smarter decisions, and enjoy the 
              peace of mind that comes with banking you can rely on.

              </p>

              <p>
                <h5>Choose us today—because your future deserves the best...
                </h5>
              </p>


            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



  );
};

export default CustomerBarChart;
