import { useState } from "react";
import { Link } from "react-router-dom";
import Eicon from "../../assets/zappy2.png";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import "./Header.css";

function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav className="header-nav">
      <div className="header-container">
        <div className="logo-container">
          <img className="logo" src={Eicon} alt="Logo" />
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="./sign up" className="nav-link">
              sign up
            </Link>
          </li>
        </ul>

        <div className="header-right">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
            />
          </div>

          <button onClick={toggleSearch} className="search-button">
            <FaSearch className="search-icon" />
          </button>

          <Link to="/cart" className="cart-link">
            <FaShoppingCart className="cart-icon" />
            <span className="cart-badge">3</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
