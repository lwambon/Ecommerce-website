import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaPhoneAlt,
} from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="navbar">
      <nav className="navbar-container">
        <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <li className="navbar-item">
            <Link to="./product" className="navbar-link">
              Products
            </Link>

            <div className="dropdown">
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link to="./product/mens">Men's Shoes</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="./product/womens">Women's Shoes</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="./product/accessories">Accessories</Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="navbar-item">
            <Link to="./profile" className="navbar-link navbar-icon">
              <FaUser className="icon" />
              profile
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="./cart" className="navbar-link navbar-icon">
              <FaShoppingCart className="icon" />
              Cart
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="./contact" className="navbar-link navbar-icon">
              <FaPhoneAlt className="icon" />
              Contact
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/" className="navbar-link navbar-icon">
              <FaSignOutAlt className="icon" />
              Logout
            </Link>
          </li>
        </ul>

        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
