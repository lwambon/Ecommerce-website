import "./NewCollection.css";
import newCollection from "../../data/newCollection";
import Item from "../Items/Items";

function NewCollection() {
  return (
    <div className="collection">
      <h1>new collection</h1>
      <hr />
      <div className="new collection">
        {newCollection.map((item, i) => (
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

export default NewCollection;
