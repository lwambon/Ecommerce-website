import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Footer">
      <div className="footer-logo-section">
        <p className="footer-info">radiant Touch</p>
      </div>
      <ul>
        <li>
          <Link to="/products" className="footer-links">
            Products
          </Link>
        </li>
        <li>
          <Link to="/fragrance" className="footer-links">
            Fragrance
          </Link>
        </li>
        <li>
          <Link to="/beauty" className="footer-links">
            Beauty
          </Link>
        </li>
        <li>
          <Link to="/furniture" className="footer-links">
            Furniture
          </Link>
        </li>
        <li>
          <Link to="/groceries" className="footer-links">
            Groceries
          </Link>
        </li>
        <li>
          <Link to="/profile" className="footer-links">
            Profile
          </Link>
        </li>
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
