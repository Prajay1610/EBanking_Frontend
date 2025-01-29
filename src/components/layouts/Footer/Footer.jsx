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
