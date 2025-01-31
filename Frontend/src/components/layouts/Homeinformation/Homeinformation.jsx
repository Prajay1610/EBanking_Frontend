// import { Link } from "react-router-dom";
// import travel_1 from "./Images/image.png";
// import travel_2 from "./Images/image2.png";
// const Homeinformation = () => {
//   return (
//     <div className="container mt-5 mb-5">
//       <div className="row">
//         <div className="col-md-8 text-color">
//           <h1> Welcome to the Future of Banking</h1>
//           <p>
//             Experience the next generation of banking with our state-of-the-art
//             platform, designed to blend financial empowerment with advanced
//             technology. Effortlessly take charge of your financial journey as
//             you perform secure transactions, make swift deposits, and access
//             your funds with ease.
//           </p>
//           <p>
//             Our platform offers a seamless and intuitive interface, ensuring you
//             have complete control over your finances from the comfort of your
//             device. Equipped with cutting-edge security features, your sensitive
//             data is protected at every step. Embrace a new era of digital
//             banking with us and enjoy unparalleled convenience and peace of
//             mind.
//           </p>
//           <Link
//             to="/user/login"
//             className="px-4 py-2 rounded-pill text-white"
//             style={{ backgroundColor: "#544892", textDecoration: "none" }}
//           >
//             Get Started
//           </Link>
//         </div>
//         <div className="col-md-4">
//           <img
//             src={travel_1}
//             alt="Logo"
//             width="500"
//             height="auto"
//             className="home-image"
//           />
//         </div>
//       </div>

//       <div className="row mt-5">
//         <div className="col-md-4">
//           <img
//             src={travel_2}
//             alt="Logo"
//             width="460"
//             height="auto"
//             className="home-image"
//           />
//         </div>
//         <div className="col-md-8 text-color">
//           <h1 className="ms-5">Master Your Finances with Ease</h1>
//           <p className="ms-5">
//             Take control of your financial world with our innovative Online
//             Banking System. Effortlessly handle transactions, deposits, and
//             withdrawals using an intuitive platform designed to make banking
//             straightforward and stress-free. Whether you're moving funds,
//             growing your savings, or accessing your money, our system delivers
//             reliability and convenience at every turn.
//           </p>
//           <p className="ms-5">
//             Empower yourself to take full control of your finances with ease,
//             enjoying the flexibility to manage your accounts whenever and
//             wherever you choose. Whether you’re at home, at work, or on the go,
//             our platform is your trusted companion for seamless banking.
//             Experience the simplicity of transferring funds, building savings,
//             and accessing your money with just a few clicks. Join us in
//             reshaping the landscape of financial services as we prioritize your
//             convenience and security. With our advanced features and commitment
//             to innovation, we are paving the way for a smarter, more streamlined
//             future in banking.
//           </p>
//           {/* <Link
//             to="/user/login"
//             className="px-4 py-2 rounded-pill text-white"
//             style={{ backgroundColor: "#544892", textDecoration: "none" }}
//           >
//             Discover More
//           </Link> */}
//           <Link
//             to="/user/login"
//             className="px-4 py-2 rounded-pill text-white"
//             style={{
//               backgroundColor: "#544892",
//               textDecoration: "none",
//               marginLeft: "40px", // Adds 10px space inside the button to the left
//             }}
//           >
//             Discover More
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Homeinformation;

import { Link } from "react-router-dom";
import travel_1 from "./Images/image.png";
import travel_2 from "./Images/image2.png";

const Homeinformation = () => {
  return (
    <div className="container mt-5 mb-5">
      {/* First Row */}
      <div className="row">
        {/* Left Column */}
        <div className="col-md-8 text-color">
          <h1> Welcome to the Future of Banking</h1>
          <p>
            Experience the next generation of banking with our state-of-the-art
            platform, designed to blend financial empowerment with advanced
            technology. Effortlessly take charge of your financial journey as
            you perform secure transactions, make swift deposits, and access
            your funds with ease.
          </p>
          <p>
            Our platform offers a seamless and intuitive interface, ensuring you
            have complete control over your finances from the comfort of your
            device. Equipped with cutting-edge security features, your sensitive
            data is protected at every step. Embrace a new era of digital
            banking with us and enjoy unparalleled convenience and peace of
            mind.
          </p>
          <Link
            to="/user/login"
            className="px-4 py-2 rounded-pill text-white"
            style={{ backgroundColor: "#544892", textDecoration: "none" }}
          >
            Get Started
          </Link>
        </div>

        {/* Right Column (Image) */}
        <div className="col-md-4 d-flex justify-content-center">
          <img
            src={travel_1}
            alt="Logo"
            className="home-image img-fluid" // Added img-fluid for responsive images
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="row mt-5">
        {/* Left Column (Image) */}
        <div className="col-md-4 d-flex justify-content-center">
          <img
            src={travel_2}
            alt="Logo"
            className="home-image img-fluid" // Added img-fluid for responsive images
          />
        </div>

        {/* Right Column */}
        <div className="col-md-8 text-color">
          <h1 className="ms-5">Master Your Finances with Ease</h1>
          <p className="ms-5">
            Take control of your financial world with our innovative Online
            Banking System. Effortlessly handle transactions, deposits, and
            withdrawals using an intuitive platform designed to make banking
            straightforward and stress-free. Whether you're moving funds,
            growing your savings, or accessing your money, our system delivers
            reliability and convenience at every turn.
          </p>
          <p className="ms-5">
            Empower yourself to take full control of your finances with ease,
            enjoying the flexibility to manage your accounts whenever and
            wherever you choose. Whether you’re at home, at work, or on the go,
            our platform is your trusted companion for seamless banking.
            Experience the simplicity of transferring funds, building savings,
            and accessing your money with just a few clicks. Join us in
            reshaping the landscape of financial services as we prioritize your
            convenience and security. With our advanced features and commitment
            to innovation, we are paving the way for a smarter, more streamlined
            future in banking.
          </p>
          {/* Responsive Button */}
          <Link
            to="/user/login"
            className="px-4 py-2 rounded-pill text-white"
            style={{
              backgroundColor: "#544892",
              textDecoration: "none",
              marginLeft: "40px",
            }}
          >
            Discover More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homeinformation;

