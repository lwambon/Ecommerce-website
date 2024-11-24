import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";

function Footer() {
  return (
    <div className="Footer">
      <div className="footer-logo-section">
        <p className="footer-info">radiant Touch</p>
      </div>
      <ul>
        <li>Company</li>
        <li>product</li>
        <li>offices</li>
        <li>about</li>
        <li>contact</li>
      </ul>
      <div className="footer-social-icons">
        <div className="s0cial-icons">
          <FaFacebook />
          <FaInstagramSquare />
          <FaTiktok />
          <FaPinterest />
          <FaSquareWhatsapp />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p> &copy; 2024 all rights reserved </p>
      </div>
    </div>
  );
}

export default Footer;
