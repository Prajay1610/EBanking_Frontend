import { Link } from "react-router-dom";
import aboutimage1 from "./Images/Aboutimage1.png";
import aboutimage2 from "./Images/Aboutimage2.png";
import aboutimage3 from "./Images/Aboutimage3.png";
const Aboutinformation = () => {
  return (
    <div className="container  mb-5" style={{ marginTop: '0', paddingTop: '0'}}>
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body">
              <h1 className="card-title" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Banking for Tomorrow</h1><br/>
              <p className="card-text">
              Welcome to the future of online banking. We are an innovative platform 
              dedicated to simplifying and securing your financial management experience. 
              Designed to meet the needs of individuals, businesses, and organizations, 
              our system ensures seamless access to all your banking activities from the
               comfort of your home or office.
              </p>
              <p className="card-text">
              With a focus on efficiency, transparency, 
               and advanced technology, we provide tools that make managing your finances 
               effortless. From tracking transactions in real-time to scheduling automated 
               payments, our platform is built to support you in achieving your financial goals.
              </p>
             
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="card border-0 rounded-4 h-100 hover-animate"
            style={{ overflow: "hidden" }}
          >
            <img
              src={aboutimage1}
              alt="Logo"
              className="card-img-top img-fluid"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <div
            className="card border-0 rounded-4 h-100 hover-animate"
            style={{ overflow: "hidden" }}
          >
            <img
              src={aboutimage2}
              alt="Logo"
              className="card-img-top img-fluid"
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body">
              <h1 className="card-title"style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>Take Full Control of Your Finances-Anytime, Anywhere</h1>
              <p className="card-text"><br/>
Unlock the power of effortless banking with our cutting-edge Online 
Banking System. Seamlessly manage your transactions, deposits, and withdrawals 
with a user-friendly platform designed to simplify your financial world.
Our system is giving you the flexibility to manage your finances on your terms. Enjoy a stress-free banking 
experience, tailored to fit your lifestyle, and take charge of your financial future with ease.


              </p>
              <p className="card-text">
              Our system is giving you the flexibility to manage your finances on your terms. 
              Enjoy a stress-free banking 
              experience, tailored to fit your lifestyle, and take charge of your 
              financial future with ease.
                Empower yourself to take full control of your finances with
                ease, enjoying the flexibility to manage your accounts whenever
                and wherever you choose. 
              </p>
              
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body">
              <h3 className="card-title" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                Our Vision
              </h3>
              <p className="card-text">
                To revolutionize the banking industry by creating a secure, user-friendly, and efficient platform 
                that empowers individuals and businesses to manage their finances with confidence and ease, 
                anytime and anywhere.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="col-md-6">
          <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body">
              <h3 className="card-title" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                Our Mission
              </h3>
              <p className="card-text">
                Our mission is to provide a secure, reliable, and transparent digital banking experience. We aim 
                to make financial management accessible to everyone by offering innovative tools and personalized 
                support to help our users achieve their financial goals with ease and confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br/>
      

<div className="col-md-12">
  <div className="card shadow-lg border-0 rounded-4 h-100">
    <div className="card-body d-flex justify-content-between align-items-center">
      {/* Left Side - Features List */}
      <div className="features-section" style={{ flex: 1 }}>
      <h3 className="card-title" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
      <h3>Key Features of Our Online Banking System</h3><br/>
              </h3>
       
        <ul>
          <li>Real-Time Account Monitoring</li>
          <li>Instant Money Transfers</li>
          <li>24/7 Customer Support</li>
          <li>Mobile App for On-the-Go Banking</li>
          <li>Advanced Security Features</li>
          <li>Smart Budgeting and Expense Tracking</li>
          <li>Seamless Bill Payments</li>
        </ul>
      </div>

      {/* Right Side - Image */}
      <div
        className="card border-0 rounded-4 h-20"
        style={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <img
          src={aboutimage3}
          alt="Logo"
          className="card-img-top img-fluid"
          style={{
            height: "100%",    
            width: "100%",     
            objectFit: "cover", 
          }}
        />
      </div>
    </div>
  </div>
</div>

      <style>
        {`
          .hover-animate {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .hover-animate:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          }
            .card-img-top {
              object-fit: contain;
            }
        `}
      </style>
    </div>
  );
};
export default Aboutinformation;
