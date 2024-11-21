import { useContext } from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import BreakCrum from "../../components/BreakCrum/BreakCrum";
import { ShopContext } from "../../components/Context/Context";
import ProductDisplay from "../../components/ProductDisplay/ProductDisplay";

function Products() {
  const { ProductIndex } = useParams();
  const { AllProducts } = useContext(ShopContext);

  const product = AllProducts.find((e) => e.id === Number(ProductIndex));

  if (!product) {
    return (
      <div>Product not found. Please check the URL or go back to the shop.</div>
    );
  }

  return (
    <div className="product">
      <BreakCrum product={product} />
      <ProductDisplay product={product} />
    </div>
  );
}

export default Products;
