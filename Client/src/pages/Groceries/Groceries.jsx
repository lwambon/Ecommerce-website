import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Header from "../../components/Header/Header";

function Groceries() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={`full-${index}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={`empty-${index}`} />
        ))}
      </>
    );
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = data.products
          .filter((product) => product.category === "groceries")
          .map((product) => ({
            id: product.id,
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            rating: product.rating,
            brand: product.brand,
            reviews: product.reviews || [],
            image: product.images[0],
          }));
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div>
      <Header />
      <div className="products">
        <h1>Explore Groceries</h1>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <div className="products-price">
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating}</p>
              </div>
              <div className="products-brand">
                <p>Brand: {product.brand}</p>
                <p>Category: {product.category}</p>
              </div>

              <div className="product-reviews">
                <h3 className="reviews">Reviews</h3>
                {product.reviews.map((review, index) => (
                  <div key={index} className="review">
                    <p style={{ color: "red", fontSize: "1.2rem" }}>
                      <strong>{review.reviewerName}</strong> ({review.rating}{" "}
                      {renderStars(review.rating)})
                    </p>
                    <p>{review.comment}</p>
                    <p>
                      <em>{new Date(review.date).toLocaleDateString()}</em>
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addToCart(product)}
                className="add-to-cart-button"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="cart">
          <h2>Cart</h2>
          {cart.length > 0 ? (
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <h3>{item.title}</h3>
                  <p>Price: ${item.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Groceries;
