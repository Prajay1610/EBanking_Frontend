
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#493D9E', color: 'white', padding: '20px 0', marginTop: 'auto' }}>
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-left">
            <h5>Banking System</h5>
            <p>Your trusted partner in finance.</p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" style={{ color: 'white' }}>About Us</a></li>
              <li><a href="/services" style={{ color: 'white' }}>Services</a></li>
              <li><a href="/contact" style={{ color: 'white' }}>Contact Us</a></li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', margin: '0 10px' }}>
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', margin: '0 10px' }}>
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', margin: '0 10px' }}>
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', margin: '0 10px' }}>
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Banking System. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
=======
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-wrapper-header-content">
        <div className="logo-and-name">
         
          <div>
            <a href="" className="logo-text">
              JWT Bank
            </a>
          </div>
        </div>

        <div className="quick-footer">
          <div>
            <a href="">About Us</a>
          </div>
          <div>
            <a href="">Contact Us</a>
          </div>
          <div>
            <a href="/disclaimer">Disclaimer</a>
          </div>
        </div>
      </div>

      <div className="description">
        <div className="info">
          <div>
            For JWT Bank issued products, conditions, fees and charges apply.
            These may change or we may introduce new ones in the future. Full
            details are available on request. Lending criteria apply to approval
            of credit products  including the Terms and Conditions, before deciding. Target Market
            Determinations for the products are available. Unless otherwise
            specified, the products and services described on this website are
            available only in India from © JWT Bank.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;

