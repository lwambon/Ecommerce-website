import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import useCartState from "../../Store/cartStore";
import useUserState from "../../Store/UserStore";
import Header from "../../components/Header/Header";
import apiBase from "../../utils/apiBase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import "./Cart.css";

function CartPage() {
  const { cart, setCart } = useCartState();
  const { user, token } = useUserState();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [productsFromApi, setProductsFromApi] = useState([]);
  const navigate = useNavigate();

  const { mutate: deleteCartItem, isLoading: isDeleting } = useMutation({
    mutationKey: ["deleteCartItem"],
    mutationFn: async (productId) => {
      const response = await fetch(`${apiBase}/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return productId;
    },
    onSuccess: (productId) => {
      toast.success("Item deleted from cart", {
        theme: "colored",
        duration: 3000,
      });
      setCart((prevCart) =>
        prevCart.filter((item) => item.productId !== productId),
      );
      queryClient.invalidateQueries("cartItems");
    },
    onError: (error) => {
      toast.error(`Failed to delete item: ${error.message}`, {
        theme: "colored",
        duration: 3000,
      });
    },
  });

  // Fetch products from dummy API
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
          setCart(Array.isArray(data.cartItems) ? data.cartItems : []);
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

  // Checkout functionality
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: async () => {
      const response = await fetch(`${apiBase}/cart/checkout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Checkout successful! Redirecting to summary page...", {
        theme: "colored",
        duration: 3000,
      });

      const totalAmount = cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
      );

      navigate("/checkout", {
        state: {
          checkoutItems: cart,
          totalAmount,
        },
      });

      setCart([]);
      queryClient.invalidateQueries("cartItems");
    },
    onError: (error) => {
      toast.error(`Failed to checkout: ${error.message}`, {
        theme: "colored",
        duration: 3000,
      });
    },
  });

  const getProductImage = (productId) => {
    const product = productsFromApi.find((prod) => prod.id === productId);
    return product ? product.image : "default-product-image.jpg";
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
            {cart.map((item) => {
              const productImage = getProductImage(item.productId);
              return (
                <div key={item.productId} className="cart-item">
                  <img
                    src={productImage}
                    alt={item.product.title}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h2>{item.product.title}</h2>
                    <p>Price: ${item.product.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      Subtotal: $
                      {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteCartItem(item.productId)}
                    className="delete-button"
                    disabled={isDeleting}
                  >
                    <MdDelete /> {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <div className="checkout-container">
          <button
            onClick={() => checkout()}
            className="checkout-button"
            disabled={isCheckingOut || loading}
          >
            {isCheckingOut ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
