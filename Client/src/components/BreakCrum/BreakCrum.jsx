import "./BreakCrum.css";
import { FaArrowRight } from "react-icons/fa";

function BreakCrum(props) {
  const product = props;
  return (
    <div className="breakcrum">
      Home <FaArrowRight /> shop <FaArrowRight /> {product.ProductCategory}
      <FaArrowRight /> {product.ProductName}
    </div>
  );
}

export default BreakCrum;
