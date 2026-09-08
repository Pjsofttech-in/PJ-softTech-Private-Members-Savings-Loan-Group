import logo from "../assets/Pj Soft.png";

function Footer() {
  return (
    <footer className="site-footer">
      <img src={logo} alt="PJSoftTech logo" />
      <span>Software Designed By PJSOFTTECH Pvt. Ltd.</span>
      <span className="footer-rights">© All Rights Reserved</span>
    </footer>
  );
}

export default Footer;
