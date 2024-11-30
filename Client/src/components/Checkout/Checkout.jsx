import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useCartState from "../../Store/cartStore";
import useUserState from "../../Store/UserStore";
import apiBase from "../../utils/apiBase";
import Header from "../../components/Header/Header";
import "./Checkout.css";

function CheckoutPage() {
  const { cart, setCart } = useCartState();
  const { user, token } = useUserState();
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const generateReceipt = async () => {
      if (!user || !token) {
        console.error("User not logged in or token missing");
        history.push("/cart"); // Redirect to cart if the user is not logged in
        return;
      }

      try {
        const response = await fetch(`${apiBase}/checkout`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: user.id }),
        });

        if (response.ok) {
          const data = await response.json();
          setReceipt(data.receipt);
          setCart([]); // Clear the cart after checkout
        } else {
          const error = await response.json();
          console.error("Error during checkout:", error.message);
          history.push("/cart"); // Redirect to cart on error
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        history.push("/cart"); // Redirect to cart on error
      } finally {
        setLoading(false);
      }
    };

    generateReceipt();
  }, [user, token, setCart, history]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!receipt) {
    return <div>Failed to generate receipt. Please try again.</div>;
  }

  return (
    <div>
      <Header />
      <div className="checkout-container">
        <h1>Receipt</h1>
        <div className="receipt-details">
          <p>
            <strong>Receipt ID:</strong> {receipt.id}
          </p>
          <p>
            <strong>Total Amount:</strong> ${receipt.total}
          </p>
          <h2>Items:</h2>
          <ul>
            {receipt.products.map((item) => (
              <li key={item.productId}>
                {item.product.title} - {item.quantity} x ${item.price} = $
                {item.quantity * item.price}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => history.push("/")}
          className="back-to-home-button"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
