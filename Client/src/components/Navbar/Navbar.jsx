import { useState } from "react";
import { Link } from "react-router-dom";
import useUserState from "../../store/userStore";
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
          <Link className="logo" to="/">
            Radiant touch
          </Link>
        </div>

        <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/products" className="navbar-link">
              Products
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/fragrance" className="navbar-link">
              Fragrance
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/beauty" className="navbar-link">
              Beauty
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/furniture" className="navbar-link">
              Furniture
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/groceries" className="navbar-link">
              Groceries
            </Link>
          </li>
          {user ? (
            <li className="navbar-item welcome-message">
              Welcome, <strong>{user.firstName}</strong>! 🌸
            </li>
          ) : (
            <li className="navbar-item">
              <Link to="/sign up" className="navbar-link">
                Sign In
              </Link>
            </li>
          )}
        </ul>

        <div className="navbar-right">
          <li className="navbar-item">
            <Link to="/cart" className="navbar-link cart-link">
              <FaShoppingCart className="cart-icon" />
              <span className="cart-badge">0</span>
            </Link>
          </li>
          {user && (
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
          )}
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
