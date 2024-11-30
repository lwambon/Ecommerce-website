import { useEffect, useState } from "react";
import useCartState from "../../Store/cartStore";
import useUserState from "../../Store/UserStore";
import Header from "../../components/Header/Header";
import apiBase from "../../utils/apiBase";
import "./Cart.css";

function CartPage() {
  const { cart, setCart } = useCartState();
  const { user, token } = useUserState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user || !token) {
        console.error("User not logged in or token missing");
        setCart([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${apiBase}/cart/${user.id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCart(data.cartItems || []);
        } else {
          const error = await response.json();
          console.error("Error fetching cart items:", error.message);
          setCart([]);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user, token, setCart]);

  const deleteCartItem = async (itemId) => {
    if (!user || !token) {
      alert("You must be logged in to delete items from the cart.");
      return;
    }

    try {
      const response = await fetch(`${apiBase}/cart/${itemId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
        alert("Item removed from cart");
      } else {
        const error = await response.json();
        alert(`Error removing item: ${error.message}`);
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
      alert("Failed to remove item from cart.");
    }
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert(
        "Your cart is empty. Please add items to your cart before checking out.",
      );
      return;
    }

    alert("Proceeding to checkout...");
    setCart([]);
  };

  return (
    <div>
      <Header />
      <div className="cart-container">
        <h1>Your Cart</h1>
        {loading ? (
          <p>Loading...</p>
        ) : !Array.isArray(cart) || cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.product.image || "default-product-image.jpg"}
                  alt={item.product.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h2>{item.product.title}</h2>
                  <p>Price: ${item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: ${item.product.price * item.quantity}</p>
                </div>
                <button
                  onClick={() => deleteCartItem(item.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="checkout-container">
          <button onClick={checkout} className="checkout-button">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
