import { CartState } from "@/types/CartState";
import { create } from "zustand";

const useCartStore = create<CartState>((set) => ({
  cart: [], // Awal state cart adalah array kosong
  addToCart: (newItem) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        // Jika item sudah ada, update quantity
        return {
          cart: state.cart.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      // Jika item baru, tambahkan ke cart
      return {
        cart: [...state.cart, newItem],
      };
    }),
  setCart: (cart) => set({ cart }), // Action untuk menyimpan seluruh cart
}));

export default useCartStore;
