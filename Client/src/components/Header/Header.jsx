import { Link } from "react-router-dom";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

function Header({ user, handleLogout }) {
  return (
    <div className="header">
      <nav className="header-container">
        <div className="logo-container">
          <Link className="logo" to="/">
            Radiant Touch
          </Link>
        </div>
        <ul className="header">
          <li className="header-item">
            <Link to="/products" className="header-link">
              Products
            </Link>
          </li>
          <li className="header-item">
            <Link to="/fragrance" className="header-link">
              Fragrance
            </Link>
          </li>
          <li className="header-item">
            <Link to="/beauty" className="header-link">
              Beauty
            </Link>
          </li>
          <li className="header-item">
            <Link to="/furniture" className="header-link">
              Furniture
            </Link>
          </li>
          <li className="header-item">
            <Link to="/groceries" className="header-link">
              Groceries
            </Link>
          </li>
          <li className="header-item">
            <Link to="/profile" className="header-link">
              Profile
            </Link>
          </li>
          <div className="header-right">
            <li className="header-item">
              <Link to="/cart" className="header-link cart-link">
                <FaShoppingCart className="cart-icon" />
                <span className="cart-badge">0</span>
              </Link>
            </li>
            <li className="header-item">
              <button
                onClick={handleLogout}
                className="header-link header-icon"
              >
                <FaSignOutAlt className="icon" />
                Logout
              </button>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
