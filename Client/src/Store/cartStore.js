import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useCartState = create(
  devtools(
    persist(
      (set) => ({
        cart: [],

        setCart: (cartItems) =>
          set(() => ({ cart: Array.isArray(cartItems) ? cartItems : [] })),

        addToCart: (item) =>
          set((state) => {
            const existingItem = state.cart.find(
              (cartItem) => cartItem.productId === item.productId,
            );
            if (existingItem) {
              return {
                cart: state.cart.map((cartItem) =>
                  cartItem.productId === item.productId
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem,
                ),
              };
            }
            return {
              cart: [...state.cart, { ...item, quantity: 1 }],
            };
          }),

        removeFromCart: (productId) =>
          set((state) => ({
            cart: state.cart.filter((item) => item.productId !== productId),
          })),

        clearCart: () => set(() => ({ cart: [] })),
      }),
      { name: "cart-storage" },
    ),
  ),
);

export default useCartState;
