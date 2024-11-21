import "./Popular.css";
import PopularProducts from "../../data/popular";
import Item from "../Items/Items";

function Popular() {
  return (
    <div className="popular">
      <h1>Popular in Women</h1>
      <hr />
      <div className="popular-items">
        {PopularProducts.map((item, i) => (
          <Item
            key={i}
            ProductName={item.ProductName}
            ProductImageUrl={item.ProductImageUrl}
            ProductPrice={item.ProductPrice}
          />
        ))}
      </div>
    </div>
  );
}

export default Popular;
