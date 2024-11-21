import { useState } from "react";
import { Link } from "react-router-dom";
import Eicon from "../../assets/zappy2.png";
import useUserState from "../../Store/UserStore";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setUser = useUserState((state) => state.setUser);
  const user = useUserState((state) => state.user);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div className="navbar">
      <nav className="navbar-container">
        <div className="logo-container">
          <img className="logo" src={Eicon} alt="Logo" />
        </div>

        <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Shop
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/men" className="navbar-link">
              Men
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/ladies" className="navbar-link">
              Women
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/kids" className="navbar-link">
              Kids
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/profile" className="navbar-link navbar-icon">
              <FaUser className="icon" />
              Profile
            </Link>
          </li>
          {user ? (
            <Link to="/user">
              <li>Hello {user.firstName}👋</li>
            </Link>
          ) : (
            <div className="sign-area">
              <button>
                <Link to="/sign up" className="navbar-link navbar-icon">
                  sign in
                </Link>
              </button>
            </div>
          )}
        </ul>
        <div className="navbar-right">
          <li className="navbar-item">
            <Link to="/cart" className="navbar-link cart-link">
              <FaShoppingCart className="cart-icon" />
              <span className="cart-badge">0</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              onClick={handleLogout}
              to="/"
              className="navbar-link navbar-icon"
            >
              <FaSignOutAlt className="icon" />
              Logout
            </Link>
          </li>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
