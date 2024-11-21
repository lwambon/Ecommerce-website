import { useState, useContext } from "react";
import "./ShopCategory.css";
import { ShopContext } from "../../components/Context/Context";
import { RiArrowDropDownLine } from "react-icons/ri";
import Item from "../../components/Items/Items";

function ShopCategory(props) {
  const { AllProducts } = useContext(ShopContext);

  const [visibleItems, setVisibleItems] = useState(10);

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  const filteredProducts = AllProducts.filter(
    (item) => item.ProductCategory === props.ProductCategory,
  );

  return (
    <div className="shop-category">
      <img
        src={props.banner}
        alt="Category Banner"
        className="shop-category-banner"
      />
      <div className="shopCategory-indexSort">
        <p>
          <span>
            Showing 1-{Math.min(visibleItems, filteredProducts.length)}
          </span>{" "}
          out of {filteredProducts.length} products
        </p>
        <div className="shopCategory-sort">
          Sort by
          <RiArrowDropDownLine className="dropdown-icon" />
        </div>
      </div>
      <div className="shopCategory-products">
        {filteredProducts.slice(0, visibleItems).map((item, i) => (
          <Item
            key={i}
            ProductId={item.Productid}
            ProductName={item.ProductName}
            ProductImageUrl={item.ProductImageUrl}
            ProductPrice={item.ProductPrice}
          />
        ))}
      </div>
      {visibleItems < filteredProducts.length && (
        <div className="load-more-products" onClick={handleShowMore}>
          Explore More
        </div>
      )}
    </div>
  );
}

export default ShopCategory;
