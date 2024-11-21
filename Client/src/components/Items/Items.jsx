import { Link } from "react-router-dom";
import "./Items.css";

function Item(props) {
  return (
    <div className="item">
      <img
        src={props.ProductImageUrl}
        alt={props.ProductName}
        className="item-image"
      />

      <Link to={`/products/${props.ProductIndex}`}>
        <p className="item-name">{props.ProductName}</p>
      </Link>
      <div className="item-price">
        <div className="item-price-new">${props.ProductPrice}</div>
      </div>
    </div>
  );
}

export default Item;
