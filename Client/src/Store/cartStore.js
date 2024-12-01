import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useCartState = create(
  devtools(
    persist(
      (set) => ({
        cart: [],

        // Set the cart from external data
        setCart: (cartItems) =>
          set(() => ({ cart: Array.isArray(cartItems) ? cartItems : [] })),

        // Add item to the cart
        addToCart: (item) =>
          set((state) => ({
            cart: [...state.cart, item],
          })),

        // Clear the cart
        clearCart: () => set(() => ({ cart: [] })),
      }),
      { name: "cart-storage" },
    ),
  ),
);

export default useCartState;
