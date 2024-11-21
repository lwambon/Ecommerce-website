import "./Offers.css";
import ExclusiveImage from "../../assets/m16.jpg";

function Offers() {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>exclusive</h1>
        <h1>offers for you</h1>
        <p>only on best sellers product</p>
        <button>check now</button>
      </div>
      <div className="offers-right">
        <img src={ExclusiveImage} alt="" />
      </div>
    </div>
  );
}

export default Offers;
