import helpimage from "../Contactinformation/Images/Helpcenter.png";

const Contactinformation = () => {
  return (
    <div className="container mb-5" style={{ marginTop: "0", paddingTop: "0" }}>
      <div className="row">
        <div className="col-md-12">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body d-flex flex-column flex-lg-row justify-content-between align-items-center">
              {/* Left Side - Form */}
              <div
                className="features-section mb-4 mb-lg-0"
                style={{ flex: 1 }}
              >
                <div className="card form-card border-color custom-bg">
                  <div
                    className="card-header custom-bg-text text-center"
                    style={{
                      backgroundColor: "#534891",
                      color: "white",
                      padding: "10px",
                      textAlign: "center",
                      borderRadius: "8px 8px 0 0",
                    }}
                  >
                    <h5 className="card-title">Contact Us</h5>
                  </div>
                  <div
                    className="card-body text-color"
                    style={{ backgroundColor: "#d6d0f2" }}
                  >
                    <form className="row g-3">
                      <div className="col-12 mb-3">
                        <label htmlFor="email" className="form-label">
                          <b>Email ID</b>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          //onChange={handleInput}
                          //value={customer.email}
                        />
                      </div>

                      <div className="col-12 mb-3">
                        <label htmlFor="query" className="form-label">
                          <b>Query/Feedback</b>
                        </label>
                        <textarea
                          className="form-control"
                          id="query"
                          name="query"
                          rows="5"
                          // onChange={handleInput}
                          // value={customer.query}
                        />
                      </div>

                      <div className="d-flex align-items-center justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success bg-color custom-bg-text col-6 col-md-4"
                          //onClick={saveCustomer}
                          style={{
                            backgroundColor: "#534891",
                            color: "white",
                            padding: "10px",
                            textAlign: "center",
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div
                className="card border-0 rounded-4 h-100"
                style={{
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <img
                  src={helpimage}
                  alt="Logo"
                  className="img-fluid rounded-4"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 col-sm-12">
          <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body">
              <h5 className="card-title">Customer Support</h5>
              <p className="card-text"></p>
              <ul>
                <li>For general inquiries: support@yourbank.com</li>
                <li>For account-related issues: accounts@yourbank.com</li>
                <li>For technical support: techsupport@yourbank.com</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-sm-12">
          <div className="card shadow-lg border-0 rounded-4 h-100">
            <div className="card-body">
              <h5 className="card-title">Phone Support</h5>
              <p className="card-text"></p>
              <ul>
                <li>General Enquiries: +123-456-7890</li>
                <li>24/7 Customer Service: +123-456-7891</li>
                <li>Technical Assistance: +123-456-7892</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <br />

    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header"style={{ backgroundColor: "#544892", color: "white" }}>
          <h3 className="mb-0">Frequently Asked Questions (FAQs)</h3>
        </div>
        <div className="card-body">
          <div className="accordion" id="faqAccordion">
            {/* Question 1 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  What is the purpose of this platform?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  This platform is designed to provide secure and efficient online banking services.
                </div>
              </div>
            </div>
            {/* Question 2 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  How do I reset my password?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  You can reset your password by clicking the "Forgot Password" link on the login page and following the instructions.
                </div>
              </div>
            </div>
            {/* Question 3 */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  How do I contact customer support?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  You can contact customer support by calling our toll-free number at 1800-123-4567 or emailing us at support@example.com.
                </div>
              </div>
            </div>
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
          }
        `}
      </style>
    </div>
  );
};

export default Contactinformation;

