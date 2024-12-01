import { Link } from "react-router-dom";
import "./Hero.css";
import HeroVideo from "../../assets/hero1.mp4";

function Hero() {
  return (
    <div className="hero-container">
      <video autoPlay loop muted className="hero-video">
        <source src={HeroVideo} type="video/mp4" />
      </video>
      <div className="hero-overlay">
        <h1 className="hero-title"> welcome to Radiant Touch</h1>
        <p className="hero-subtitle">
          Unveil a world of luxury and quality. From beauty essentials to home
          decor, explore our curated collection that promises to elevate your
          lifestyle.
        </p>
        <Link to="/sign up" className="explore-button">
          click the link to order now
        </Link>
      </div>
    </div>
  );
}

export default Hero;
