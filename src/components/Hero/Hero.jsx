import { Link } from "react-router-dom";
import "./Hero.css"; // Import the CSS file

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Zappy Cart</h1>
        <p className="hero-description">
          Discover the best collection of shoes at unbeatable prices!
        </p>
        <div className="button-container">
          <button className="shop-button">
            <Link to="/sign-up">Shop Men</Link>
          </button>
          <button className="shop-button">
            <Link to="/sign-up">Shop Women</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
