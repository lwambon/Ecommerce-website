import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="navbar">
      <nav className="navbar-container">
        <div className="logo-container">
          <img className="logo-image" src={Logo} alt="" />
          <Link className="logo" to="/">
            Radiant Touch
          </Link>
        </div>

        <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/sign up" className="navbar-link">
              Sign In
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
