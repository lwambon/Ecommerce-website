import { Link } from "react-router-dom";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import "./Header.css";
import useCartState from "../../Store/cartStore";
import useUserState from "../../Store/UserStore";
function Header({ handleLogout }) {
  const { cart } = useCartState();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const { user } = useUserState();

  return (
    <div className="header">
      <nav className="header-container">
        <div className="logo-container">
          <img className="logo-image" src={Logo} alt="" />
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
          {user ? (
            <li className="header-item">
              <span className="user-name"> ✋ {user.firstName} </span>
            </li>
          ) : null}
          <div className="header-right">
            <li className="header-item">
              <Link to="/cart" className="header-link cart-link">
                <FaShoppingCart className="cart-icon" />
                <span className="cart-badge">{cartItemCount}</span>
              </Link>
            </li>

            <li className="header-item">
              <Link to="/">
                <button
                  onClick={handleLogout}
                  className="header-link header-icon"
                >
                  <FaSignOutAlt className="icon" />
                  Logout
                </button>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
