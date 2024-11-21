import HandIcon from "../../assets/hand-icon.png";
import HeroImage from "../../assets/l15.jpg";
import { FaArrowRight } from "react-icons/fa";
import "./Hero.css";

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-right">
        <h2 className="hero-text">new arrivals</h2>
        <div className="hand-icon">
          <p>new</p>
          <img src={HandIcon} alt="" className="hand-con" />
        </div>
        <div className="new-collection">
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <button className="latest-collection">
          latest collection
          <FaArrowRight />
        </button>
      </div>
      <div className="hero-left">
        <img src={HeroImage} alt="" className="hero-image" />
      </div>
    </div>
  );
}

export default Hero;
