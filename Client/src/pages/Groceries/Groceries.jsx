import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Header from "../../components/Header/Header";
import useUserState from "../../Store/UserStore";
import useCartState from "../../Store/cartStore";
import apiBase from "../../utils/apiBase";

function Groceries() {
  const [products, setProducts] = useState([]);
  const { user } = useUserState();
  const { setCart } = useCartState();

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

  // Fetch products and filter them for groceries category
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

  const addToCart = async (product) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const checkProductResponse = await fetch(
        `${apiBase}/products/${product.id}`,
      );

      if (!checkProductResponse.ok) {
        const createProductResponse = await fetch(`${apiBase}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            rating: product.rating,
            brand: product.brand,
            reviews: product.reviews.map((review) => ({
              rating: review.rating,
              comment: review.comment,
              date: review.date,
              reviewerName: review.reviewerName,
              reviewerEmail: review.reviewerEmail,
            })),
          }),
        });

        if (!createProductResponse.ok) {
          const error = await createProductResponse.json();
          alert(`Error creating product: ${error.message}`);
          return;
        }
      }

      // Add the product to the cart
      const response = await fetch(`${apiBase}/products/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: user.id,
          productId: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setCart((prevCart) => [...prevCart, result.cartItem]); // Update the cart state
        alert("Item added to cart!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div>
      <Header />
      <div className="products">
        <h1>Explore Groceries</h1> {/* Update title for the Groceries page */}
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <div className="products-price">
                <p>Price: ${product.price}</p>
                <p>Rating: {renderStars(product.rating)}</p>
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
      </div>
    </div>
  );
}

export default Groceries;
