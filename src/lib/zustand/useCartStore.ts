import { create } from "zustand";
import { CartState } from "@/types/CartState";

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (newItem) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        cart: [...state.cart, newItem],
      };
    }),
  removeFromCart: async (itemId, userId) => {
    try {
      const res = await fetch(`/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, itemId }),
      });

      const result = await res.json();

      if (res.ok) {
        // Perbarui state lokal
        set((state) => ({
          cart: state.cart
            .map((item) => {
              if (item.id === itemId) {
                if (item.quantity > 1) {
                  return { ...item, quantity: item.quantity - 1 };
                }
                return null;
              }
              return item;
            })
            .filter((item) => item !== null), // Hapus item jika quantity sudah 1
        }));
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  },
  setCart: (cart) => set({ cart }),
}));

export default useCartStore;
