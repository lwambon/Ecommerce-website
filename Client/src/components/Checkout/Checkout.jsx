import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";
import { Link } from "react-router-dom";
import useUserState from "../../Store/UserStore";

function CheckoutSummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserState();
  const [productsFromApi, setProductsFromApi] = useState([]);
  const [checkoutHistory, setCheckoutHistory] = useState([]);

  useEffect(() => {
    const fetchProductsFromApi = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        const filteredProducts = data.products.map((product) => ({
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
        setProductsFromApi(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsFromApi();
  }, []);

  const { checkoutItems, totalAmount } = location.state || {};

  useEffect(() => {
    if (checkoutItems && totalAmount && user?.id) {
      const currentCheckout = {
        items: checkoutItems,
        totalAmount,
        date: new Date().toISOString(), // Use ISO string for unique date representation
      };

      const userCheckoutHistoryKey = `checkoutHistory_${user.id}`;
      let history =
        JSON.parse(localStorage.getItem(userCheckoutHistoryKey)) || [];

      // Avoiding duplicate by comparing using totalAmount and items
      const isDuplicate = history.some(
        (checkout) =>
          checkout.totalAmount === currentCheckout.totalAmount &&
          checkout.items.length === currentCheckout.items.length,
      );

      if (!isDuplicate) {
        history.push(currentCheckout);
        localStorage.setItem(userCheckoutHistoryKey, JSON.stringify(history));
        setCheckoutHistory(history);
      }
    }
  }, [checkoutItems, totalAmount, user]);

  useEffect(() => {
    if (user?.id) {
      const userCheckoutHistoryKey = `checkoutHistory_${user.id}`;
      const history =
        JSON.parse(localStorage.getItem(userCheckoutHistoryKey)) || [];
      setCheckoutHistory(history);
    }
  }, [user]);

  const getProductImage = (productId) => {
    const product = productsFromApi.find((p) => p.id === productId);
    return product ? product.image : "default-product-image.jpg";
  };

  return (
    <div>
      <h1>Checkout History</h1>
      <div className="checkout-summary-container">
        {checkoutHistory.length === 0 ? (
          <div>
            <p>You have not made any purchases yet.</p>
            <p>Do your shopping now!</p>
            <Link to="/products" className="checkout-link-to-products">
              Go to Products
            </Link>
          </div>
        ) : (
          <>
            {checkoutHistory.map((checkout, index) => (
              <div key={index} className="checkout-history-item">
                <h3>
                  Checkout on {new Date(checkout.date).toLocaleDateString()}
                </h3>
                <div className="checkout-item-list">
                  {checkout.items.map((item) => (
                    <div key={item.productId} className="checkout-item">
                      <img
                        src={getProductImage(item.productId)}
                        alt={item.product.title}
                        className="checkout-item-image"
                      />
                      <div className="checkout-item-details">
                        <h2>{item.product.title}</h2>
                        <p>Price: ${item.product.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>
                          Subtotal: ${" "}
                          {(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="checkout-summary-total">
                  <h2>Total Amount: ${checkout.totalAmount.toFixed(2)}</h2>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutSummaryPage;
