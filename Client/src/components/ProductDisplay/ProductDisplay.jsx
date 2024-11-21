import "./ProductDisplay.css";
import { FaRegStar } from "react-icons/fa";

function ProductDisplay(props) {
  const { products } = props;
  return (
    <div className="product-display">
      <div className="product-display-left">
        <div className="product-display-image-list">
          <img src={products.ProductImageaurl} alt="" />
          <img src={products.ProductImageaurl} alt="" />
          <img src={products.ProductImageaurl} alt="" />
          <img src={products.ProductImageaurl} alt="" />
        </div>
        <div className="product-display-image">
          <img
            className="product-display-main-image"
            src={products.ProductImageaurl}
            alt=""
          />
        </div>
      </div>
      <div className="product-display-right">
        <h1>{products.ProductName}</h1>
        <div className="product-display-right-star">
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <FaRegStar />
          <p>122</p>
          <div className="product-display-prices">${products.ProductPrice}</div>
          <div className="product-display-right-description">
            A stylish two-piece shorts set for women, featuring a cropped top
            and high-waisted, comfortable, and trendy shorts design.
          </div>
          <div className="product-dispaly-size">
            <h1>select size</h1>
            <div className="product-display-sizess">
              <p>Xsmall</p>
              <p>small</p>
              <p>Medium</p>
              <p>large</p>
              <p>Xlarge</p>
              <p>XXlarge</p>
            </div>
          </div>
          <div className="product-display-button">
            <button>add to cart</button>
            <p className="product-display-right-category">
              {" "}
              <span>category:</span> women,t-shirt crop-top
            </p>
            <p className="product-display-right-category">
              {" "}
              <span>tag:</span> modern ,latest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;
